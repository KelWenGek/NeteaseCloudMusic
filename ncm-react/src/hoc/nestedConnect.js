import React, { Component } from 'react'
import { storeShape } from '@/utils'


export default function nestedConnect(wrappedComponent) {
    return class Connect extends Component {

        static childContextTypes = {
            store: storeShape.isRequired
        }
        static contextTypes = {
            store: storeShape.isRequired
        }

        constructor(props) {
            super(props);
        }

        getChildContext() {
            return {
                store: this.store
            }
        }

        render() {
            return <wrappedComponent />
        }
    }
}