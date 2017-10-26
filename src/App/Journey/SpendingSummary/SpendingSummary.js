import React, { Component } from "react";
import { nest, extent } from 'd3'
import {
  Row, Col, ButtonToolbar,
  ToggleButtonGroup, ToggleButton,
  DropdownButton, MenuItem
} from 'react-bootstrap'
import moment from 'moment'

import Chart, { ChartTypes } from "../../Components/Chart";
import Table from '../../Components/Table'
import Section from '../../Components/Section'
import Card from '../../Components/Card'
import {
  TopCategoriesWidget, AccountsWidget, TableVendorName,
  SpendByCatergoryHeader, TransactionSummaryHeader, ChartToolTip
} from './Components'
import { getSpendingSummary } from './service'
import { formatAmount } from '../../utils'

const data = [{ label: 'label1', value: 10 }, { label: 'label2', value: 20 }, { label: 'labe3', value: 30 }, { label: 'label4', value: 40 }, { label: 'label5', value: 50 }, { label: 'label6', value: 60 }];
const chartProps = {
  height: 250,
  width: 400,
  margins: {
    top: 10,
    left: 10,
    bottom: 20,
    right: 40
  },
  data,
  xAxisTicks: 5,
  xAxisOrient: "bottom",
  Component: ChartTypes.HORIZONTAL_BAR_CHART,
  tooltipComponent: ChartToolTip
};

const verticalChartProps = {
  ...chartProps,
  yAxisOrient: "left",
  yAxisTicks: 5,
  margins: {
    top: 10,
    left: 30,
    bottom: 10,
    right: 40
  },
  Component: ChartTypes.VERTICAL_BAR_CHART,
  valueKey: 'value',
  labelKey: 'key'
};

const donutChartProps = {
  height: 250,
  width: 400,
  data,
  innerRadius: 20,
  outerRadius: 40,
  Component: ChartTypes.DONUT_CHART,
  valueKey: 'value',
  labelKey: 'key',
  margins: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  tooltipComponent: ChartToolTip
}

const tableConfig = [{
  label: 'Date',
  field: 'date',
  width: '15%',
  dataType: 'date',
  sortable: true
}, {
  label: 'Vendor name',
  Component: TableVendorName,
  width: '40%',
  dataType: 'string',
  sortable: true
}, {
  label: 'Amount',
  field: 'amount',
  width: '10%',
  dataType: 'amount',
  sortable: true
}, {
  label: 'Category',
  field: 'categoryDesc',
  width: '35%',
  dataType: 'string',
  sortable: true
}]

class SpendingSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceResponse: [],
      spentData: [],
      tableData: [],
      rangeBasedData: [],
      showBarPie: 'pie',
      dateExtent: [],
      dateRangeDropdownData: [{
        selected: true,
        value: 30
      }, {
        selected: false,
        value: 60
      }, {
        selected: false,
        value: 90
      }],
      dateRangeSelected: {
        value: 30
      },
      showByCategory: true
    }
    this.onSectionSelect = this.onSectionSelect.bind(this)
    this.onDateRangeDropdownChange = this.onDateRangeDropdownChange.bind(this)
    this.headerChange = this.headerChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  componentDidMount() {
    getSpendingSummary().then(response => {
      this.getRangeBasedData(response)
      this.setState({
        serviceResponse: response
      })
    })
  }

  getRangeBasedData(serviceResponse) {
    const response = serviceResponse || this.state.serviceResponse
    const extentBasedOnDate = extent(response, (item) => moment(item.date, 'DD/MM/YYYY').toDate())
    const rangeBasedData = [...response].map(item => {
      item.amount = `$${formatAmount(parseFloat(item.amount.replace(/[$,]/g, '')).toFixed(2))}`
      return item
    }).filter(item => {
      const maxDate = moment(extentBasedOnDate[1])
      const minDate = moment(extentBasedOnDate[1]).subtract(this.state.dateRangeSelected.value, "days")
      const currentDate = moment(item.date, 'DD/MM/YYYY')
      return currentDate.isBetween(minDate, maxDate, null, '[)')
    })
    const nestedData = nest()
      .key(d => d.category)
      .rollup(data => data.reduce((total, current) => {
        const currentAmount = parseFloat(current.amount.replace(/[$,]/g, ''));
        return (parseFloat(parseFloat(total + currentAmount).toFixed(2)))
      }, 0))
      .entries(rangeBasedData)

    this.setState({
      spentData: nestedData,
      rangeBasedData,
      dateExtent: extentBasedOnDate,
      tableData: this.state.showByCategory ? this.state.tableData : rangeBasedData
    })
  }

  onSectionSelect(selectedDataArray) {
    const selectedData = selectedDataArray.filter(item => item.selected)
    const filterByCatergory = selectedData.reduce((total, selectedItem) => {
      return total.concat(this.state.rangeBasedData.filter(totalItem => totalItem.category === selectedItem.key))
    }, []).map(item => {
      item.amount = formatAmount(item.amount)
      return item
    })
    this.setState({
      tableData: filterByCatergory
    })
  }

  onDateRangeDropdownChange(selectedData) {
    const updatedData = this.state.dateRangeDropdownData.map(item => {
      item.selected = item.value === selectedData.value
      return item
    })
    this.setState({
      dateRangeDropdownData: updatedData,
      dateRangeSelected: selectedData,
      tableData: []
    }, () => this.getRangeBasedData())
  }

  headerChange(headerType) {
    this.setState({
      showByCategory: headerType === 'category' ? true : false,
      tableData: []
    }, () => this.getRangeBasedData())
  }

  onSearch({ target }) {
    const rangeDataCopy = [...this.state.rangeBasedData]
    this.setState({
      tableData: rangeDataCopy.filter(item => {
        const comparatorString = `${item.date} ${item.vendorName} ${item.amount} ${item.categoryDesc}`.toLowerCase()
        return comparatorString.indexOf(target.value.toLowerCase()) > -1
      })
    })
  }

  render() {
    const { tableData, spentData, dateRangeSelected, dateExtent } = this.state
    const maxMomentDate = moment(dateExtent[1])
    const maxDate = maxMomentDate.format('DD MMMM YYYY')
    const minDate = maxMomentDate.subtract(dateRangeSelected.value, 'days').format('DD MMMM YYYY')
    return (<Section header={"Spending summary"}>
      <Row>
        <Col sm={4} md={3}>
          <TopCategoriesWidget data={spentData} />
          <AccountsWidget />
        </Col>
        <Col sm={8} md={9}>
          <Row>
            <Col xs={12}>
              <Card>
                <Row>
                  <Col xs={7} md={9} className={'category-header'}>
                    {this.state.showByCategory ?
                      <SpendByCatergoryHeader minDate={minDate} maxDate={maxDate} onClick={this.headerChange} /> :
                      <TransactionSummaryHeader minDate={minDate} maxDate={maxDate} onClick={this.headerChange} onSearch={this.onSearch} />}
                  </Col>
                  <Col xs={5} md={3}>
                    <DropdownButton id="date-range-dropdown"
                      title={`Last ${dateRangeSelected.value} days`}
                      onSelect={this.onDateRangeDropdownChange}>
                      {this.state.dateRangeDropdownData.map(item => <MenuItem
                        eventKey={item}
                        active={item.selected}>
                        {item.value}
                      </MenuItem>)}
                    </DropdownButton>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>
                {this.state.showByCategory ?
                  <Col md={7}>
                    {this.state.showBarPie === 'pie' ?
                      <Chart {...donutChartProps} data={spentData} onSelect={this.onSectionSelect} /> :
                      <Chart {...verticalChartProps} data={spentData} onSelect={this.onSectionSelect} />}
                    <div style={{
                      width: "92px",
                      margin: "0px auto"
                    }}>
                      <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={'pie'}>
                          <ToggleButton
                            onClick={() => this.setState({ showBarPie: 'pie' })}
                            value={'pie'}>Pie</ToggleButton>
                          <ToggleButton
                            onClick={() => this.setState({ showBarPie: 'bar' })}
                            value={'bar'}>Bar</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                    </div>
                  </Col> : null}
                <Col md={this.state.showByCategory ? 5 : 12}>
                  <Table config={tableConfig}
                    data={tableData}
                    className={this.state.showByCategory ? "spending-summary-table" : "spending-summary-table only-transaction"}
                    noDataContent={this.state.showByCategory ? "Please select a categoty" : "No transactions found"} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Section >)
  }
}
export default SpendingSummary
