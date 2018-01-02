import * as actionTypes from '@/constants/actionTypes';
export default function Song(state = {}, action) {
    switch (action.type) {
        case actionTypes.SYC_SUCC_SONG_SET:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}