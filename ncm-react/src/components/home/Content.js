import React, { Component } from 'react'
import { connect } from 'react-redux'
import Empty from '@/components/Empty'
import Recommend from '@/components/home/tab/Recommend'
import Hot from '@/components/home/tab/Hot'
import Search from '@/components/home/tab/search/Index'

export default connect(({ current }) => ({ current }))(
    class TabCt extends Component {
        render() {
            let Content, { current } = this.props;
            switch (current) {
                case 0: Content = Recommend; break;
                case 1: Content = Hot; break;
                case 2: Content = Search; break;
                default: Content = Empty;
            }
            return (
                <div className="m-tabct">
                    <Content />
                </div>
            );
        }
    })