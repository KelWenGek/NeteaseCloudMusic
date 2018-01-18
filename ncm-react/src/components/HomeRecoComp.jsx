import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchData, storeShape } from '@/utils'
import EmptyComp from '@/components/EmptyComp'
import HomeRecoNewsgComp from '@/components/HomeRecoNewsgComp'
import HomeRecoNewsgARMap from '@/store/HomeRecoNewsg'
// import HomeRecoPlaylistComp from '@/components/HomeRecoPlaylistComp'
import { setHomeRecoNewsg } from '@/store/HomeRecoNewsg'
import { setHomeRecoPlaylist } from '@/store/HomeRecoPlaylist'
// export default connect(
//     null,
//     { setHomeRecoNewsg, setHomeRecoPlaylist }
// )(
//     )

export default class HomeRecoComp extends Component {

    static contextTypes = {
        store: storeShape.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getHomeRecoNewSg();
        // this.getHomeRecoPlaylist();
    }
    //获取首页最新音乐
    getHomeRecoNewSg() {
        const { dispatch } = this.context.store;
        let { actionCreators } = HomeRecoNewsgARMap;
        return new Promise((resolve, reject) => {
            //loading spin
            dispatch(actionCreators.fetchHomeRecoNewsgLoading());
            axios.get('personalized/newsong').then(response => {
                let data = response.data;
                if (data.code === 200) {
                    resolve(data.result);
                    dispatch(actionCreators.fetchHomeRecoNewsgSuccess(data.result))
                }
            }).catch(err => {
                reject(err);
                dispatch(actionCreators.fetchHomeRecoNewsgFailure(err))
            });
        });
    }

    //获取首页最新歌单
    getHomeRecoPlaylist() {
        const { dispatch } = this.context.store;
        return new Promise((resolve, reject) => {
            //loading spin
            dispatch(fetchHomeRecoPlaylist());
            axios.get('personalized').then(response => {
                let data = response.data;
                if (data.code === 200) {
                    resolve(data);
                    dispatch(fetchHomeRecoPlaylistSucc(data))
                }
            }).catch(err => {
                reject(err);
                dispatch(fetchHomeRecoPlaylistFail(err))
            });
        });
    }

    render() {
        return (
            <div className="tabctitem">
                <div className="m-homeremd">
                    {/* <HomeRecoPlaylistComp /> */}
                    <HomeRecoNewsgComp />
                </div>
            </div>
        )
    }
}
