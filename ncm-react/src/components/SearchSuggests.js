import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import axios from 'axios'
import { getSearchResult } from '@/store/actions'
export default connect(state => ({ search: state.search }), { getSearchResult })(class SearchSuggests extends Component {

    constructor(props) {
        super(props);
        this.getSearchResult = debounce(this.props.getSearchResult.bind(this), 700);
    }

    render() {
        let { keyword, suggests, result } = this.props.search;
        return (
            keyword && !result.length &&
            < section className="m-recom" >
                <h3 className="title f-bd f-bd-btm f-thide" onClick={() => this.getSearchResult(keyword)}>
                    {`搜索"${keyword}"`}
                </h3>
                <ul>
                    {
                        suggests && suggests.map(({ id, name }) => (
                            <li key={id} className="recomitem" onClick={() => this.getSearchResult(name)}>
                                <i className="u-svg u-svg-search"></i>
                                <span className="f-bd f-bd-btm f-thide">
                                    {name}
                                </span>
                            </li>
                        ))
                    }

                </ul>
            </section >
        )
    }
})
