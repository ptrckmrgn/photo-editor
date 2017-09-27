import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlRotate from '../../components/editor/CtrlRotate';

class Rotate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rotation: this.props.rotation
        };

        this.onChangeRotation = this.onChangeRotation.bind(this);
        this.onClickRotate = this.onClickRotate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onClickRotate(direction) {
        const DEGREES = 45;
        const rotation = (this.state.rotation + direction * DEGREES) % 360;

        this.onChangeRotation(rotation);
    }

    onChangeRotation(rotation) {
        this.props.updateCropper('rotateTo', rotation);
        // this.cropper.rotateTo(rotation);
        this.setState({ rotation });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.updateState({
            rotation: this.state.rotation,
        });
    }

    onCancel() {
        const rotation = this.props.rotation;
        this.props.updateCropper('rotateTo', rotation);
        this.setState({ rotation });
    }

    componentWillUpdate(nextProps) {
        if (JSON.stringify(this.props) != JSON.stringify(nextProps)) {
            this.setState({
                rotation: nextProps.rotation
            });
        }
    }

    render() {
        return (
            <div>
                <CtrlRotate
                    rotation={this.state.rotation}

                    onChangeRotation={this.onChangeRotation}
                    onClickRotate={this.onClickRotate}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        );
    }
}


// TODO
Rotate.propTypes = {
    // zoom: PropTypes.number.isRequired,
    // updateState: PropTypes.func.isRequired,
    // updateCropper: PropTypes.func.isRequired
}

export default Rotate;