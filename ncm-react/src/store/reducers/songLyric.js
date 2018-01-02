import * as actionTypes from '@/constants/actionTypes';
export default function SongLyric(state = {}, action) {
    switch (action.type) {
        case actionTypes.SYC_SUCC_LYR_SET:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}