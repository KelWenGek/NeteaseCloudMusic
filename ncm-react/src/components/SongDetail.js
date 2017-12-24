import React, { Component } from 'react'
import axios from 'axios'
import cn from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import SongLyric from '@/components/SongLyric'
export default withRouter(connect()(class SongDetail extends Component {

    state = {
        paused: false,
        song: null,
        lyric: null,
        comments: null
    }


    constructor(props) {
        super(props);
        this.audio = new Audio;
        this.start = null;
        this.now = null;
        this.last = 0;

        this.transform = function (e) {
            var t = ["transform", "webkitTransform", "msTransform", "MozTransform"];
            for (var n in t)
                if (void 0 !== e.style[t[n]])
                    return t[n];
            return t[1];
        }(document.createElement("div"))
    }

    async componentDidMount() {

        console.log(this);
        try {
            let id = this.props.match.params.id;
            let [{ data: { songs } }, { data: { lrc: { lyric } } }] = await Promise.all(['song/detail?ids=', 'lyric?id='].map(url => axios.get(`${url}${id}`)));
            console.log(lyric);
            lyric = lyric.replace(/\n$/, '').split('\n').map(lyr => {
                let match = lyr.match(/^\[(\d{2})\:(\d{2})\.(\d{2})\](.*)/);
                return {
                    timestamp: match[1] * 60 * 1000 + match[2] * 1000 + match[3] * 10,
                    min: match[1],
                    sec: match[2],
                    msec: match[3],
                    lyric: match[4].trim()
                }
            })
            await this.setState({
                song: songs[0],
                lyric
            });

            await this.getSongUrl(id);

        } catch (e) {

        }
    }


    async getSongUrl(id) {
        try {
            let { data: { data: songData } } = await axios.get(`music/url?id=${id}`);
            this.songData = songData[0];
            this.audio.src = this.songData.url;
            // this.play()
            this.setEndTimer();
        } catch (e) {

        }
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
        let endTiming = this.state.song.dt - this.audio.currentTime * 1000;
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
        let { transform, paused, song, lyric } = this.state;

        return (
            song &&
            <div className="m-newsong">
                <div className="m-song-bg" style={{ backgroundImage: `url("//music.163.com/api/img/blur/${song.al.pic_str}")`, opacity: 1 }}></div>
                <div className="m-scroll_wrapper m-song_nor j-songsrl">
                    <div className="m-scroll_scroller m-scroll_scroller_vertical">
                        <div className="m-song_newfst">
                            {/* <span className="m-logo">
                            </span> */}
                            <div className="m-song-wrap">
                                <div className="m-song-disc">
                                    <div className="m-song-turn">
                                        <div className="m-song-rollwrap" ref="turn" style={transform}>
                                            <div className={cn('m-song-img', { 'a-circling': !paused })} ref="roll">
                                                <img className="u-img" src={song.al.picUrl} />
                                            </div>
                                        </div>
                                        <div className="m-song-lgour" style={transform}>
                                            <div className={cn('m-song-light', { 'a-circling': !paused })}></div>
                                        </div>

                                    </div>
                                    {
                                        paused && <span className="m-song-plybtn"></span>
                                    }
                                </div>
                                <div className="m-song-clickarea" onClick={this.resume}></div>
                            </div>
                            <div className="m-song-info">
                                <h2 className="m-song-h2">
                                    <span className="m-song-sname">{song.name}</span>
                                    <span className="m-song-gap" >-</span>
                                    <b className="m-song-autr">{song.ar[0].name}</b>
                                </h2>
                                {/* <SongLyric /> */}
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
}))
