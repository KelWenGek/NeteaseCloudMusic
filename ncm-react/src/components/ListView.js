import React, { Component } from 'react'
import Empty from '@/components/Empty'
import axios from 'axios'
export default function wrappedList(List, options) {
    return class ListView extends Component {


        fetch = () => {
            
        }

        render() {
            return <List />
        }
    }
}