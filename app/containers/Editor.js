import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CropperJS from 'cropperjs';
// import diff from 'deep-diff';

import Cropper from './Cropper';
import { makeHistory, undoHistory, redoHistory } from '../actions/history';
import Canvas from '../components/editor/Canvas';
import History from './editor/History';
import Zoom from './editor/Zoom';
import Scale from './editor/Scale';
import Rotate from './editor/Rotate';
import Export from './editor/Export';

import Keyboard from './Keyboard';


class Editor extends Component {
    constructor(props) {
        super(props);

        this.cropper = null;

        this.state = {
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

        this.updateState = this.updateState.bind(this);
        this.updateCropper = this.updateCropper.bind(this);
    }

    componentDidMount() {
        this.createCropper();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.history) {
            if (nextProps.history.active != this.props.history.active) {
                const newState = nextProps.history[nextProps.history.active];
                this.setState(newState);
            }
        }
        if (this.state.scaleX != nextState.scaleX
                || this.state.scaleY != nextState.scaleY) {
            this.cropper.scale(nextState.scaleX, nextState.scaleY);
        }
        if (this.state.rotation != nextState.rotation) {
            this.cropper.rotateTo(nextState.rotation);
        }
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
            }, () => {
                this.props.makeHistory(this.state);
            });
        });

        image.addEventListener('zoom', event => {
            const zoom = Math.floor(event.detail.ratio * 100);
            this.setState({ zoom });
        });

        image.addEventListener('crop', event => {
            const cropWidth = _.ceil(event.detail.width);
            const cropHeight = _.ceil(event.detail.height);
            this.setState({ cropWidth, cropHeight });
        });
    }

    /**
     * Calback function to update state
     */
    updateState(value) {
        this.setState(value, () => {
            this.props.makeHistory(this.state);
        });
    }

    /**
     * Calback function to update cropper
     */
    updateCropper(method, valueA, valueB) {
        this.cropper[method](valueA, valueB);
    }

    getCropper() {
        return this.cropper;
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

                <History
                    onClickUndo={this.props.undoHistory}
                    onClickRedo={this.props.redoHistory}
                />

                <Zoom
                    zoom={this.state.zoom}
                    updateCropper={this.updateCropper}
                    updateState={this.updateState}
                />

                <Rotate
                    rotation={this.state.rotation}
                    updateCropper={this.updateCropper}
                    updateState={this.updateState}
                />

                <Scale
                    imageData={this.cropper.getImageData()}
                    scaleWidth={this.state.scaleWidth}
                    scaleHeight={this.state.scaleHeight}
                    scaleX={this.state.scaleX}
                    scaleY={this.state.scaleY}
                    scaleLock={this.state.scaleLock}
                    updateCropper={this.updateCropper}
                    updateState={this.updateState}
                />

                <Export
                    cropper={this.cropper}
                />

                <Keyboard
                    onCtrlZ={this.props.undoHistory}
                    onCtrlY={this.props.redoHistory}
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
    return bindActionCreators({ makeHistory, undoHistory, redoHistory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);