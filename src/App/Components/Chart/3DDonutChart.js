import React, { Component } from "react";
import { min, pie, hsl } from "d3";
import { formatAmount } from '../../utils'

class DonutChart extends Component {
  pieTop(d, rx, ry, ir) {
    if (d.endAngle - d.startAngle === 0) return "M 0 0";
    var sx = rx * Math.cos(d.startAngle),
      sy = ry * Math.sin(d.startAngle),
      ex = rx * Math.cos(d.endAngle),
      ey = ry * Math.sin(d.endAngle);

    var ret = [];
    ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
    ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
    return ret.join(" ");
  }

  pieInner(d, rx, ry, h, ir) {
    var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
    var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

    var sx = ir * rx * Math.cos(startAngle),
      sy = ir * ry * Math.sin(startAngle),
      ex = ir * rx * Math.cos(endAngle),
      ey = ir * ry * Math.sin(endAngle);

    var ret = [];
    ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
    return ret.join(" ");
  }

  pieOuter(d, rx, ry, h) {
    var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
    var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

    var sx = rx * Math.cos(startAngle),
      sy = ry * Math.sin(startAngle),
      ex = rx * Math.cos(endAngle),
      ey = ry * Math.sin(endAngle);

    var ret = [];
    ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
    return ret.join(" ");
  }

  renderPie({ svgWidth, svgHeight }) {
    const { data, innerRadius, outerRadius, valueKey, onClick, onHover } = this.props;
    const radius = min([svgWidth, svgHeight]) / 2
    const rx = radius - innerRadius
    const ry = radius - outerRadius
    const ir = 0.6
    const h = 20

    var pieTween = pie()
      .padAngle(.01)
      .sort(null)
      .value((item) => item[valueKey]);
    return pieTween(data).map((d, i) => {
      return (
        <g onClick={() => onClick(d.data)} key={`donut-group-${i}`}
          onMouseMove={(eve) => onHover(d.data, eve)}
          onMouseOut={() => onHover()}>
          <path className='innerSlice' d={this.pieInner(d, rx + 0.5, ry + 0.5, h, ir)} fill={hsl(d.data.color).darker(0.7)} />
          <path cursor={"pointer"} id={`donut-top-${i}`} strokeWidth={2} className='topSlice' stroke={d.data.selected ? '#FFF' : ''} d={this.pieTop(d, rx, ry, ir)} fill={d.data.color} />
          <path className='outerSlice' d={this.pieOuter(d, rx - 0.5, ry - 0.5, h)} fill={hsl(d.data.color).darker(0.7)} />
          <text
            x={1.3 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle))}
            y={1.2 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle))}
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
      <g transform={`translate(${svgWidth / 2},${svgHeight / 2}) `}>
        {this.renderPie({ svgWidth, svgHeight }).reverse()}
        <text textAnchor="middle" >Total</text>
        <text textAnchor="middle" dy="15">${formatAmount(totalAmount)}</text>
      </g>);
  }
}

export default DonutChart;
DonutChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}