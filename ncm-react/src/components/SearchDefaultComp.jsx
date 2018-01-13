import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchHotComp from 'SearchHotComp'
import SearchHistoryComp from 'SearchHistoryComp'
import { getSearchResult, getSearchHot } from '@/store/actions'
export default withRouter(connect(
    state => ({ search: state.search }),
    { getSearchResult, getSearchHot }
)(
    class SearchDefault extends Component {

        componentDidMount() {
            this.props.getSearchHot();
        }

        render() {
            let { getSearchResult, search } = this.props;
            let { keyword, history, hot, show } = search;
            return (
                !keyword && !show &&
                < div className="m-default" >
                    <SearchHotComp />
                    <SearchHistoryComp />
                </div >
            )
        }
    }
    )
)