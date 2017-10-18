import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class ToolTip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: {
                left: 0,
                top: 0
            }
        }
    }

    componentWillReceiveProps({ position }) {
        this.setPositions({ position })
    }

    componentDidMount() {
        this.setPositions(this.props)
    }

    setPositions({ position }) {
        if (this.toolTipDom) {
            const parentOffset = this.toolTipDom.offsetParent.getBoundingClientRect()
            this.setState({
                offset: {
                    left: position.pageX - parentOffset.left + 30,
                    top: position.clientY - parentOffset.top
                }
            })
        }
    }

    render() {
        const { left, top } = this.state.offset
        const { tooltipData, containerProps, children: Component, onTransactionDetailsClick } = this.props
        return <div ref={(ref) => this.toolTipDom = ref} className={'tool-tip'}
            style={{
                left: `${left || 0}px`,
                top: `${top || 0}px`
            }}>
            <div>
                {Component ? <Component data={tooltipData} /> :
                    <div>
                        <div>{tooltipData[containerProps.labelKey]}</div>
                        <div>{tooltipData[containerProps.valueKey]}</div>
                    </div>}
                <div className="transaction-details">
                    <Button bsSize="large" bsStyle="link" onClick={() => onTransactionDetailsClick(tooltipData)}>
                        <i className="glyphicon glyphicon-list" /> - Transactions
                </Button>
                </div>
            </div>
        </div>
    }
}

export default ToolTip

ToolTip.propTypes = {
    tooltipData: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    containerProps: PropTypes.object.isRequired,
    children: PropTypes.element
}