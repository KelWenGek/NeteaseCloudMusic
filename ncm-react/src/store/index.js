import { createTypes, createReducer, completeState, completeTypes, completeReducer } from '@/compose';
import HomeTabCurIdx from './HomeTabCurIdx';
import HomeRecoNewsg from './HomeRecoNewsg'
export default {
    HomeTabCurIdx,
    HomeContent: createReducer(
        completeState(
            {
                // HomeTabCurIdx: 0,
                HomeRecoNewsg: []
            }
        ),
        { ...HomeRecoNewsg.reducerHandlers }
    )
};
