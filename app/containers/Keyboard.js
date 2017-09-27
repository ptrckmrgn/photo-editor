import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: Fix this terrible code.

let newProps = null;

const Keyboard = (props) => {
    newProps = props;
    return (null);
}

const checkKey = event => {
    event = event || window.event;
    if (event.ctrlKey && event.keyCode == '90') {
        newProps.onCtrlZ();
    }
    else if (event.ctrlKey && event.keyCode == '89') {
        newProps.onCtrlY();
    }
}

document.onkeydown = checkKey;

Keyboard.propTypes = {
    onCtrlZ: PropTypes.func.isRequired,
    onCtrlY: PropTypes.func.isRequired,
}

export default Keyboard;