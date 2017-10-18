import React, { Component } from "react";
import { arc, min, pie } from "d3";
import { formatAmount } from '../../utils'

class DonutChart extends Component {
  renderPie({ svgWidth, svgHeight }) {
    const { data, innerRadius, outerRadius, valueKey, onClick, onHover } = this.props;
    const radius = min([svgWidth, svgHeight]) / 2

    const arcTween = arc()
      .outerRadius(radius - innerRadius)
      .innerRadius(radius - outerRadius);

    var pieTween = pie()
      .padAngle(.01)
      .sort(null)
      .value((item) => item[valueKey]);
    return pieTween(data).map((d, i) => {
      var _d = arcTween.centroid(d)
      _d[0] *= 1.6
      _d[1] *= 1.5
      return (
        <g onClick={() => onClick(d.data)} key={`donut-group-${i}`}
          onMouseMove={(eve) => onHover(d.data, eve)}
          onMouseOut={() => onHover()}>
          <path cursor={"pointer"} stroke={d.data.selected ? '#000' : ''} d={arcTween(d)} fill={d.data.color} />
          <text
            transform={`translate(${_d}) `}
            textAnchor={'middle'}
            dy="0.35em"> ${formatAmount(d.data[valueKey])}</text>
        </g>
      )
    });
  }

  render() {
    const { width, height, data, valueKey, margins } = this.props;
    const svgWidth = width - margins.left - margins.right
    const svgHeight = height - margins.top - margins.bottom
    const totalAmount = data.reduce((total, current) => (total + current[valueKey]), 0)
    return (
      <g transform={`translate(${width / 2},${height / 2}) `}>
        {this.renderPie({ svgWidth, svgHeight })}
        <text textAnchor="middle" dy="-10">Total</text>
        <text textAnchor="middle" dy="5">${formatAmount(totalAmount)}</text>
      </g>);
  }
}

export default DonutChart;
DonutChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}