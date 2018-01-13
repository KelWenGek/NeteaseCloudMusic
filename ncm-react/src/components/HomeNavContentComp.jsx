import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/EmptyComp'
import HomeRecoComp from '@/components/HomeRecoComp'
// import HomeHotListComp from '@/components/HomeHotListComp'
// import SearchComp from '@/components/SearchComp'

export default connect(
    ({ HomeTabCurIdx }) => ({ HomeTabCurIdx })
)(
    class HomeNavContentComp extends Component {
        render() {
            let Content, { HomeTabCurIdx } = this.props;
            switch (HomeTabCurIdx) {
                case 0: Content = HomeRecoComp; break;
                // case 1: Content = HomeHotListComp; break;
                // case 2: Content = SearchComp; break;
                // default: Content = EmptyComp;
            }
            return (
                <div className="m-tabct">
                    <Content />
                </div>
            );
        }
    })