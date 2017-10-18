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
            pageData: []
        }
        this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
        this.getPageData = this.getPageData.bind(this)
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

    render() {
        const { config, className, noDataContent, data: totalData, recordsToLoad } = this.props
        const { pageData: data, currentPage } = this.state
        const showLoadMore = (data.length > 0 && totalData.length > (currentPage * recordsToLoad))
        return (<div>
            <table className={`table-list ${className}`}>
                <THead config={config} />
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