import React, { Component } from 'react';
import Main from '../common/Main';
import { connect } from 'react-redux';
import { loadInfoUser } from '../../actions/UserActions';
import { Redirect } from 'react-router-dom';

class ConnectInfo extends Component {

    componentDidMount() {
        let { token } = this.props;
        if (token) {
            this.props.loadInfoUser(token);
        }
    }

    render() {

        let { user } = this.props;
        if (!user) {
            return <Redirect to="/login" />
        }

        let { mysqlDatabase, mysqlPassword, mysqlPort, mysqlUser, serverIp, sshPort, sshPwd, sshUser } = user;

        return (
            <Main>
                <div>
                    <div className="row">
                        <div className="col-md-7 col-xs-12 mb-2">
                            <div className="card">
                                <div className="card-header">
                                    Server
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                Server IP
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {serverIp}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                SSH Port
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {sshPort}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                SSH Password
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {sshPwd}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                SSH User
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {sshUser}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7 col-xs-12 mb-2">
                            <div className="card">
                                <div className="card-header">
                                    MySQL
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                MySQL Database
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {mysqlDatabase}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                MySQL Password
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {mysqlPassword}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                MySQL Port
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {mysqlPort}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4">
                                            <b>
                                                MySQL User
                                            </b>
                                        </div>
                                        <div className="col-xs-8">
                                            {mysqlUser}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Main >
        );
    }
}

const mapDispatchToProps = (distpatch, props) => {
    return {
        loadInfoUser: session => distpatch(loadInfoUser(session))
    }
}

const mapStateToProp = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(ConnectInfo);
