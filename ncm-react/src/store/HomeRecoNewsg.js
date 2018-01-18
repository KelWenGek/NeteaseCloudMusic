import { createTypes, createReducer, completeState, completeTypes, completeReducer } from '@/compose';
export const actions = createTypes(completeTypes(['GET_HOME_RECO_NEWSG']), 'HOME')
const actionReducerMap = completeReducer({
    target: 'HomeRecoNewsg',
    primaryActions: [actions.GET_HOME_RECO_NEWSG]
});
export default actionReducerMap;

