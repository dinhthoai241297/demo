import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import Login from './components/user/Login';
import UpdateInfo from './components/user/UpdateInfo';
import ActiveUser from './components/user/ActiveUser';
import Register from './components/user/Register';
import ConnectInfo from './components/user/ConnectInfo';
import ErrorPage from './components/ErrorPage/ErrorPage';

export default (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login} />
                <Route path="/update" component={UpdateInfo} />
                <Route path="/active" component={ActiveUser} />
                <Route path="/register" component={Register} />
                <Route path="/connectInfo" component={ConnectInfo} />
                <Route component={ErrorPage} />
            </Switch>
        </App>
    </Router>
);
