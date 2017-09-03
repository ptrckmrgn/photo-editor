import _ from 'lodash';

import { SELECT_PHOTO } from '../actions';

export default function(state = null, action) {
    switch (action.type) {
        case SELECT_PHOTO:
            return action.payload;
        default:
            return state;
    }
}