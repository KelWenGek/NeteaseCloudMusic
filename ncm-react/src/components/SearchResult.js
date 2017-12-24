import React, { Component } from 'react'
import { connect } from 'react-redux'
import wrapSong from '@/components/Song'
export default connect(state => ({ search: state.search }))(class SearchResult extends Component {
    render() {
        let { result, keyword } = this.props.search;
        return (
            result.length > 0 && keyword && <div className="m-searchresult">
                <section className="m-songlist">
                    <div className="m-sglst">
                        {result.map(item => {
                            let { id, name, artists, album, alias } = item;
                            let Song = wrapSong(item => ({
                                id,
                                name,
                                artists,
                                album,
                                alias,
                                highlight: true
                            }));
                            return <Song key={id} song={item} />
                        })}
                    </div>
                </section>
            </div>
        )
    }
})
