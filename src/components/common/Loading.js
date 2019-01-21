import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
    render() {

        let { loading } = this.props;

        if (!loading) {
            return null;
        }

        return (
            <div id="loading">
                <i className="fas fa-3x fa-spinner fa-spin"></i>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.AppReducer.loading
    }
}

export default connect(mapStateToProps)(Loading);
