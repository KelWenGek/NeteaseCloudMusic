import React, { Component } from 'react'
import { connect } from 'react-redux'
export default connect(
    (state) => (
        {
            Song: state.Song,
            SongLyric: state.SongLyric
        }
    )
)(
    class SongLyric extends Component {

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            // this.initHeight();
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
                <div className="m-song-info">
                    <h2 className="m-song-h2">
                        <span className="m-song-sname">{song.name}</span>
                        <span className="m-song-gap" >-</span>
                        <b className="m-song-autr">{song.ar[0].name}</b>
                    </h2>
                    <div className="m-song-lrc f-pr">
                        <div className="m-song-scroll">
                            <div className="m-song-iner" ref="lycScl">
                                {lines.map(lyr => {
                                    return <p key={lyr.tag} className="m-song-lritem j-lritem">{lyr.lyric}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })
