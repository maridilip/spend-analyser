import React, { Component } from "react";
import { scaleLinear, scaleBand, max } from "d3";
import Axis from "./Axis";
import BarChartPropTypes from './CommonBarChartPropTypes'

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  renderBarGroup({ xScale, yScale, svgHeight }) {
    const { margins, data, rx, ry, valueKey, onClick, onHover } = this.props;

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
        <g key={index} onClick={() => onClick(datum)}
          onMouseMove={(eve) => onHover(datum, eve)}
          onMouseOut={() => onHover()}>
          <rect {...barProps} cursor={"pointer"} />
        </g>
      );
    });
  }

  render() {
    const { height, width, margins, data, valueKey, yAxisOrient, yAxisTicks } = this.props;
    const svgWidth = width - margins.right - margins.left;
    const svgHeight = height - margins.top - margins.bottom;
    const yScale = scaleLinear()
      .rangeRound([svgHeight, 0])
      .domain([0, max(data, d => d[valueKey])]);
    const xScale = scaleBand()
      .padding(0.1)
      .rangeRound([0, svgWidth])
      .domain(data.map((d, i) => i));

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
        {this.renderBarGroup({ xScale, yScale, svgHeight })}
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