import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
    return (
        <div>
            {/* <form onSubmit={props.onSubmitZoom}>
                <label>Zoom</label>
                <input
                    type="number"
                    min="1"
                    value={props.zoom}
                    onClick={props.onClickInput}
                    onChange={(event) => props.onChangeZoom(event.target.value)}
                    onBlur={props.onSubmitZoom}
                />%
            </form> */}

            <label>Rotation</label>
            <input
                type="number"
                value={props.rotation}
                onClick={props.onClickInput}
                onChange={(event) => props.onChangeRotation(event.target.value)}
            />
            <button
                onClick={() => props.onClickRotate(-1)}
            >
                A
            </button>
            <button
                onClick={() => props.onClickRotate(1)}
            >
                C
            </button>

            {/* <label>Width</label>
            <input
                type="number"
                value={props.width}
                onClick={props.onClickInput}
                onChange={event => props.onChangeWidth(event.target.value)}
                onBlur={props.onBlurWidth}
            />
            <label>Height</label>
            <input
                type="number"
                value={props.height}
                onClick={props.onClickInput}
                onChange={props.onChangeHeight}
                onBlur={props.onBlurHeight}
            />
            <input
                type="checkbox"
                checked={props.scaleLock}
                onChange={props.onChangeScaleLock}
            /> */}

            <button
                onClick={props.onClickCrop}
            >
                Crop
            </button>
            <label>CropWidth</label>
            <input
                type="number"
                value={props.cropWidth}
                onClick={props.onClickInput}
                onChange={event => props.onChangeCropWidth(event.target.value)}
                onBlur={event => props.onBlurCropWidth(event.target.value)}
            />
            <label>CropHeight</label>
            <input
                type="number"
                value={props.cropHeight}
                onClick={props.onClickInput}
                onChange={event => props.onChangeCropHeight(event.target.value)}
                onBlur={event => props.onBlurCropHeight(event.target.value)}
            />
            <input
                type="checkbox"
                checked={props.cropLock}
                onChange={event => props.onChangeCropLock(event.target.checked)}
            />
            <button
                onClick={props.onClickClear}
            >
                Clear
            </button>
        </div>
    );
}

Toolbar.propTypes = {
    onClickRotate: PropTypes.func.isRequired
}

export default Toolbar;