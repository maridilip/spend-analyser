import React, { Component } from "react";
import { arc, min, pie } from "d3";

class DonutChart extends Component {
  renderPie() {
    const { data, innerRadius, outerRadius, width, height, valueKey } = this.props;
    const radius = min([width, height]) / 2

    const arcTween = arc()
      .outerRadius(radius - innerRadius)
      .innerRadius(radius - outerRadius);

    var pieTween = pie()
      .sort(null)
      .value((item) => item[valueKey]);
    return pieTween(data).map((d, i) => {

      return (
        <g>
          <path stroke={d.data.selected ? '#000' : ''} index={i} d={arcTween(d)} fill={d.data.color} />
          <text
            transform={`translate(${arcTween.centroid(d)})`}
            textAnchor={'middle'}
            dy="0.35em"> {d.data[valueKey]}</text>
        </g>
      )
    });
  }

  render() {
    const { width, height } = this.props;

    return (
      <g transform={`translate(${width / 2},${height / 2})`}>
        {this.renderPie()}
      </g>);
  }
}

export default DonutChart;
DonutChart.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
}