import { combineReducers } from 'redux';
import Photos from './photos';
import Photo from './photo';
import History from './history';

const rootReducer = combineReducers({
    photos: Photos,
    photo: Photo,
    history: History
});

export default rootReducer;