import React, { Component } from 'react'
import SearchForm from '@/components/SearchForm'
import SearchDefault from '@/components/SearchDefault'
import SearchSuggest from '@/components/SearchSuggests'
import SearchResult from '@/components/SearchResult'


export default class Search extends Component {
    render() {
        return (
            <div className="m-hmsrch">
                <SearchForm />
                <SearchDefault />
                <SearchSuggest />
                <SearchResult />
            </div>
        )
    }
}
