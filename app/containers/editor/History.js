import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlHistory from '../../components/editor/CtrlHistory';

// TODO: Delete this? Duplicated with CtrlHistory

const History = (props) => {
    return (
        <div>
            <CtrlHistory
                onClickUndo={props.onClickUndo}
                onClickRedo={props.onClickRedo}
            />
        </div>
    );
}

History.propTypes = {
    onClickUndo: PropTypes.func.isRequired,
    onClickRedo: PropTypes.func.isRequired
}

export default History;