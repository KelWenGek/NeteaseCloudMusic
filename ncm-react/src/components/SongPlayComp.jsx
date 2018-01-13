import React, { Component } from 'react'

let events = ["loadedmetadata", "play", "pause", "ended", "waiting", "playing", "timeupdate", "progress", "stalled", "error"]
export default class MusicPlay extends Component {

    static defaultProps = {
        autoPlay: false,
        src: ''
    }

    componentWillUnmount() {
        this.el.pause();
        delete this.el;
    }

    componentDidMount() {
        let props = this.props;
        let audio = this.el = new Audio(props.src);
        // events.forEach((e) => {
        //     this.el[]
        // })
        audio.autoPlay = props.autoPlay;
        props.src && this.setSource(props.src);
    }

    setSource = (src) => {
        this.el.src = src;
        this.props.autoPlay && this.el.play()
    }

    render() {
        return null
    }
}