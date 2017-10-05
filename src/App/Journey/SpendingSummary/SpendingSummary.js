import React from "react";
import Card from '../../Components/Card'
import Chart, { ChartTypes } from "../../Components/Chart";

const data = [{ label: 'label1', value: 10 }, { label: 'label2', value: 20 }, { label: 'labe3', value: 30 }, { label: 'label4', value: 40 }, { label: 'label5', value: 50 }, { label: 'label6', value: 60 }];
const chartProps = {
  height: 250,
  width: 350,
  margins: {
    top: 10,
    left: 10,
    bottom: 20,
    right: 40
  },
  data,
  xAxisTicks: 5,
  xAxisOrient: "bottom",
  Component: ChartTypes.HORIZONTAL_BAR_CHART
};

const verticalChartProps = {
  ...chartProps,
  yAxisOrient: "left",
  yAxisTicks: 5,
  margins: {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  },
  Component: ChartTypes.VERTICAL_BAR_CHART
};

const donutChartProps = {
  height: 300,
  width: 300,
  data,
  innerRadius: 0,
  outerRadius: 70,
  Component: ChartTypes.DONUT_CHART
}
export default () => (
  <div>
    <Chart {...chartProps} />
    <Chart {...verticalChartProps} />
    <Chart {...donutChartProps} />
  </div>
);
