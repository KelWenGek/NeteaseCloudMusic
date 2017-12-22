import React, { Component } from 'react'
import cn from 'classnames'
import Hello from '@/components/HelloKel'
import Nav from '@/components/Nav'
import TabCt from '@/components/TabCt'
import AppStyle from '@/App.scss'
export default class App extends Component {

    render() {
        return (
            <div className="m-home">
                <div className="m-tabarea m-tabarea-index">
                    <Nav />
                    <TabCt />
                </div>
            </div>
        );
    }
}