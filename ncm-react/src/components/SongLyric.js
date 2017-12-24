import React, { Component } from 'react'
import { connect } from 'react-redux'

export default connect((state) => ({ lyric: state.lyric }))(class SongLyric extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initHeight();
    }


    initHeight() {
        let lritems = document.querySelectorAll('.j-lritem');
    }

    render() {
        let { index, lyric } = this.props;
        return (
            <div className="m-song-lrc f-pr">
                <div className="m-song-scroll">
                    <div className="m-song-iner" ref="lycScl">
                        {lyric.map(lyr => {
                            return <p key={lyr.timestamp} className="m-song-lritem j-lritem">{lyr.lyric}</p>
                        })}
                    </div>
                </div>
            </div>
        )
    }
})
