import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlScale from '../../components/editor/CtrlScale';
import helper from '../../utils/helper';

class Scale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scaleWidth: 0,
            scaleHeight: 0,
            scaleX: 1,
            scaleY: 1,
            scaleLock: true
        };

        this.onChangeScaleWidth = this.onChangeScaleWidth.bind(this);
        this.onChangeScaleHeight = this.onChangeScaleHeight.bind(this);
        this.onBlurScaleWidth = this.onBlurScaleWidth.bind(this);
        this.onBlurScaleHeight = this.onBlurScaleHeight.bind(this);
        this.onChangeScaleLock = this.onChangeScaleLock.bind(this);
        this.onSubmitScale = this.onSubmitScale.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    }

    componentWillMount() {
        this.setState({
            scaleWidth: this.props.scaleWidth,
            scaleHeight: this.props.scaleHeight,
            scaleX: this.props.scaleX,
            scaleY: this.props.scaleY,
        });
    }

    scaleWidth(scaleWidth) {
        const imageData = this.props.cropper.getImageData();
        const ratio = scaleWidth / (imageData.naturalWidth * this.state.scaleX);
        const scaleX = ratio * this.state.scaleX;
        console.log(ratio);

        if (this.state.scaleLock) {
            const scaleY = this.state.scaleY * ratio;
            const scaleHeight = _.max([_.round(imageData.naturalHeight * scaleY), 1]);

            this.setState({ scaleWidth, scaleHeight, scaleX, scaleY });
            this.props.cropper.scale(scaleX, scaleY)
        }
        else {
            this.setState({ scaleWidth, scaleX });
            this.props.cropper.scaleX(scaleX);
        }
    }

    onChangeScaleWidth(scaleWidth) {
        if (helper.isPositiveInteger(scaleWidth)) {
            this.setState({ scaleWidth });
            this.scaleWidth(scaleWidth);
        }
        else if (helper.isZero(scaleWidth)) {
            this.setState({ scaleWidth });
        }
    }

    onBlurScaleWidth(scaleWidth) {
        if (helper.isZero(scaleWidth)) {
            scaleWidth = 1;
            this.setState({ scaleWidth });
            this.scaleWidth(scaleWidth);
        }
    }

    scaleHeight(scaleHeight) {
        const imageData = this.props.cropper.getImageData();
        const ratio = scaleHeight / (imageData.naturalHeight * this.state.scaleY);
        const scaleY = ratio * this.state.scaleY;

        if (this.state.scaleLock) {
            const scaleX = this.state.scaleX * ratio;
            const scaleWidth = _.max([_.round(imageData.naturalWidth * scaleX), 1]);

            this.setState({ scaleWidth, scaleHeight, scaleX, scaleY });
            this.props.cropper.scale(scaleX, scaleY)
        }
        else {
            this.setState({ scaleHeight, scaleY });
            this.props.cropper.scaleY(scaleY)
        }
    }

    onChangeScaleHeight(scaleHeight) {
        if (helper.isPositiveInteger(scaleHeight)) {
            this.setState({ scaleHeight });
            this.scaleHeight(scaleHeight);
        }
        else if (helper.isZero(scaleHeight)) {
            this.setState({ scaleHeight });
        }
    }

    onBlurScaleHeight(scaleHeight) {
        if (helper.isZero(scaleHeight)) {
            scaleHeight = 1;
            this.setState({ scaleHeight });
            this.scaleHeight(scaleHeight);
        }
    }

    onChangeScaleLock(scaleLock) {
        this.setState({ scaleLock })
    }

    onSubmitScale(event) {
        event.preventDefault();
        this.props.updateState({
            scaleWidth: this.state.scaleWidth,
            scaleHeight: this.state.scaleHeight,
            scaleX: this.state.scaleX,
            scaleY: this.state.scaleY
        });
    }

    onClickCancel() {
        this.props.cropper.scale(this.props.scaleX, this.props.scaleY);
        this.setState({
            scaleWidth: this.props.scaleWidth,
            scaleHeight: this.props.scaleHeight,
            scaleX: this.props.scaleX,
            scaleY: this.props.scaleY,
        });
    }

    render() {
        return (
            <div>
                <CtrlScale
                    scaleWidth={this.state.scaleWidth}
                    scaleHeight={this.state.scaleHeight}
                    scaleLock={this.state.scaleLock}

                    onChangeScaleWidth={this.onChangeScaleWidth}
                    onBlurScaleWidth={this.onBlurScaleWidth}
                    onBlurScaleHeight={this.onBlurScaleHeight}
                    onChangeScaleHeight={this.onChangeScaleHeight}
                    onChangeScaleLock={this.onChangeScaleLock}
                    onSubmitScale={this.onSubmitScale}
                    onClickCancel={this.onClickCancel}
                />
            </div>
        );
    }
}


// TODO
Scale.propTypes = {
    // zoom: PropTypes.number.isRequired,
    // updateState: PropTypes.func.isRequired,
    // updateCropper: PropTypes.func.isRequired
}

export default Scale;