import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CropperJS from 'cropperjs';
// import diff from 'deep-diff';

import Cropper from './Cropper';
import { rotate, setZoom } from '../actions/history';
import { ROTATE, SET_ZOOM } from '../actions/history';
import Canvas from '../components/editor/Canvas';
import Toolbar from '../components/editor/Toolbar';
import Zoom from './editor/Zoom';
import Scale from './editor/Scale';
import Download from '../components/editor/Download';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.cropper = null;

        this.state = {
            // cropper: null,
            data: null,
            containerData: null,
            imageData: null,
            canvasData: null,
            cropBoxData: null,
            zoom: 100,
            scaleWidth: 0,
            height: 0,
            scaleLock: true,
            scaleX: 1,
            scaleY: 1,
            cropWidth: 0,
            cropHeight: 0,
            cropLock: true,
            rotation: 0,
            quality: 0.9
        };

        this.onClickInput = this.onClickInput.bind(this);

        this.onChangeRotation = this.onChangeRotation.bind(this);
        this.onClickRotate = this.onClickRotate.bind(this);

        this.onClickCrop = this.onClickCrop.bind(this);
        this.onChangeCropWidth = this.onChangeCropWidth.bind(this);
        this.onBlurCropWidth = this.onBlurCropWidth.bind(this);
        this.onChangeCropHeight = this.onChangeCropHeight.bind(this);
        this.onBlurCropHeight = this.onBlurCropHeight.bind(this);
        this.onChangeCropLock = this.onChangeCropLock.bind(this);
        this.onClickClear = this.onClickClear.bind(this);

        this.onChangeQuality = this.onChangeQuality.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);

        this.updateState = this.updateState.bind(this);
        this.updateCropper = this.updateCropper.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.scaleX != nextState.scaleX
                || this.state.scaleY != nextState.scaleY) {
            // this.cropper.scale(nextState.scaleX, nextState.scaleY);
        }
        //
        // console.log(this.state);
        // console.log(diff(this.state, nextState));
        // _.map(diff(this.state, nextState), (item) => {
        //     console.log(item);
        // })
    }

    // getCropperState(cropper = this.cropper) {
    //     const data = cropper.getData();
    //     const containerData = cropper.getContainerData();
    //     const imageData = cropper.getImageData();
    //     const canvasData = cropper.getCanvasData();
    //     const cropBoxData = cropper.getCropBoxData();
    //     const zoom = Math.floor(canvasData.width / canvasData.naturalWidth * 100);
    //
    //     const cropperData = {
    //         data: data,
    //         containerData: containerData,
    //         imageData: imageData,
    //         canvasData: canvasData,
    //         cropBoxData: cropBoxData,
    //         zoom: zoom
    //     }
    //
    //     this.props.getCropperData(cropperData);
    // }

    createCropper() {
        const image = document.querySelector('#image');
        // image.src = this.props.photo.urls.regular + "&client_id=cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335";
        const url = "https://images.unsplash.com/photo-1463111184515-4229db6371a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=bec71e9672ae71586e410920d512371a";
        const params = "&client_id=cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335";
        image.src = url + params;

        const cropper = new CropperJS(image, {
            viewMode: 1,
            autoCrop: false,
            wheelZoomRatio: 0.25
        });

        this.cropper = cropper;

        image.addEventListener('ready', () => {
            Cropper.fitCanvas(cropper);
            cropper.setDragMode('move');

            this.setState(() => {
                const canvasData = cropper.getCanvasData(),
                    data = cropper.getData();

                return {
                    cropper: cropper,
                    data: data,
                    containerData: cropper.getContainerData(),
                    imageData: cropper.getImageData(),
                    canvasData: canvasData,
                    cropBoxData: cropper.getCropBoxData(),
                    zoom: Math.floor(canvasData.width / canvasData.naturalWidth * 100),
                    scaleWidth: cropper.getImageData().naturalWidth,
                    scaleHeight: cropper.getImageData().naturalHeight,
                    rotation: data.rotate
                }
            });
        });

        image.addEventListener('zoom', (event) => {
            const zoom = Math.floor(event.detail.ratio * 100);
            this.setState({ zoom });
        });

        image.addEventListener('crop', event => {
            const cropWidth = _.ceil(event.detail.width);
            const cropHeight = _.ceil(event.detail.height);
            this.setState({ cropWidth, cropHeight });
        });
    }

    onClickInput(event) {
        event.target.select();
    }

    isPositiveInteger(value) {
        const regex = new RegExp(/(?!0)(\d+)(?!.)/);
        return regex.test(value);
    }

    cropWidth(cropWidth) {
        // TODO !!!!!!!!!!!!!!

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

    setRotation(rotation) {
        this.cropper.rotateTo(rotation);
        this.setState({rotation});
    }

    onClickRotate(direction) {
        const DEGREES = 45;
        const rotation = this.cropper.getData().rotate + direction * DEGREES;

        this.onChangeRotation(rotation);
    }

    onChangeRotation(rotation) {
        this.cropper.rotateTo(rotation);
        this.setState({ rotation });
    }

    onChangeQuality(event) {
        const quality = parseFloat(event.target.value);
        const head = 'data:image/jpeg;base64,';
        const size = document.querySelector('#filesize');
        const result = this.cropper.getCroppedCanvas({
            beforeDrawImage: (canvas) => {
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = 'high';
            }
        }).toDataURL('image/jpeg', quality);

        let filesize = _.round((result.length - head.length) * (3 / 4) / 1000);

        if (filesize.toString().length > 3) {
            filesize = _.round(filesize / 1000, 2) + ' MB';
        }
        else {
            filesize = filesize + ' KB';
        }

        size.innerHTML = filesize;
        this.setState({quality});
    }

    onClickDownload(event) {
        const link = event.target;
        const result = this.cropper.getCroppedCanvas({
            beforeDrawImage: (canvas) => {
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = 'high';
            }
        }).toDataURL('image/jpeg', this.state.quality);

        link.href = result;
        link.download = 'test.jpg';
    }

    /**
     * Calback function to update state
     */
    updateState(value) {
        this.setState(value);
    }

    /**
     * Calback function to update cropper
     */
    updateCropper(method, value) {
        this.cropper[method](value);
    }

    componentDidMount() {
        this.createCropper();
    }

    render() {
        if (!this.cropper) {
            return (
                <div>
                    <Canvas />
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <Canvas />
                <Zoom
                    zoom={this.state.zoom}
                    updateCropper={this.updateCropper}
                    updateState={this.updateState}
                />
                <Scale
                    // TODO rename width/height
                    cropper={this.cropper}
                    scaleWidth={this.state.scaleWidth}
                    scaleHeight={this.state.scaleHeight}
                    scaleX={this.state.scaleX}
                    scaleY={this.state.scaleY}
                    scaleLock={this.state.scaleLock}
                    updateCropper={this.updateCropper}
                    updateState={this.updateState}
                />
                <Toolbar
                    // props
                    cropWidth={this.state.cropWidth}
                    cropHeight={this.state.cropHeight}
                    cropLock={this.state.cropLock}

                    rotation={this.state.rotation}

                    // callbacks
                    onClickInput={this.onClickInput}

                    onClickRotate={this.onClickRotate}
                    onChangeRotation={this.onChangeRotation}

                    onClickCrop={this.onClickCrop}
                    onChangeCropWidth={this.onChangeCropWidth}
                    onBlurCropWidth={this.onBlurCropWidth}
                    onBlurCropHeight={this.onBlurCropHeight}
                    onChangeCropHeight={this.onChangeCropHeight}
                    onChangeCropLock={this.onChangeCropLock}
                    onClickClear={this.onClickClear}
                />
                <Download
                    // props
                    quality={this.state.quality}

                    // callbacks
                    onClickInput={this.onClickInput}
                    onChangeQuality={this.onChangeQuality}
                    onClickDownload={this.onClickDownload}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        history: state.history
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ rotate, setZoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);