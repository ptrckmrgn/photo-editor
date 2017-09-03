import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
    return (
        <div>
            <label>Zoom</label>
            <input
                value={props.zoom}
                onClick={props.onClickInput}
                onChange={props.onChangeZoom}
            />%
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