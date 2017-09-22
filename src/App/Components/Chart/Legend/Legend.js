import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Legend.scss'

const LEGEND_SIZE = 10
class Legend extends Component {
  onClick(item) {
    const { onClick } = this.props
    if (onClick) {
      onClick(item)
    }
  }

  render() {
    const { type, data } = this.props
    const legenedTypeStyle = type === 'circle' ? styles.legendCircle : {}
    const Legends = data.map((item, index) => {
      const iconStyles = {
        ...legenedTypeStyle,
        width: `${LEGEND_SIZE}px`,
        height: `${LEGEND_SIZE}px`,
        float: "left",
        margin: `${LEGEND_SIZE / 2}px`,
        backgroundColor: item.color
      }
      return <div style={styles.legendContent}
        onClick={() => this.onClick(item)}>
        <div style={iconStyles}> </div>
        <span>{` - ${item.label}`}</span>
      </div>
    })
    return (<div className="chart-legends">
      <div style={styles.legendContainer}>{Legends}</div>
      <div style={styles.clear} />
    </div>)
  }
}

export default Legend

Legend.propTypes = {
  type: PropTypes.shape("circle", "rect").isRequired,
  data: PropTypes.array.isRequired,
  position: PropTypes.shape("top", "left", "bottom", "right").isRequired,
  onClick: PropTypes.func,
  colorScheme: PropTypes.array
}
Legend.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}