import React from 'react';
import PropTypes from 'prop-types';

const Download = (props) => {
    return (
        <div>
            <label>Quality</label>
            <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={props.quality}
                onChange={props.onChangeQuality}
            />
            <input
                type="number"
                value={props.quality}
                onClick={props.onClickInput}
                onChange={props.onChangeQuality}
            />
            <span>Filesize: </span>
            <span id="filesize"></span>
            <a
                onClick={props.onClickDownload}
            >
                Download
            </a>
        </div>
    );
}

Download.propTypes = {
    onChangeQuality: PropTypes.func.isRequired
}

export default Download;