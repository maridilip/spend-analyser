import { scaleOrdinal, schemeCategory20 } from 'd3'
const color = scaleOrdinal(schemeCategory20)
export const formatDataForChart = (data, labelKey) => data.map((item, index) => ({
  id: (index + 1),
  ...item,
  color: color(item[labelKey]),
  selected: false
}))