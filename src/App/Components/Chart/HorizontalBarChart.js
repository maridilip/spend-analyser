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

    this.xScale = scaleLinear()
      .rangeRound([0, this.svgWidth])
      .domain([0, max(data, d => d[valueKey])]);
    this.yScale = scaleBand()
      .padding(0.1)
      .rangeRound([0, this.svgHeight])
      .domain(data.map((d, i) => i));
    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  renderBarGroup() {
    const { yScale, xScale } = this;
    const { margins, data, rx, ry, valueKey } = this.props;

    return data.map((datum, index) => {
      let barProps = {
        fill: datum.color,
        rx: rx,
        ry: ry,
        value: datum[valueKey],
        x: margins.left,
        y: yScale(index),
        width: xScale(datum[valueKey]),
        height: yScale.bandwidth(),
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
    const { xScale, svgHeight } = this;
    const {
      margins,
      xAxisOrient,
      xAxisTicks,
    } = this.props;
    const chartMargin = `translate(${margins.left},${margins.top})`;
    const axisMargin = `translate(${margins.left},${svgHeight})`;

    return (<g transform={chartMargin}>
      <Axis
        scale={xScale}
        orient={xAxisOrient}
        noOfTicks={xAxisTicks}
        transform={axisMargin}
      />
      {this.renderBarGroup()}
    </g>);
  }
}
export default BarChart;

BarChart.propTypes = BarChartPropTypes;
BarChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}