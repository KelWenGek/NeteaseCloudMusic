import { createReducer } from '@/compose'

export const CHANGE_TAB_INDEX = 'CHANGE_TAB_INDEX';

export const changeTabIndex = (payload) => ({
    type: CHANGE_TAB_INDEX,
    payload
});

export const HomeTabCurIdxRd = {
    [CHANGE_TAB_INDEX](index, state) {
        return state = index;
    }
};


export default createReducer(0, HomeTabCurIdxRd);


