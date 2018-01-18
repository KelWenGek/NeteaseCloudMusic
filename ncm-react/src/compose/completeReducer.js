import * as effects from './effect';
function completeReducer(actionReducerMap, selectors = {}) {
    let reducerHandlers = {},
        actionCreators = {},
        actions;

    if (actionReducerMap.primaryActions) {
        (Array.isArray(actions = actionReducerMap.primaryActions)
            ? actions
            : [actions]).forEach(actionName => {
                effects.types.forEach(type => {
                    let target = actionReducerMap.target, normalizedType = `${actionName}_${type.toUpperCase()}`;
                    actionCreators[`fetch${target}${type}`] = payload => ({ type: normalizedType, payload, target });
                    reducerHandlers[normalizedType] = effects[`on${type}`](selectors[type]);
                });
            });
    }
    if (actionReducerMap.override) {
        reducerHandlers = { ...reducerHandlers, ...(actionReducerMap.override.reducers || {}) };
        actionCreators = { ...actionCreators, ...(actionReducerMap.override.actions || {}) };
    }
    return { reducerHandlers, actionCreators };
}
export default completeReducer;

