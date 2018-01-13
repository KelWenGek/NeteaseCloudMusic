import React, { Component } from 'react'
import cn from 'classnames'
import MusicPlay from '@/components/song/MusicPlay'
export default class SongInfo extends Component {

    state = {
        styleTransform: {}
    }

    componentWillMount() {
        this.transform = function (e) {
            var t = ["transform", "webkitTransform", "msTransform", "MozTransform"];
            for (var n in t)
                if (void 0 !== e.style[t[n]])
                    return t[n];
            return t[1];
        }(document.createElement("div"))
    }

    componentDidMount() {
    }

    startPlay = () => {
        this.audio.play();
    }
    discPause = () => {
        this.audio.pause();
        this.setPauseStyle();
    }


    setPauseStyle = () => {
        let songImg = this.refs.roll,
            songWrap = this.refs.turn,
            songImgTransform = getComputedStyle(songImg, null)[this.transform],
            songWrapTransform = getComputedStyle(songWrap, null)[this.transform];

        let transform = songWrapTransform === 'none' ? songImgTransform : songImgTransform.concat(' ', songWrapTransform);
        this.setState(prevState => {
            return {
                styleTransform: { [this.transform]: transform }
            }
        });
    }


    played = () => {
        this.playTimeout && clearTimeout(this.playTimeout);
        this.playStartTime = Date.now();
        this.props.songPlayState(true);
    }

    ended = (e) => {
        let { songPlayState, onSetIndex } = this.props;
        this.setPauseStyle();
        songPlayState(false);
        'pause' !== e.type && onSetIndex(0)
    }

    render() {
        let { styleTransform } = this.state;
        
        return (
            <div className="m-song-wrap">
                <div className="m-song-bg" style={{ backgroundImage: `url("//music.163.com/api/img/blur/${Song._url}")`, opacity: 1 }}></div>
                <div className="m-song-disc">
                    <div className="m-song-turn">
                        <div className="m-song-rollwrap" ref="turn" style={styleTransform}>
                            <div className={cn('m-song-img', { 'a-circling': !isPause })} ref="roll">
                                <img className="u-img" src={song.al.picUrl} />
                            </div>
                        </div>
                        <div className="m-song-lgour" style={styleTransform}>
                            <div className={cn('m-song-light', { 'a-circling': !isPause })}></div>
                        </div>

                    </div>
                    {
                        isPause && <span className="m-song-plybtn" onClick={this.startPlay}></span>
                    }
                </div>
                <div className="m-song-clickarea" onClick={isPause ? this.startPlay : this.discPause}></div>
                <MusicPlay
                    ref={audio => this.audio = audio.el}
                    autoPlay={autoPlay}
                    src={SongPlay.url}
                    onPlay={this.played}
                    onPause={this.ended}
                    onEnded={this.ended}
                />
            </div>
        );
    }
}