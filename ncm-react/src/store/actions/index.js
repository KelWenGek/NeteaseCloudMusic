import * as actionTypes from '@/constants/actionTypes'
import axios from 'axios'
export const changeTab = (payload) => ({
    type: actionTypes.CHANGE_TAB,
    payload
})

export const doSearchSuggest = (payload) => ({
    type: actionTypes.DO_SEARCH_SUGGEST,
    payload
})


export const doSearch = (payload) => ({
    type: actionTypes.SEARCH,
    payload
})

export const doSearchClear = () => ({
    type: actionTypes.DO_SEARCH_CLEAR
})

//设置热门搜索

export const getSearchHot = () => async dispatch => {
    try {
        let { data } = await axios.get(`search/hot`);
        if (data.code === 200) {
            dispatch(setSearchHot(data.result.hots));
        }
    } catch (e) {

    }
}

export const setSearchHot = (payload) => ({
    type: actionTypes.SET_SEARCH_HOT,
    payload
})

//获取搜索建议
export const getSearchSuggest = keyword => async (dispath) => {
    try {
        let { data } = await axios.get(`/search/suggest?keywords=${keyword}`);
        if (data.code === 200) {
            dispath(setSearchSuggest(data.result.songs));
        }
    } catch (e) {

    }
};
export const setSearchSuggest = (payload) => ({
    type: actionTypes.SET_SEARCH_SUGGEST,
    payload
})



//获取搜索结果
export const getSearchResult = (keyword) => async (dispath) => {
    try {
        let { data } = await axios.get(`/search?keywords=${keyword}`);
        if (data.code === 200) {
            dispath(setSearchResult(data.result.songs));
            dispath(setSearchSuggest([]));
        }
    } catch (e) {

    }
}

export const setSearchResult = (payload) => ({
    type: actionTypes.SET_SEARCH_RESULT,
    payload
})