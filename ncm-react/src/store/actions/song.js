import * as actionTypes from '@/constants/actionTypes'
export const songReset = (payload) => ({
    type: actionTypes.SYC_SUCC_SONG_SET,
    payload
})

export const songLyricReset = (payload) => ({
    type: actionTypes.SYC_SUCC_LYR_SET,
    payload
})

export const songPlayReset = (payload) => ({
    type: actionTypes.SYC_SUCC_PLAY_SET,
    payload
})
export const songPlayState = (payload) => ({
    type: actionTypes.SET_PLAY_STATE,
    payload
})