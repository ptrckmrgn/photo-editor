import _ from 'lodash';

import {
    MAKE,
    UNDO,
    REDO
} from '../actions/history';

export default function(state = null, action) {
    const newState = Object.assign({}, state);
    const id = Object.keys(newState).length ? Object.keys(newState).length - 1 : 0;

    switch (action.type) {
        case MAKE:
            newState[id] = action.payload;
            newState.active = id;
            return newState;
        case UNDO:
            newState.active = newState.active - 1;
            return newState;
        case REDO:
            newState.active = newState.active + 1;
            return newState;
        default:
            return state;
    }
}