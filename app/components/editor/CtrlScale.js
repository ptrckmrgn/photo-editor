import React from 'react';
import PropTypes from 'prop-types';

const CtrlScale = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                Scale:
                <label>W:</label>
                <input
                    type="number"
                    value={props.scaleWidth}
                    onClick={event => event.target.select()}
                    onChange={event => props.onChangeScaleWidth(event.target.value)}
                    onBlur={event => props.onBlurScaleWidth(event.target.value)}
                />
                <label>H:</label>
                <input
                    type="number"
                    value={props.scaleHeight}
                    onClick={event => event.target.select()}
                    onChange={event => props.onChangeScaleHeight(event.target.value)}
                    onBlur={event => props.onBlurScaleHeight(event.target.value)}
                />
                <input
                    type="checkbox"
                    checked={props.scaleLock}
                    onChange={event => props.onChangeScaleLock(event.target.checked)}
                />
                <button type="submit">Apply</button>
                <button type="button" onClick={props.onCancel}>X</button>
            </form>
        </div>
    );
}

// TODO
CtrlScale.propTypes = {
    // zoom: PropTypes.number.isRequired,
    // onChangeZoom: PropTypes.func.isRequired,
    // onBlurZoom: PropTypes.func.isRequired,
    // onSubmitZoom: PropTypes.func.isRequired
}

export default CtrlScale;