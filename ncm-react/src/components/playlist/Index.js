import React, { Component } from 'react'
import axios from 'axios'
import cn from 'classnames'
import wrapSong from '@/hoc/Song'
export default class PlayList extends Component {

    state = {
        isExpanded: false,
        playlist: null
    }


    async componentDidMount() {
        let { params: { id } } = this.props.match;
        try {
            let { data } = await axios.get(`/playlist/detail?id=${id}`)
            if (data.code === 200) {
                this.setState({
                    playlist: data.playlist
                });
            }
        } catch (e) {

        }
    }

    handleExpand = () => {
        this.setState(prevState => {
            return {
                isExpanded: !prevState.isExpanded
            }
        })
    }


    render() {
        let creator, tracks;
        let { playlist, isExpanded } = this.state;
        if (playlist) {
            ({ creator, tracks } = playlist)
        }
        return (
            playlist &&
            <div className="m-playlist u-paddlr u-paddbm">
                <section className="u-plhead pylst_header">
                    <div className="plhead_bg" style={{ backgroundImage: `url("${playlist.coverImgUrl}")` }}>
                    </div>
                    <div className="plhead_wrap">
                        <div className="plhead_fl lsthd_fl">
                            <img className="u-img" src={playlist.coverImgUrl} />
                            <span className="lsthd_icon">歌单</span>
                            <i className="u-earp lsthd_num">{`${(playlist.playCount / Math.pow(10, 4
                            )).toFixed(1)}万`}</i>
                        </div>
                        <div className="plhead_fr">
                            <h2 className="f-thide2 f-brk lsthd_title">{playlist.name}</h2>
                            <div className="lsthd_auth f-thide">
                                <a className="lsthd_link" href={`/m/user/${creator.userId}`}>
                                    <div className="u-avatar lsthd_ava">
                                        <img className="u-img" src={creator.avatarUrl} />
                                    </div>{creator.nickname}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pylst_intro">
                    <div className="lstit_tags">
                        标签：
                        {
                            playlist.tags.map((tag, index) => {
                                return <em key={index} className="f-bd f-bd-full lstit_tag">{tag}</em>
                            })
                        }

                    </div>
                    <div className="u-intro" onClick={this.handleExpand}>
                        <div className={cn('f-brk', { 'f-thide3': !isExpanded })}>
                            {
                                playlist.description.split('\n\n').map((desc, index) => {
                                    let elem = [];
                                    elem.push(<span key={`${index}-1`}>
                                        <i>
                                            {desc}
                                        </i>
                                        <br />
                                    </span>)
                                    if (index != 0) {
                                        elem.unshift(<span key={`${index}-0`}>
                                            <i>

                                            </i>
                                            <br />
                                        </span>)
                                    }
                                    return elem;
                                })
                            }
                        </div>
                        <span className={cn('intro_arrow', [isExpanded ? 'u-arowup' : 'u-arowdown'])} ></span>
                    </div>
                </section>
                <div className="pylst_list">
                    <h3 className="u-smtitle">歌曲列表</h3>
                    <ol className="u-songs">
                        {
                            tracks.slice(0, 30).map((item, index) => {
                                let Song = wrapSong(item => ({
                                    id: item.id,
                                    name: item.name,
                                    artists: item.ar,
                                    alias: item.alia,
                                    album: item.al,
                                    highlight: true
                                }));
                                return <Song key={item.id} index={index} song={item} />

                            })
                        }
                    </ol>
                </div>

            </div>
        )
    }
}
