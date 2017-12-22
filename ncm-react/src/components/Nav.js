import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTab } from '@/store/actions';

import cn from 'classnames'
export default connect(({ current }) => ({ current }), { changeTab })(class Nav extends Component {
    static selections = ['推荐歌曲', '热歌榜', '搜索'];

    render() {
        let { current, changeTab } = this.props;
        return (
            <nav className={cn('f-bd', 'f-bd-btm', 'u-tab')}>
                {
                    Nav.selections.map((txt, index) => (
                        <li
                            key={index}
                            className={cn('tabtitle', [current === index ? 'z-selected' : ''])}
                            onClick={() => current !== index && changeTab(index)}
                        >
                            <div className={cn('tabtxt')}>
                                <span>{txt}</span>
                            </div>
                        </li>
                    ))
                }
            </nav>
        );
    }
})