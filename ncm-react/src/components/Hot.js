import React, { Component } from 'react'
import Empty from '@/components/Empty'
import wrapSong from '@/components/Song'
import axios from 'axios'
export default class Hot extends Component {

    state = {
        hot: []
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get('/top/list?idx=1');
            if (data.code === 200) {
                this.setState(prevState => {
                    return {
                        hot: data.playlist.tracks
                    }
                });
            }
        } catch (e) {

        }
    }

    render() {
        let { hot } = this.state, hasItem = hot.length > 0;
        return (
            <div className="m-hmhot">
                <div className="hotcont">
                    <div className="m-sglst">
                        {hasItem ? hot.slice(0, 20).map((item, index) => {
                            let { id, name, ar, al, alia } = item;
                            let Song = wrapSong(item => {
                                return {
                                    id: item.id,
                                    name: item.name,
                                    alias: item.alia,
                                    artists: item.ar,
                                    album: item.al
                                }
                            });
                            return <Song key={item.id} song={item} index={index} />
                        }) : <Empty />}
                    </div>
                </div>
                {
                    hasItem && <div className="hotdn" >
                        <span className="hotview">查看完整榜单</span>
                    </div>
                }
            </div>
        )
    }
}
