import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CtrlHistory from '../../components/editor/CtrlHistory';
import helper from '../../utils/helper';

class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CtrlHistory
                    onClickUndo={this.props.onClickUndo}
                    onClickRedo={this.props.onClickRedo}
                />
            </div>
        );
    }
}

History.propTypes = {

}

export default History;