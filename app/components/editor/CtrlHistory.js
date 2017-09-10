import React from 'react';
import PropTypes from 'prop-types';

const CtrlHistory = (props) => {
    return (
        <div>
            <button onClick={props.onClickUndo}>Undo</button>
            <button onClick={props.onClickRedo}>Redo</button>
        </div>
    );
}

CtrlHistory.propTypes = {
    // onClickUndo: PropTypes.func.isRequired,
    // onClickRedo: PropTypes.func.isRequired
}

export default CtrlHistory;