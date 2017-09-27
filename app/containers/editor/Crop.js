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

    componentDidMount() {
        this.setState({
            scaleWidth: this.props.scaleWidth,
            scaleHeight: this.props.scaleHeight,
            scaleX: this.props.scaleX,
            scaleY: this.props.scaleY,
        });
    }

    componentWillUpdate(nextProps) {
        if (JSON.stringify(this.props) != JSON.stringify(nextProps)) {
            this.setState({
                scaleWidth: nextProps.scaleWidth,
                scaleHeight: nextProps.scaleHeight,
                scaleX: nextProps.scaleX,
                scaleY: nextProps.scaleY,
            });
        }
    }



    // TODO !!!!!!!!!!!!!!



    cropWidth(cropWidth) {
        // const ratio = cropWidth / (imageData.naturalWidth * this.state.scaleX);
        // const scaleX = ratio * this.state.scaleX;
        //
        // if (this.state.scaleLock) {
        //     const scaleY = this.state.scaleY * ratio;
        //     const cropHeight = _.max([_.round(imageData.naturalHeight * scaleY), 1]);
        //
        //     this.setState({ cropWidth, cropHeight, scaleX, scaleY });
        //     this.cropper.scale(scaleX, scaleY)
        // }
        // else {
        //     this.setState({ cropWidth, scaleX });
        //     this.cropper.scaleX(scaleX)
        // }
    }

    onChangeCropWidth(cropWidth) {
        if (this.isPositiveInteger(cropWidth)) {
            this.setState({ cropWidth });
            this.cropWidth(cropWidth);
        }
        else if (cropWidth === '') {
            this.setState({ cropWidth });
        }
    }

    onBlurCropWidth(cropWidth) {
        if (!this.isPositiveInteger(cropWidth)) {
            cropWidth = 1;
            this.cropWidth(cropWidth);
        }
    }

    cropHeight(cropHeight) {
        // const imageData = this.cropper.getImageData();
        // const ratio = cropHeight / (imageData.naturalHeight * this.state.scaleY);
        // const scaleY = ratio * this.state.scaleY;
        //
        // if (this.state.scaleLock) {
        //     const scaleX = this.state.scaleX * ratio;
        //     const cropWidth = _.max([_.round(imageData.naturalWidth * scaleX), 1]);
        //
        //     this.setState({ cropWidth, cropHeight, scaleX, scaleY });
        //     this.cropper.scale(scaleX, scaleY)
        // }
        // else {
        //     this.setState({ cropHeight, scaleY });
        //     this.cropper.scaleY(scaleY)
        // }
    }

    onChangeCropHeight(cropHeight) {
        if (this.isPositiveInteger(cropHeight)) {
            this.scaleHeight(cropHeight);
        }
        else if (cropHeight === '') {
            this.setState({ cropHeight });
        }
    }

    onBlurCropHeight(cropHeight) {
        if (!this.isPositiveInteger(cropHeight)) {
            cropHeight = 1;
            this.cropHeight(cropHeight);
        }
    }

    onChangeCropLock(checked) {
        const cropLock = checked ? true : false;

        this.setState({ cropLock });
    }

    onClickCrop() {
        this.cropper.crop();

        const cropBoxData = this.cropper.getCropBoxData();
        const cropWidth = _.ceil(cropBoxData.width);
        const cropHeight = _.ceil(cropBoxData.height);

        this.setState({ cropWidth, cropHeight });
    }

    onClickClear() {
        this.cropper.clear();
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