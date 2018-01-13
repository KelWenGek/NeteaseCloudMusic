export const SET_HOME_RECO_NEW_SG =
    'SET_HOME_RECO_NEW_SG'


export const setHomeRecoNewsg = (payload) => ({
    type: SET_HOME_RECO_NEW_SG,
    payload
});


export const HomeRecoNewsgRd = {
    [SET_HOME_RECO_NEW_SG](state, payload) {
        return state = payload;
    }
};