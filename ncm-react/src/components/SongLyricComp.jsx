import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LyricScroller from '@/components/LyricScroller'
export default class LyricBox extends Component {

    render() {
        return (
            <div className="m-song-info">
                <h2 className="m-song-h2">
                    <span className="m-song-sname">{song.name}</span>
                    <span className="m-song-gap" >-</span>
                    <b className="m-song-autr">{song.ar[0].name}</b>
                </h2>
                <div className="m-song-lrc f-pr">
                    <div className="m-song-scroll">
                        <LyricScroller />
                    </div>
                </div>
            </div>
        )
    }
}
