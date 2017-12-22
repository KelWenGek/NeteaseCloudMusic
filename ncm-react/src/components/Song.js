import React, { Component } from 'react'
import cn from 'classnames'
import { check4ten } from '@/utils'
export class Song extends Component {
    render() {
        let { index, song: { id, name, alias, artists, album } } = this.props;
        return (
            <a key={id} className="m-sgitem" href={`/m/song?id=${id}`}>
                {index !== undefined && index !== null ? <div className={cn('sgfl', index < 3 ? 'sgfl-cred' : undefined)}>{check4ten(index + 1)}</div> : undefined}
                <div className="sgfr f-bd f-bd-btm">
                    <div className="sgchfl">
                        <div className="f-thide sgtl">
                            {name}
                            <span className="sgalia">
                                {alias}
                            </span>
                        </div>

                        <div className="f-thide sginfo">
                            <i className="u-hmsprt sghot"></i>
                            {`${artists[0].name}-${album.name}`}
                        </div>
                    </div>
                    <div className="sgchfr">
                        <span className="u-hmsprt sgchply"></span>
                    </div>
                </div>
            </a>
        )
    }
}

export default function wrapSong(convertFn) {
    return class extends Component {
        render() {
            return <Song {...this.props} song={convertFn(this.props.song)} />
        }
    }
}