import React, { Component } from 'react';

class BoxForm extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <div className="box">
                    <div className="content-wrap">
                        <div className="myob-login-header">
                            <img className="login-logo" src="/static/images/logo.jpg" />
                            <h6>
                                {this.props.title}
                            </h6>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default BoxForm;
