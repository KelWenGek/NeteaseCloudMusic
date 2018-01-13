import { combineReducers } from 'redux'

//reducer工厂方法
export function createReducer(initialState, reducerDescription) {
    return (state, action) => {
        return (reducerDescription[action.type] && reducerDescription[action.type](action.payload, state)) || initialState;
    }
}


import { HomeTabCurIdxRd } from './HomeTabCurIdx';
import { HomeRecoNewsgRd } from './HomeRecoNewsg'

export default {
    HomeTabCurIdx: createReducer(0, HomeTabCurIdxRd),
    HomeRecoNewsg: createReducer([], HomeTabCurIdxRd)
}

