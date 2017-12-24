import React, { Component } from 'react'
import Empty from '@/components/Empty'
import axios from 'axios'
import wrapSong from '@/components/Song'
export default class Reco extends Component {

    state = {
        remd: [],
        remd_newsg: []
    }

    async componentDidMount() {
        try {
            let [{ data: remd }, { data: remd_newsg }] = await axios.all(['personalized', 'personalized/newsong'].map(url => axios.get(url)));
            if (remd_newsg.code === 200) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        remd_newsg: remd_newsg.result
                    }
                });
            }
            if (remd.code === 200) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        remd: remd.result
                    }
                });
            }
        } catch (e) {

        }
    }

    render() {
        let { remd, remd_newsg } = this.state;
        return (
            <div className="tabctitem">
                <div className="m-homeremd">
                    <h2 className="remd_tl">
                        推荐歌单
                    </h2>
                    <div className="remd_song">
                        <div className="remd_ul">
                            {remd.length ? remd.slice(0, 6).map(item => {
                                let { id, name, picUrl, playCount } = item;
                                return (
                                    <a key={id} className="remd_li" href={`/m/playlist/${id}`}>
                                        <div className="remd_img">
                                            <img className="u-img" src={picUrl} />
                                            <span className="u-earp remd_lnum">{`${(playCount / 10e4).toFixed(1)}万`}</span>
                                        </div>
                                        <p className="remd_text">{name}</p>
                                    </a>
                                );
                            }) : <Empty />}
                        </div>
                    </div>
                    <h2 className="remd_tl">
                        最新音乐
                    </h2>
                    <div className="remd_newsg">
                        <div className="m-sglst">
                            {remd_newsg.length ? remd_newsg.map(item => {
                                let song = item.song;
                                let { id, name, alias, artists, album } = song;
                                let Song = wrapSong(item => ({
                                    id,
                                    name,
                                    alias,
                                    artists,
                                    album
                                }));
                                return <Song key={id} song={song} />;
                            }) : <Empty />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
