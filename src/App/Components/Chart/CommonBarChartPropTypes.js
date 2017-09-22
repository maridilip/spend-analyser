import PropTypes from 'prop-types'

export default {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  margins: PropTypes.object.isRequired,
  xAxisOrient: PropTypes.string,
  yAxisOrient: PropTypes.string,
  xAxisTicks: PropTypes.number,
  yAxisTicks: PropTypes.number,
  rx: PropTypes.number,
  ry: PropTypes.number,
  showLegend: PropTypes.bool.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
};