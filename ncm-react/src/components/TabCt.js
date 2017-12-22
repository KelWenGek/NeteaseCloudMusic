import React, { Component } from 'react'
import { connect } from 'react-redux'
import Empty from '@/components/Empty'
import Reco from '@/components/Reco'
import Hot from '@/components/Hot'
import Search from '@/components/Search'

export default connect(({ current }) => ({ current }))(
    class TabCt extends Component {
        render() {
            let TabCtItem, { current } = this.props;
            switch (current) {
                case 0: TabCtItem = Reco; break;
                case 1: TabCtItem = Hot; break;
                case 2: TabCtItem = Search; break;
                default: TabCtItem = Empty;
            }
            return (
                <div className="m-tabct">
                    <TabCtItem />
                </div>
            );
        }
    })