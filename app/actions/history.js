export const MAKE = 'make';
export const UNDO = 'undo';
export const REDO = 'redo';

export function makeHistory(state) {
    return {
        type: MAKE,
        payload: state
    };
}

export function undoHistory() {
    return {
        type: UNDO
    };
}

export function redoHistory() {
    return {
        type: REDO
    };
}