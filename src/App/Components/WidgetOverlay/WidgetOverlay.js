import React, { Component } from 'react'

class WidgetOverlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hovered: false
        }
        this.getDOM = this.getDOM.bind(this)
        this.showHideOverlay = this.showHideOverlay.bind(this)
        this.overlayDOM = null
    }

    getDOM(ref) {
        if (ref) {
            this.overlayDOM = ref
        }
    }

    componentWillReceiveProps() {
        this.showHideOverlay(false)
    }

    componentDidMount() {
        if (this.overlayDOM) {
            this.overlayDOM.addEventListener('mouseover', this.showHideOverlay.bind(this, true))
            this.overlayDOM.addEventListener('mouseout', this.showHideOverlay.bind(this, false))
        }
    }

    componentWillUnmount() {
        this.overlayDOM.removeEventListener('mouseover', this.showHideOverlay)
        this.overlayDOM.removeEventListener('mouseout', this.showHideOverlay)
    }

    showHideOverlay(hovered) {
        this.setState({ hovered })
    }

    render() {
        const { overlayContet: Component, children } = this.props
        const className = this.state.hovered ? 'hovered' : ''
        return <div ref={this.getDOM} className={`widget-overlay ${className}`}>
            {children}
            <div className="overlay-toggler">
                <Component />
            </div>
        </div>
    }
}

export default WidgetOverlay