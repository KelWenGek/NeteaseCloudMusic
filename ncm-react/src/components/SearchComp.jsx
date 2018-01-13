import React, { Component } from 'react'
import Form from '@/components/home/tab/search/Form'
import Default from '@/components/home/tab/search/Default'
import Suggest from '@/components/home/tab/search/Suggest'
import Result from '@/components/home/tab/search/Result'


export default class Search extends Component {
    render() {
        return (
            <div className="m-hmsrch">
                <Form />
                <Default />
                <Suggest />
                <Result />
            </div>
        )
    }
}
