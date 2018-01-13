import React, { Component } from 'react'
import axios from 'axios'
import cn from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import { songReset, songLyricReset } from '@/store/actions'
import Lyric from '@/components/song/Lyric'
export default withRouter(connect(
    state => ({ song: state.song.song, lyric: state.song.lyric }),
    { songReset, songLyricReset }
)(
    class SongDetail extends Component {

        state = {
            paused: false,

            comments: null
        }


        constructor(props) {
            super(props);
            this.audio = new Audio;
            this.start = null;
            this.now = null;
            this.last = 0;

            
        }

        async componentDidMount() {
            
            try {
                let id = this.props.match.params.id;

                let { data: { data: songSrc } } = await this.getSongUrl(id);

                let [{ data: { songs } },
                    { data: { lrc: { lyric } } }
                ] = await Promise.all(['song/detail?ids=', 'lyric?id='].map(url => axios.get(`${url}${id}`)));

                lyric.lines = lyric.replace(/\n$/, '').split('\n').map(lyr => {
                    let match = lyr.match(/^\[(\d{2})\:(\d{2})\.(\d{2})\](.*)/);
                    return {
                        time: parseFloat([match[1] * 60 + match[2], match[3]].join('.')),
                        tag: `${match[1]}:${match[2]}.${match[3]}`,
                        lyric: match[4].trim()
                    }
                });
                lyric.loaded = true;

                this.props.songReset({ ...songs[0], url: songSrc.url });

                this.props.songLyricReset(lyric);

                this.props.autoPlay && this.autoPlay();

            } catch (e) {

            }
        }


        async getSongUrl(id) {
            try {
                return await axios.get(`music/url?id=${id}`);
            } catch (e) {
                console.log(e);
            }
        }

        autoPlay() {
            this.audio.src = this.props.song.url;
            this.play();
            this.setEndTimer();
        }

        play() {
            this.audio.play();
            this.startLyrScroll();

        }

        pause() {
            this.audio.pause();
            this.stopLyrScroll();

        }


        resume = () => {
            if (!this.audio.ended) {
                !this.state.paused ? this.pause() : this.play();
            } else {
                this.reset();
                this.play();
            }
            this.setEndTimer();
            this.setStyleTransform();
        }

        reset() {

            this.last = 0;
        }

        setEndTimer = () => {
            let endTiming = this.props.song.dt - this.audio.currentTime * 1000;
            this.endTimer && clearTimeout(this.endTimer);
            this.endTimer = setTimeout(() => {
                this.setStyleTransform()
                this.stopLyrScroll();
                this.reset();
                this.setLyrTransform();
            }, endTiming);
        }

        setLyrTransform = () => {
            if (this.last > 0) {
                this.refs.lycScl.childNodes[this.last - 1].style.color = ``;
                this.refs.lycScl.childNodes[this.last].style.color = `rgba(255,255,255,1)`;
                this.refs.lycScl.style[this.transform] = `translateY(-${24 * (this.last - 1)}px)`;
            } else {
                this.refs.lycScl.style[this.transform] = `translateY(0px)`;
            }
        }


        startLyrScroll() {
            this.setLyrTransform();
            this.start = Date.now() - this.audio.currentTime * 1000
            this.lyrSclTimer = setInterval(() => {
                console.log(this.audio.currentTime)
                this.now = Date.now();
                let slaped = this.now - this.start,
                    current = findIndex(this.state.lyric, (lyr, index) => {
                        return index === this.state.lyric.length - 1 || (slaped >= lyr.timestamp && slaped <= this.state.lyric[index + 1].timestamp)
                    });
                console.log(current)
                current !== this.last && (this.last = current);
                this.setLyrTransform();
            }, 16);
        }

        stopLyrScroll() {
            this.lyrSclTimer && clearInterval(this.lyrSclTimer);
        }

        setStyleTransform = () => {
            let songImg = this.refs.roll,
                songWrap = this.refs.turn,
                songImgTransform = getComputedStyle(songImg, null)[this.transform],
                songWrapTransform = getComputedStyle(songWrap, null)[this.transform];

            let transform = songWrapTransform === 'none' ? songImgTransform : songImgTransform.concat(' ', songWrapTransform);
            this.setState(prevState => {
                return {
                    ...prevState,
                    paused: !prevState.paused,
                    transform: { [this.transform]: transform }
                }
            });
        }


        render() {
            let { transform, paused } = this.state;
            let { song, lyric, store } = this.props;
            return (
                song &&
                <div className="m-newsong">
                    <div className="m-song-bg" style={{ backgroundImage: `url("//music.163.com/api/img/blur/${song.al.pic_str}")`, opacity: 1 }}></div>
                    <div className="m-scroll_wrapper m-song_nor j-songsrl">
                        <div className="m-scroll_scroller m-scroll_scroller_vertical">
                            <div className="m-song_newfst">
                                {/* <span className="m-logo">
                            </span> */}
                              
                                <div className="m-song-info">
                                    <h2 className="m-song-h2">
                                        <span className="m-song-sname">{song.name}</span>
                                        <span className="m-song-gap" >-</span>
                                        <b className="m-song-autr">{song.ar[0].name}</b>
                                    </h2>
                                    <Lyric index={0} store={store} />
                                </div>
                                <div>
                                    <div className="m-giude" style={{ bottom: '-14px' }}>
                                        <i className="arr ani"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
        }
    }
    ));
