import React, { Component } from 'react'
import { connect } from 'react-redux'

export default connect(

)(
    class SearchHistoryComp extends Component {
        render() {
            return (
                <section className="m-history">
                    <ul className="list">
                        {
                            history.map(item => (
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
            );
        }
    }
    )