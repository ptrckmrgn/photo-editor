import React from 'react';
import PropTypes from 'prop-types';

const Export = (props) => {
    return (
        <div>
            <label>Quality</label>
            <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={props.quality}
                onChange={event => props.onChangeQuality(event.target.value)}
            />
            <input
                type="number"
                min="0.01"
                max="1"
                step="0.01"
                value={props.quality}
                onClick={props.onClickInput}
                onChange={event => props.onChangeQuality(event.target.value)}
            />
            <span>Filesize: {props.filesize}</span>
            <a
                onClick={props.onClickDownload}
            >
                Download
            </a>
        </div>
    );
}

Export.propTypes = {
    onChangeQuality: PropTypes.func.isRequired
}

export default Export;