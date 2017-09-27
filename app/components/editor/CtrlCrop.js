import React from 'react';
import PropTypes from 'prop-types';

const Download = (props) => {
    return (
        <div>
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

Download.propTypes = {
    onChangeQuality: PropTypes.func.isRequired
}

export default Download;