import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
    return (
        <div>
            <label>Zoom</label>
            <input
                type="number"
                min="1"
                value={props.zoom}
                onClick={props.onClickInput}
                onChange={props.onChangeZoom}
            />%
            <label>Width</label>
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
                min="1"
                value={props.height}
                onClick={props.onClickInput}
                onChange={props.onChangeHeight}
                onBlur={props.onBlurHeight}
            />
            <input
                type="checkbox"
                checked={props.scaleLock}
                onChange={props.onChangeScaleLock}
            />
            <button
                onClick={() => props.onClickRotate(-1)}
            >
                Anti-Clockwise
            </button>
            <button
                onClick={() => props.onClickRotate(1)}
            >
                Clockwise
            </button>
            <label>Rotation</label>
            <input
                type="number"
                value={props.rotation}
                onClick={props.onClickInput}
                onChange={props.onChangeRotation}
            />
        </div>
    );
}

Toolbar.propTypes = {
    onClickRotate: PropTypes.func.isRequired
}

export default Toolbar;