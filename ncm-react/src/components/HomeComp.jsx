import React, { Component } from 'react'
import HomeNavComp from '@/components/HomeNavComp'
import HomeNavContentComp from '@/components/HomeNavContentComp'
import AppStyle from '@/App.scss'
export default class HomeComp extends Component {
    render() {
        return (
            <div className="m-home">
                <div className="m-tabarea m-tabarea-index">
                    <HomeNavComp />
                    <HomeNavContentComp />
                </div>
            </div>
        );
    }
}