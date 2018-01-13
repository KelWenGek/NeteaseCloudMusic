import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchData, storeShape } from '@/utils'

import EmptyComp from '@/components/EmptyComp'
import HomeRecoNewsgComp from '@/components/HomeRecoNewsgComp'
// import HomeRecoPlaylistComp from '@/components/HomeRecoPlaylistComp'
import { setHomeRecoNewsg } from '@/store/HomeRecoNewsg'
import { setHomeRecoPlaylist } from '@/store/HomeRecoPlaylist'
export default connect(
    null,
    { setHomeRecoNewsg, setHomeRecoPlaylist }
)(
    class HomeRecoComp extends Component {
        static childContextTypes = {
            store: storeShape.isRequired
        }

        static contextTypes = {
            store: storeShape.isRequired
        }
        constructor(props) {
            super(props);
        }

        getChildContext() {
            return {
                store: this.context.store
            }
        }

        async componentDidMount() {
            try {
                let { setHomeRecoNewsg, setHomeRecoPlaylist } = this.props;
                let [
                    { data: remd },
                    { data: remd_newsg }
                ] = await axios.all(
                    ['personalized', 'personalized/newsong'].map(url => axios.get(url))
                );
                if (remd_newsg.code === 200) {
                    setHomeRecoNewsg(remd_newsg.result)
                }
                // if (remd.code === 200) {
                //     setHomeRecoPlaylist(remd.result);
                // }
            } catch (e) {
                throw e;
            }
        }

        render() {
            let { store } = this.props;
            return (
                <div className="tabctitem">
                    <div className="m-homeremd">
                        {/* <HomeRecoPlaylistComp /> */}
                        <HomeRecoNewsgComp />
                    </div>
                </div>
            )
        }
    })
