import * as actionTypes from '@/constants/actionTypes';
export default function rootReducer(state = { current: 0 }, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TAB: return { current: action.payload }
        default: return state;
    }
}