import React, { Component } from 'react'
import cn from 'classnames'
import Nav from '@/components/home/Nav'
import Content from '@/components/home/Content'
import AppStyle from '@/App.scss'
export default class App extends Component {

    render() {
        return (
            <div className="m-home">
                <div className="m-tabarea m-tabarea-index">
                    <Nav />
                    <Content />
                </div>
            </div>
        );
    }
}