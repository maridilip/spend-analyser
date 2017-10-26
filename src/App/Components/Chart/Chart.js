import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Legend from './Legend'
import ToolTip from './ToolTip'
import { formatDataForChart } from './utils'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: formatDataForChart(props.data, props.labelKey),
      showToottip: false,
      tooltipData: {},
      position: {},
      clientWidth: props.width
    }
    this.toolTipHideDelay = null
    this.onLegendClick = this.onLegendClick.bind(this)
    this.onHover = this.onHover.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentWillReceiveProps({ data, labelKey }) {
    if (data !== this.props.data) {
      this.setState({ data: formatDataForChart(data, labelKey) })
    }
  }

  onLegendClick(selectedItem) {
    const { onSelect } = this.props
    const selectedData = this.state.data.map(item => ({
      ...item,
      selected: item.id === selectedItem.id ? !item.selected : item.selected
    }))
    this.setState({ data: selectedData })

    if (onSelect) {
      onSelect(selectedData)
    }
  }

  onHover(data, eve) {
    const { pageX, pageY, clientX, clientY } = eve || {}
    const updatedState = {
      "showToottip": data ? true : false,
      "tooltipData": data || {},
      "position": { pageX, pageY, clientX, clientY }
    }

    window.clearTimeout(this.toolTipHideDelay)
    if (!data) {
      this.toolTipHideDelay = window.setTimeout(() => {
        this.setState(updatedState)
      }, 2000)
    } else {
      this.setState(updatedState)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    if (this.props.responsive) {
      const chartContainer = findDOMNode(this.chartContainer)
      const clientWidth = chartContainer.clientWidth
      this.setState({
        clientWidth: clientWidth
      })
    }
  }

  render() {
    const { clientWidth: width } = this.state
    const { height, showLegend, Component, data, labelKey, valueKey ,tooltipComponent} = this.props
    return <Row>
      <Col md={8} ref={(ref) => this.chartContainer = ref}>
        <svg height={height} width={width}>
          <Component {...this.props}
            width={width}
            data={this.state.data}
            onClick={this.onLegendClick}
            onHover={this.onHover}
          />
        </svg>
        {this.state.showToottip ? <ToolTip
          tooltipData={this.state.tooltipData}
          position={this.state.position}
          containerProps={{ height, width, labelKey, valueKey }}
          onTransactionDetailsClick={this.onLegendClick}
          component={tooltipComponent}
        /> : null}
      </Col>
      <Col md={4}>
        <Legend show={showLegend} data={formatDataForChart(data, labelKey)}
          type={'circle'} onClick={this.onLegendClick} labelKey={labelKey} />
      </Col>
    </Row>
  }
}

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  showLegend: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  responsive: PropTypes.bool,
  tooltipComponent:PropTypes.element
}

Chart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  showLegend: true,
  responsive: true
}

export default Chart