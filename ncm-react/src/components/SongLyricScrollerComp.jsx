import React, { Component } from 'react'
export default class LyricScroller extends Component {

    componentDidMount() {
    }
    resetLyrSclHeight() {

    }
    initHeight() {
        let lritems = document.querySelectorAll('.j-lritem');
    }

    render() {
        let { index, Song, SongLyric } = this.props,
            song = Song.song,
            lines = SongLyric.lyric.lines;
        return (
            <div className="m-song-iner" ref="lycScl">
                {lines ? lines.map(lyr => {
                    return <p key={lyr.tag} className="m-song-lritem j-lritem">{lyr.lyric}</p>
                }) : ''}
            </div>
        )
    }
}