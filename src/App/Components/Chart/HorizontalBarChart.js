import React, { Component } from "react";
import { scaleLinear, scaleBand, max } from "d3";
import Axis from "./Axis";
import BarChartPropTypes from './CommonBarChartPropTypes'

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.renderBarGroup = this.renderBarGroup.bind(this);
  }

  renderBarGroup({ yScale, xScale }) {
    const { margins, data, rx, ry, valueKey, onClick, onHover } = this.props;

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
        <g key={index} onClick={() => onClick(datum)}
          onMouseOver={(eve) => onHover(datum, eve)}
          onMouseOut={() => onHover()}
        >
          <rect {...barProps} cursor={"pointer"}/>
        </g>
      );
    });
  }

  render() {
    const { height, width, margins, data, valueKey, xAxisOrient, xAxisTicks } = this.props;
    const svgWidth = width - margins.right - margins.left;
    const svgHeight = height - margins.top - margins.bottom;
    const xScale = scaleLinear()
      .rangeRound([0, svgWidth])
      .domain([0, max(data, d => d[valueKey])]);
    const yScale = scaleBand()
      .padding(0.1)
      .rangeRound([0, svgHeight])
      .domain(data.map((d, i) => i));

    const chartMargin = `translate(${margins.left},${margins.top})`;
    const axisMargin = `translate(${margins.left},${svgHeight})`;

    return (<g transform={chartMargin}>
      <Axis
        scale={xScale}
        orient={xAxisOrient}
        noOfTicks={xAxisTicks}
        transform={axisMargin}
      />
      {this.renderBarGroup({ xScale, yScale })}
    </g>);
  }
}
export default BarChart;

BarChart.propTypes = BarChartPropTypes;
BarChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}