import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTabIndex } from '@/store/HomeTabCurIdx';
import cn from 'classnames'
export default connect(
    ({ HomeTabCurIdx }) => ({ HomeTabCurIdx }),
    { changeTabIndex }
)(
    class HomeNavComp extends Component {
        static selections = ['推荐歌曲', '热歌榜', '搜索'];


        render() {
            let { HomeTabCurIdx, changeTabIndex } = this.props;
            return (
                <nav className="f-bd f-bd-btm u-tab">
                    {
                        HomeNavComp.selections.map((txt, index) => (
                            <li
                                key={index}
                                className={cn('tabtitle', [HomeTabCurIdx === index ? 'z-selected' : ''])}
                                onClick={() => HomeTabCurIdx !== index && changeTabIndex(index)}
                            >
                                <div className="tabtxt">
                                    <span>{txt}</span>
                                </div>
                            </li>
                        ))
                    }
                </nav>
            );
        }
    })