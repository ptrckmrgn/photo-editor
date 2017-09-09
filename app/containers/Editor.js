import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CropperJS from 'cropperjs';

import Cropper from './Cropper';
import { rotate, setZoom } from '../actions/history';
import { ROTATE, SET_ZOOM } from '../actions/history';
import Canvas from '../components/editor/Canvas';
import Toolbar from '../components/editor/Toolbar';
import Download from '../components/editor/Download';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cropper: null,
            data: null,
            containerData: null,
            imageData: null,
            canvasData: null,
            cropBoxData: null,
            zoom: 100,
            width: 0,
            height: 0,
            scaleLock: true,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            quality: 0.9
        };

        this.onClickInput = this.onClickInput.bind(this);
        this.onClickRotate = this.onClickRotate.bind(this);
        this.onChangeZoom = this.onChangeZoom.bind(this);
        this.onChangeWidth = this.onChangeWidth.bind(this);
        this.onBlurWidth = this.onBlurWidth.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onBlurHeight = this.onBlurHeight.bind(this);
        this.onChangeScaleLock = this.onChangeScaleLock.bind(this);
        this.onChangeRotation = this.onChangeRotation.bind(this);
        this.onClickDownload = this.onClickDownload.bind(this);
        this.onChangeQuality = this.onChangeQuality.bind(this);
    }

    // getCropperState(cropper = this.state.cropper) {
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

    updateState(cropper = this.state.cropper) {
        const data = cropper.getData(),
            containerData = cropper.getContainerData(),
            imageData = cropper.getImageData(),
            canvasData = cropper.getCanvasData(),
            cropBoxData = cropper.getCropBoxData(),
            zoom = Math.floor(canvasData.width / canvasData.naturalWidth * 100),
            rotation = cropper.getData().rotate,
            width = cropper.getImageData().naturalWidth,
            height = cropper.getImageData().naturalHeight;

        this.setState(() => {
            return {
                cropper: cropper,
                data: data,
                containerData: containerData,
                imageData: imageData,
                canvasData: canvasData,
                cropBoxData: cropBoxData,
                zoom: zoom,
                width: width,
                height: height,
                rotation: rotation
            }
        });
    }

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

        image.addEventListener('ready', () => {
            Cropper.fitCanvas(cropper);
            this.updateState(cropper);
        });

        image.addEventListener('zoom', (event) => {
            const zoom = Math.floor(event.detail.ratio * 100);
            this.setState({zoom});
        });
    }

    onClickInput(event) {
        event.target.select();
    }

    onChangeZoom(event) {
        const zoom = event.target.value;

        this.state.cropper.zoomTo(zoom / 100);
        this.setState({zoom});
    }

    isPositiveInteger(value) {
        const regex = new RegExp(/(?!0)(\d+)(?!.)/);
        return regex.test(value);
    }

    scaleWidth(width) {
        const imageData = this.state.cropper.getImageData();
        const ratio = width / (imageData.naturalWidth * this.state.scaleX);
        const scaleX = ratio * this.state.scaleX;

        if (this.state.scaleLock) {
            const scaleY = this.state.scaleY * ratio;
            const height = _.max([_.round(imageData.naturalHeight * scaleY), 1]);

            this.setState({ width, height, scaleX, scaleY });
            this.state.cropper.scale(scaleX, scaleY)
        }
        else {
            this.setState({ width, scaleX });
            this.state.cropper.scaleX(scaleX)
        }
    }

    onChangeWidth(width) {
        if (this.isPositiveInteger(width)) {
            this.setState({ width });
            this.scaleWidth(width);
        }
        else if (width === '') {
            this.setState({ width });
        }
    }

    onBlurWidth(event) {
        let width = event.target.value;

        if (!this.isPositiveInteger(width)) {
            width = 1;
            this.scaleWidth(width);
        }
    }

    scaleHeight(height) {
        const imageData = this.state.cropper.getImageData();
        const ratio = height / (imageData.naturalHeight * this.state.scaleY);
        const scaleY = ratio * this.state.scaleY;

        if (this.state.scaleLock) {
            const scaleX = this.state.scaleX * ratio;
            const width = _.max([_.round(imageData.naturalWidth * scaleX), 1]);

            this.setState({ width, height, scaleX, scaleY });
            this.state.cropper.scale(scaleX, scaleY)
        }
        else {
            this.setState({ height, scaleY });
            this.state.cropper.scaleY(scaleY)
        }
    }

    onChangeHeight(event) {
        const height = event.target.value;

        if (this.isPositiveInteger(height)) {
            this.scaleHeight(height);
        }
        else if (height === '') {
            this.setState({ height });
        }
    }

    onBlurHeight(event) {
        let height = event.target.value;

        if (!this.isPositiveInteger(height)) {
            height = 1;
            this.scaleHeight(height);
        }
    }

    onChangeScaleLock(event) {
        const scaleLock = event.target.checked ? true : false;

        this.setState({scaleLock})
    }

    setRotation(rotation) {
        this.state.cropper.rotateTo(rotation);
        this.setState({rotation});
    }

    onClickRotate(direction) {
        const DEGREES = 45;
        const rotation = this.state.cropper.getData().rotate + direction * DEGREES;

        this.setRotation(rotation);
    }

    onChangeRotation(event) {
        this.setRotation(event.target.value);
    }

    onChangeQuality(event) {
        const quality = parseFloat(event.target.value);
        const head = 'data:image/jpeg;base64,';
        const size = document.querySelector('#filesize');
        const result = this.state.cropper.getCroppedCanvas({
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
        const result = this.state.cropper.getCroppedCanvas({
            beforeDrawImage: (canvas) => {
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = 'high';
            }
        }).toDataURL('image/jpeg', this.state.quality);

        link.href = result;
        link.download = 'test.jpg';
    }

    componentDidMount() {
        this.createCropper();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        if (!this.state.cropper) {
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
                <Toolbar
                    // props
                    zoom={this.state.zoom}
                    width={this.state.width}
                    height={this.state.height}
                    scaleLock={this.state.scaleLock}
                    rotation={this.state.rotation}

                    // callbacks
                    onClickInput={this.onClickInput}

                    onClickRotate={this.onClickRotate}
                    onChangeRotation={this.onChangeRotation}

                    onChangeZoom={this.onChangeZoom}

                    onChangeWidth={this.onChangeWidth}
                    onBlurWidth={this.onBlurWidth}
                    onBlurHeight={this.onBlurHeight}
                    onChangeHeight={this.onChangeHeight}
                    onChangeScaleLock={this.onChangeScaleLock}
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