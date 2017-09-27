import React from 'react';
import PropTypes from 'prop-types';

const CtrlRotate = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <label>Rotation</label>
                <input
                    type="number"
                    value={props.rotation}
                    onClick={props.onClickInput}
                    onChange={(event) => props.onChangeRotation(event.target.value)}
                />
                <button
                    type="button"
                    onClick={() => props.onClickRotate(-1)}
                >
                    A
                </button>
                <button
                    type="button"
                    onClick={() => props.onClickRotate(1)}
                >
                    C
                </button>
                <button type="submit">Apply</button>
                <button type="button" onClick={props.onCancel}>X</button>
            </form>
        </div>
    );
}

CtrlRotate.propTypes = {
    // onChangeQuality: PropTypes.func.isRequired
}

export default CtrlRotate;