import * as actionTypes from '@/constants/actionTypes';
export default function search(state = { keyword: '', history: [], suggests: [], result: [] }, action) {
    switch (action.type) {
        case actionTypes.DO_SEARCH_SUGGEST: return { ...state, keyword: action.payload, result: [] }
        case actionTypes.SET_SEARCH_SUGGEST: return { ...state, suggests: action.payload }
        case actionTypes.SET_SEARCH_RESULT: return { ...state, result: action.payload }
        case actionTypes.DO_SEARCH_CLEAR: return { ...state, keyword: '' }
        default: return state;
    }
}