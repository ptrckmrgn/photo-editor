import _ from 'lodash';

import {
    // GET_CROPPER_DATA,
    ROTATE,
    SET_ZOOM
} from '../actions/history';

const INCREMENT = 45;

export default function(state = null, action) {
    const newState = Object.assign({}, state);
    const id = Object.keys(newState).length ? Object.keys(newState).length : 0;

    switch (action.type) {
        // case GET_CROPPER_DATA:
        //     return action.payload;
        case ROTATE:
            const history = {
                'actionType': action.type,
                'to': action.to,
                'from': action.from
            }
            newState[id] = history;
            // return action.payload;
            // const degrees = state.data.rotate + action.payload * INCREMENT;
            // newState.data.rotate = degrees;
            return newState;
        case SET_ZOOM:
            const percentage = action.payload;
            newState.zoom = percentage;
            return newState;
        default:
            return state;
    }
}