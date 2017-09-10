import React from 'react';
import PropTypes from 'prop-types';

const CtrlZoom = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmitZoom}>
                <label>Zoom</label>
                <input
                    name="zoom"
                    type="number"
                    value={props.zoom}
                    onClick={event => event.target.select()}
                    onChange={event => props.onChangeZoom(event.target.value)}
                    onBlur={event => props.onBlurZoom(event.target.value)}
                />%
            </form>
        </div>
    );
}

CtrlZoom.propTypes = {
    zoom: PropTypes.number.isRequired,
    onChangeZoom: PropTypes.func.isRequired,
    onBlurZoom: PropTypes.func.isRequired,
    onSubmitZoom: PropTypes.func.isRequired
}

export default CtrlZoom;