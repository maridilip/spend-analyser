import { scaleOrdinal, schemeCategory20 } from 'd3'
const color = scaleOrdinal(schemeCategory20)
export const formatDataForChart = (data) => data.map((item, index) => ({
  id: (index + 1),
  ...item,
  color: color(item.label),
  selected: false
}))