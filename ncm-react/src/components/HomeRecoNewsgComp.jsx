import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/EmptyComp'
import wrapSong from '@/hoc/wrapSong'

export default connect(
    ({ HomeRecoNewsg }) => ({ HomeRecoNewsg })
)(
    class HomeRecoNewsgComp extends Component {
        render() {
            let { HomeRecoNewsg } = this.props;
            return (
                <div>
                    <h2 className="remd_tl">
                        最新音乐
                    </h2>
                    <div className="remd_newsg">
                        <div className="m-sglst">
                            {HomeRecoNewsg.length ? HomeRecoNewsg.map(item => {
                                let song = item.song;
                                let { id, name, alias, artists, album } = song;
                                let SongItem = wrapSong(item => ({
                                    id,
                                    name,
                                    alias,
                                    artists,
                                    album
                                }));
                                return <SongItem key={id} song={song} />;
                            }) : <EmptyComp />}
                        </div>
                    </div>
                </div>
            );
        }
    })