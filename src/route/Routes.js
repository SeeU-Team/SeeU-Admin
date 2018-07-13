/**
 * Created by Vincent on 13/07/2018.
 */
import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './History';
import Login from '../authentication/Login';
import Logout from '../authentication/Logout';
import App from '../App.js';
import requireAuth from '../authentication/LoginService.js';

class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={requireAuth(Logout)} />
                    <Route path="/app" component={requireAuth(App)} />
                </div>
            </Router>
        );
    }
}

export default Routes;