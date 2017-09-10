import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlZoom from '../../components/editor/CtrlZoom';
import helper from '../../utils/helper';

class Zoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 100
        };

        this.onChangeZoom = this.onChangeZoom.bind(this);
        this.onBlurZoom = this.onBlurZoom.bind(this);
        this.onSubmitZoom = this.onSubmitZoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ zoom: nextProps.zoom });
    }

    saveZoom() {
        const zoom = this.state.zoom;
        this.props.updateState({ zoom });
        this.props.updateCropper('zoomTo', zoom / 100);
    }

    onChangeZoom(zoom) {
        if (helper.isPositiveInteger(zoom) || helper.isZero(zoom)) {
            this.setState({ zoom });
        }
    }

    onBlurZoom(zoom) {
        if (helper.isZero(zoom)) {
            zoom = 1;
            this.setState({ zoom });
        }
        this.saveZoom();
    }

    onSubmitZoom(event) {
        event.preventDefault();
        this.saveZoom();
    }

    render() {
        return (
            <div>
                <CtrlZoom
                    zoom={this.state.zoom}
                    onChangeZoom={this.onChangeZoom}
                    onBlurZoom={this.onBlurZoom}
                    onSubmitZoom={this.onSubmitZoom}
                />
            </div>
        );
    }
}


Zoom.propTypes = {
    zoom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    updateState: PropTypes.func.isRequired,
    updateCropper: PropTypes.func.isRequired
}

export default Zoom;