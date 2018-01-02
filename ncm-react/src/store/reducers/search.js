import * as actionTypes from '@/constants/actionTypes';
export default function search(state = { keyword: '', show: false, history: [], hot: [], suggests: [], result: [] }, action) {
    switch (action.type) {
        case actionTypes.DO_SEARCH_SUGGEST:
            return { ...state, keyword: action.payload, result: [], show: false }
        case actionTypes.SET_SEARCH_HOT:
            return { ...state, hot: action.payload, show: false };
        case actionTypes.SET_SEARCH_SUGGEST:
            return { ...state, suggests: action.payload, show: false }
        case actionTypes.SET_SEARCH_RESULT:
            return { ...state, result: action.payload, show: true }
        case actionTypes.DO_SEARCH_CLEAR:
            return { ...state, keyword: '' }
        default: return state;
    }
}