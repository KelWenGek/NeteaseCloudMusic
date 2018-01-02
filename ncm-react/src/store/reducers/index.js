import * as actionTypes from '@/constants/actionTypes';
import search from './search'
import Song from './song'
import SongLyric from './songLyric'
import SongPlay from './songPlay'


function current(state = 0, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TAB: return action.payload
        default: return state;
    }
}

export default {
    search,
    current,
    Song,
    SongLyric,
    SongPlay
}