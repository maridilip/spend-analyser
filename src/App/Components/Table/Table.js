import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import THead from './TableHead'
import TBody from './TableBody'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            pageData: [],
            sortParams: {
                sortColumn: '',
                sortType: 'asc'
            }
        }
        this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
        this.getPageData = this.getPageData.bind(this)
        this.onSort = this.onSort.bind(this)
    }

    onLoadMoreClick() {
        this.setState({
            currentPage: this.state.currentPage + 1
        }, () => this.getPageData())
    }

    getPageData(nextProps) {
        const { currentPage } = this.state
        const { recordsToLoad, data } = nextProps || this.props
        this.setState({
            pageData: data.slice(0, currentPage * recordsToLoad)
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: 1
        }, () => this.getPageData(nextProps))
    }

    componentDidMount() {
        this.getPageData()
    }

    onSort(sortParams) {
        if (!sortParams.sortable) {
            return;
        }

        const { sortColumn, sortType } = this.state.sortParams
        const sortedData = [...this.state.pageData].sort((a, b) => {
            if (a[sortParams.field] > b[sortParams.field]) {
                return -1
            }
            if (a[sortParams.field] < b[sortParams.field]) {
                return 1
            }
            return 0
        })
        this.setState({
            pageData: sortParams.field === sortColumn && sortType === 'asc' ? sortedData : sortedData.reverse(),
            sortParams: {
                sortType: sortParams.field === sortColumn && sortType === 'asc' ? 'desc' : 'asc',
                sortColumn: sortParams.field
            }
        })
    }

    render() {
        const { config, className, noDataContent, data: totalData, recordsToLoad } = this.props
        const { pageData: data, currentPage, sortParams } = this.state
        const showLoadMore = (data.length > 0 && totalData.length > (currentPage * recordsToLoad))
        return (<div>
            <table className={`table-list ${className}`}>
                <THead config={config} onSort={this.onSort} sortParams={sortParams} />
                {data.length === 0 ? <tr>
                    <td colSpan={config.length} className={'table-row-nodata'}>
                        <h4>{noDataContent}</h4>
                    </td>
                </tr> : null}
                {data.map((item, index) => <TBody key={`tbody-${index}`} data={item} config={config} />)}
                {showLoadMore ? <tr>
                    <td colSpan={config.length} className={'load-more-button'}>
                        <Button bsStyle="link" block onClick={this.onLoadMoreClick}>Load more..</Button>
                    </td>
                </tr> : null}
            </table>
        </div>)
    }
}

Table.propotypes = {
    recordsToLoad: PropTypes.number
}
Table.defaultProps = {
    recordsToLoad: 10
}
export default Table