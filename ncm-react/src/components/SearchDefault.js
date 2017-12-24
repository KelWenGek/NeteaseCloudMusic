import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getSearchResult } from '@/store/actions'
export default withRouter(connect(state => ({ search: state.search }), { getSearchResult })(class SearchDefault extends Component {
    render() {
        console.log('in search', this.props)
        let { getSearchResult, search } = this.props;
        let { keyword, history } = search;
        return (
            !keyword &&
            <div className="m-default">
                <section className="m-hotlist">
                    <h3 className="title">热门搜索</h3>
                    <ul className="list">
                        <li className="item f-bd f-bd-full" onClick={() => getSearchResult()}>
                            <a className="link" href="javascript:void(0);">RADWIMPS</a>
                        </li>
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
            </div>
        )
    }
}))