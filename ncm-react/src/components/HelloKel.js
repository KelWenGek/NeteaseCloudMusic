import React, { Component } from 'react'

import { connect } from 'react-redux'

export default connect((state) => ({
    name: state.name
}))(class Hello extends Component {

    render() {
        let { name } = this.props;
        return (
            <div>
                Hello {name}
            </div>
        );
    }
});