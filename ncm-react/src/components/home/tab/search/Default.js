import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getSearchResult, getSearchHot } from '@/store/actions'
export default withRouter(connect(state => ({ search: state.search }), { getSearchResult, getSearchHot })(class SearchDefault extends Component {


    componentDidMount() {
        this.props.getSearchHot();
    }


    render() {
        let { getSearchResult, search } = this.props;
        let { keyword, history, hot, show } = search;
        return (
            !keyword && !show &&
            < div className="m-default" >
                <section className="m-hotlist">
                    <h3 className="title">热门搜索</h3>
                    <ul className="list">
                        {
                            hot.length && hot.map((h, index) => {
                                return (
                                    <li key={index} className="item f-bd f-bd-full" onClick={() => getSearchResult(h.first)}>
                                        <a className="link" href="javascript:void(0);">{h.first}</a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </section>
                {
                    history.length > 0 &&
                    <section className="m-history">
                        <ul className="list">
                            {history.map(item => (
                                < li className="item">
                                    <i className="u-svg u-svg-histy"></i>
                                    <div className="histyr f-bd f-bd-btm">
                                        <span className="link f-thide">发如雪</span>
                                        <figure className="close">
                                            <i className="u-svg u-svg-close"></i>
                                        </figure>
                                    </div>
                                </li>))
                            }
                        </ul>
                    </section>
                }
            </div >
        )
    }
}))