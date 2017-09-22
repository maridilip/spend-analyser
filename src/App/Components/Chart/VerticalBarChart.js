import React, { Component } from "react";
import { scaleLinear, scaleBand, max } from "d3";
import Axis from "./Axis";
import BarChartPropTypes from './CommonBarChartPropTypes'

class BarChart extends Component {
  constructor(props) {
    super(props);
    const { height, width, margins, data, valueKey } = props;
    this.svgWidth = width - margins.right - margins.left;
    this.svgHeight = height - margins.top - margins.bottom;

    this.yScale = scaleLinear()
      .rangeRound([this.svgHeight, 0])
      .domain([0, max(data, d => d[valueKey])]);
    this.xScale = scaleBand()
      .padding(0.1)
      .rangeRound([0, this.svgWidth])
      .domain(data.map((d, i) => i));
    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  renderBarGroup() {
    const { yScale, xScale, svgHeight } = this;
    const { margins, data, rx, ry, valueKey } = this.props;

    return data.map((datum, index) => {
      let barProps = {
        fill: datum.color,
        rx: rx,
        ry: ry,
        value: datum[valueKey],
        x: margins.left + xScale(index),
        y: yScale(datum[valueKey]),
        width: xScale.bandwidth(),
        height: svgHeight - yScale(datum[valueKey]),
        stroke: datum.selected ? '#000' : ''
      };

      return (
        <g key={index}>
          <rect {...barProps} />
        </g>
      );
    });
  }

  render() {
    const { yScale } = this;
    const {
      margins,
      yAxisOrient,
      yAxisTicks
    } = this.props;
    const chartMargin = `translate(${margins.left},${margins.top})`;
    const axisMargin = `translate(${margins.left},0)`;

    return (
      <g transform={chartMargin}>
        <Axis
          scale={yScale}
          orient={yAxisOrient}
          noOfTicks={yAxisTicks}
          transform={axisMargin}
        />
        {this.renderBarGroup()}
      </g>
    );
  }
}
export default BarChart;

BarChart.propTypes = BarChartPropTypes;
BarChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}