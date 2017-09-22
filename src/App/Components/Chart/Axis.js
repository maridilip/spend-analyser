import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { select, axisTop, axisLeft, axisBottom, axisRight } from 'd3'

class Axis extends Component {
  onAxisInit(ref) {
    if (ref) {
      this.axisNode = ref
    }
  }

  componentDidMount() {
    const { orient, scale, noOfTicks } = this.props
    const axisOrient = {
      top: axisTop,
      left: axisLeft,
      bottom: axisBottom,
      right: axisRight,
    }

    const axis = axisOrient[orient]()
      .ticks(noOfTicks)
      .scale(scale);
    select(this.axisNode).call(axis)
  }

  render() {
    return <g ref={(ref) => this.onAxisInit(ref)} transform={this.props.transform}></g>
  }
}

export default Axis

Axis.propTypes = {
  noOfTicks: PropTypes.number,
  scale: PropTypes.func.isRequired,
  orient: PropTypes.string.isRequired,
  transform: PropTypes.string
}