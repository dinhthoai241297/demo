import React, { Component, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Loading from './common/Loading';

class App extends Component {
    render() {
        return (
            <Fragment>
                {this.props.children}
                <ToastContainer />
                <Loading />
            </Fragment>
        );
    }
}

export default App;
