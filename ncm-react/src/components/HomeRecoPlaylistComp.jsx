import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/EmptyComp'

export default connect(
    ({ HomeRecoPlaylist, HomeRecoPlaylistLoading }) => ({ HomeRecoPlaylist, HomeRecoPlaylistLoading })
)(
    class HomeRecoPlaylistComp extends Component {
        render() {
            let { HomeRecoPlaylist } = this.props;
            return (
                <div>
                    <h2 className="remd_tl">
                        推荐歌单
                        </h2>
                    <div className="remd_song">
                        {
                            HomeRecoPlaylistLoading
                                ? <div className="u-spin"></div>
                                : <div className="remd_ul">
                                    {HomeRecoPlaylist.length ? HomeRecoPlaylist.slice(0, 6).map(item => {
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
                                    }) : <EmptyComp />}
                                </div>
                        }
                    </div>
                </div>
            );
        }
    })