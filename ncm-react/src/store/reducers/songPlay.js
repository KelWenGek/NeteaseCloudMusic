import * as actionTypes from '@/constants/actionTypes';
export default function SongPlay(state = { isPlaying: false, autoPlay: true }, action) {
    switch (action.type) {
        case actionTypes.SYC_SUCC_PLAY_SET:
            return Object.assign({}, state, action.payload);
        case actionTypes.SET_PLAY_STATE:
            return { ...state, isPlaying: action.payload }
        default:
            return state;
    }
}