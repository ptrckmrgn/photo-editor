import _ from 'lodash';

import { FETCH_PHOTOS } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_PHOTOS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}