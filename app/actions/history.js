// export const GET_CROPPER_DATA = 'get_cropper_data';
export const ROTATE = 'rotate';
export const SET_ZOOM = 'set_zoom';

// export function getCropperData(cropper) {
//     return {
//         type: GET_CROPPER_DATA,
//         payload: cropper
//     };
// }

export function rotate(to, from) {
    return {
        type: ROTATE,
        to: to,
        from: from
    };
}

export function setZoom(percentage) {
    return {
        type: SET_ZOOM,
        payload: percentage
    };
}