import React, { Component } from 'react'
import { connect } from 'react-redux'


export default connect(

)(
    class SearchHotComp extends Component {
        render() {
            return (
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
            );
        }
    }
    )
