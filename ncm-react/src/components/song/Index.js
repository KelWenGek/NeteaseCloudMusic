import React, { Component } from 'react'
import axios from 'axios'
import cn from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Lyric from '@/components/song/Lyric'
import SongDetail from '@/components/song/Song'
import { songReset, songLyricReset, songPlayReset } from '@/store/actions/song'
export default withRouter(connect(
    state => ({ Song: state.Song }),
    { songReset, songLyricReset, songPlayReset }
)(
    class SongIndex extends Component {

        async componentWillMount() {
            //获取歌曲歌词信息        
            try {
                let id = this.props.match.params.id;
                let [
                    { data: { songs } },
                    { data: { lrc: { lyric: lyr } } }
                ] = await Promise.all(
                    ['song/detail?ids=', 'lyric?id='].map(
                        url => axios.get(`${url}${id}`)
                    )
                );
                let lyric = {};
                lyric.lines = lyr.replace(/\n$/, '').split('\n').map(l => {
                    let match = l.match(/^\[(\d{2})\:(\d{2})\.(\d{2})\](.*)/);
                    return {
                        time: parseFloat([match[1] * 60 + match[2], match[3]].join('.')),
                        tag: `${match[1]}:${match[2]}.${match[3]}`,
                        lyric: match[4].trim()
                    }
                });
                lyric.loaded = true;
                let song = songs[0];
                await this.props.songReset({
                    _url: song.al.pic_str,
                    _picUrl: song.al.picUrl,
                    song

                });

                await this.props.songLyricReset({
                    id,
                    lyric
                });

                let songPlay = await axios.get(`music/url?id=${id}`);
                let play = songPlay.data.data[0];
                this.props.songPlayReset({
                    id: play.id,
                    url: play.url,
                    play
                })
            } catch (e) {
                throw e;
            }
        }

        componentDidMount() {
            window.addEventListener('resize', this.resize, false);
        }


        //获取歌词每行高度
        getLyricItemHeight(lritems) {
            for (let style = window.getComputedStyle(lritems[0], null), styleData = {
                paddingBottom: t.paddingBottom,
                minHeight: 99999,
                heights: []
            }, i = 0, len = lritems.length; i < len; i++) {
                let height = lritems[i].offsetHeight;
                height < styleData.minHeight && (styleData.minHeight = height);
                styleData.heights.push(height);
            }
            return styleData;
        }

        //获取歌词其他数据
        getOtherData(option = {}) {
            let lyric = option.lyric,
                styleData = this.getLyricItemHeight(option.lritems),
                layoutData = this.resetLrcscrollHeight({
                    trans: lyric.hasTrans,
                    scrollable: lyric.scrollable,
                    minHeight: styleData.minHeight,
                    paddingBottom: styleData.paddingBottom,
                    total: option.total || 3
                });
            return Object.assign({}, styleData, layoutData);
        }

        resetLrcscrollHeight = (e) => {
            var t = e.trans
                , r = e.scrollable
                , n = e.minHeight
                , i = e.paddingBottom
                , o = e.total;
            o = o || 3;
            var a = document.documentElement.clientHeight
                , s = document.documentElement.clientWidth
                , u = s / a
                , c = .1;
            u <= .67 && t === !1 ? c = .16 : u <= .67 && t === !0 ? c = .18 : u > .7 && t === !1 ? c = .06 : u > .7 && t === !0 ? c = .08 : t === !0 && (c = .12),
                u > .65 && r === !1 && (c = 2 * c / 3);
            var l = a * c
                , f = Math.floor(l / n);
            f >= o && (f = o,
                r === !1 && (f = o - 1,
                    f = f > 0 ? f : 1));
            var d = void 0;
            d = 0 === f ? 0 : n * f - i;
            var h = 1;
            t ? h = 0 : f < 3 && (h = 0);
            var p = f;
            return {
                outerHeight: d,
                visibleLyricCount: p,
                scrollIndex: h
            }
        }


        resize = () => {
            let { Song, SongLyric, songLyricReset } = this.props;
            let lyric = SongLyric.lyric,
                lritems = document.querySelectorAll('.j-lritem');
            if (!lritems || lritems.length === 0) {
                return this.removeResize();
            }
            lyric._other = this.getOtherData({
                lritems
            });
            songLyricReset && songLyricReset(lyric);
        }

        render() {
            let { Song, store } = this.props;
            return !!Song &&
                <div className="m-newsong">
                    <div className="m-scroll_wrapper m-song_nor j-songsrl">
                        <div className="m-scroll_scroller m-scroll_scroller_vertical">
                            <div className="m-song_newfst">
                                <span className="m-logo">
                                </span>
                                <SongDetail store={store} />
                                <Lyric index={0} />
                                <div>
                                    <div className="m-giude" style={{ bottom: '-14px' }}>
                                        <i className="arr ani"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
        }
    }))