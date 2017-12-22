import React, { Component } from 'react'
import debounce from 'lodash/debounce';
import cn from 'classnames'
import axios from 'axios'
export default class Search extends Component {

    state = {
        search: '',
        suggests: []
    }

    constructor() {
        super();
        this.getSearchSuggest = debounce(async (search) => {
            try {
                let { data } = await axios.get(`/search/suggest?keywords=${search}`);
                if (data.code === 200) {
                    this.setState({
                        suggests: data.result.songs
                    })
                }
            } catch (e) {

            }
        }, 700).bind(this);
    }
    handleChange = (event) => {
        let value = event.target.value;
        this.setState({ search: value });
        this.getSearchSuggest(value);

    }


    handleClear = () => {
        this.setState({ search: '' });
    }

    doSearch = () => {
        if (!this.state.search) {
            return false;
        }
    }

    render() {
        let { search, suggests } = this.state, hasWord = search.length > 0;
        return (
            <div className="m-hmsrch">
                <form className="m-input f-bd f-bd-btm" method="get" action="#">
                    <div className="inputcover">
                        <i className="u-svg u-svg-srch"></i>
                        <input
                            type="search"
                            name="search"
                            className="input"
                            placeholder=""
                            value={search}
                            autoComplete="off"
                            onChange={this.handleChange}
                        />
                        <label className="holder">{hasWord ? '' : '搜索歌曲、歌手、专辑'}</label>
                        <figure className="close" onClick={this.handleClear}>
                            <i className={cn('u-svg', 'u-svg-empty', { 'z-show': hasWord })}></i>
                        </figure>
                    </div>
                </form>
                {
                    !hasWord ?
                        <div className="m-default">
                            <section className="m-hotlist">
                                <h3 className="title">热门搜索</h3>
                                <ul className="list">
                                    <li className="item f-bd f-bd-full">
                                        <a className="link" href="javascript:void(0);">RADWIMPS</a>
                                    </li>
                                </ul>
                            </section>
                            <section className="m-history">
                                <ul className="list">
                                    <li className="item">
                                        <i className="u-svg u-svg-histy"></i>
                                        <div className="histyr f-bd f-bd-btm">
                                            <span className="link f-thide">;看了;看;两颗;两颗;了</span>
                                            <figure className="close">
                                                <i className="u-svg u-svg-close"></i>
                                            </figure>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                        :
                        <section className="m-recom">
                            <h3 className="title f-bd f-bd-btm f-thide" onClick={this.doSearch}>
                                {`搜索"${search}"`}
                            </h3>
                            <ul>
                                {
                                    suggests.map(({ id, name }) => (
                                        <li key={id} className="recomitem">
                                            <i className="u-svg u-svg-search"></i>
                                            <span className="f-bd f-bd-btm f-thide">
                                                {name}
                                            </span>
                                        </li>
                                    ))
                                }

                            </ul>
                        </section>
                }
            </div>
        )
    }
}
