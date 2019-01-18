import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/user/Login';
import UpdateInfo from './components/user/UpdateInfo';

export default (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/update" component={UpdateInfo} />
        </Switch>
    </Router>
);
