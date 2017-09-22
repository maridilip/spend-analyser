import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Legend from './Legend'
import { formatDataForChart } from './utils'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: formatDataForChart(props.data)
    }
    this.onLegendClick = this.onLegendClick.bind(this)
  }

  componentWillReceiveProps({ data }) {
    this.setState({ data: formatDataForChart(data) })
  }

  onLegendClick(selectedItem) {
    const selectedData = this.state.data.map(item => ({
      ...item,
      selected: item.id === selectedItem.id ? !item.selected : item.selected
    }))
    this.setState({ data: selectedData })
  }

  render() {
    const { height, width, showLegend, Component, data } = this.props
    return <div>
      <svg height={height} width={width}>
        <Component {...this.props} data={this.state.data} />
      </svg>
      <Legend show={showLegend} data={formatDataForChart(data)} type={'circle'} onClick={this.onLegendClick} />
    </div>
  }
}

Chart.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  type: PropTypes.object.isRequired,
  showLegend: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
}

export default Chart