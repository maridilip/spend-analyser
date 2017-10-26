import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textData: props.value
        }
        this.onChange = this.onChange.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
    }

    onChange(eve) {
        this.setState({
            textData: eve.target.value
        })
    }

    onEnterPress(eve) {
        if (eve.charCode === 13) {
            this.props.onSearch(this.state.textData)
        }
    }

    render() {
        const { placeHolder, onSearch } = this.props
        return <FormGroup className={"searc-form"}>
            <FormControl
                type="text"
                onChange={this.onChange}
                placeholder={placeHolder}
                className={'search-text-box pull-left'}
                value={this.state.textData}
                onKeyPress={this.onEnterPress}
                autoCapitalize
            />
            {' '}
            <Button bsStyle={"link"} type="button" onClick={() => onSearch(this.state.textData)} className={'pull-left'}>Search</Button>
        </FormGroup>
    }
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeHolder: PropTypes.string,
}

export default Search