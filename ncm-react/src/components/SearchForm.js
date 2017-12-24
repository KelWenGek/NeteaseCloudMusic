import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import axios from 'axios'
import cn from 'classnames'
import { doSearchClear, setSearchSuggest, getSearchSuggest, doSearchSuggest } from '@/store/actions'
export default connect(state => ({ search: state.search }), { doSearchSuggest, doSearchClear, setSearchSuggest, getSearchSuggest })(class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.getSearchSuggest = debounce(this.props.getSearchSuggest.bind(this), 700);
    }

    render() {
        let { search: { keyword }, doSearchClear, doSearchSuggest, setSearchSuggest } = this.props;
        let hasWord = keyword.length > 0;
        return (
            <form className="m-input f-bd f-bd-btm" method="get" action="#">
                <div className="inputcover">
                    <i className="u-svg u-svg-srch"></i>
                    <input
                        type="search"
                        name="search"
                        className="input"
                        placeholder=""
                        value={keyword}
                        autoComplete="off"
                        onChange={e => {
                            let value = e.target.value;
                            doSearchSuggest(value);
                            if (!value) {
                                setSearchSuggest([])
                            } else {
                                this.getSearchSuggest(value);
                            }
                        }}
                    />
                    <label className="holder">{hasWord ? '' : '搜索歌曲、歌手、专辑'}</label>
                    <figure className="close" onClick={doSearchClear}>
                        <i className={cn('u-svg', 'u-svg-empty', { 'z-show': hasWord })}></i>
                    </figure>
                </div>
            </form>
        )
    }
});