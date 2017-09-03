import axios from 'axios';

export const FETCH_PHOTOS = 'fetch_photos';
export const SELECT_PHOTO = 'select_photo';

const ROOT_URL = 'https://api.unsplash.com';
const CLIENT_ID = '?client_id=cc78fb913f5d55dc67a375382fe3253b89173e2fe02ccf1b1cd1997e843cb335';
const MAX_PHOTOS = 30;

export function fetchPhotos() {
    // const photos = axios.get(`${ROOT_URL}/photos/random/${CLIENT_ID}&count=${MAX_PHOTOS}`);
    const photos = axios.get('../../resources/test.json');

    return {
        type: FETCH_PHOTOS,
        payload: photos
    };
}

export function selectPhoto(id) {
    return {
        type: SELECT_PHOTO,
        payload: id
    };
}