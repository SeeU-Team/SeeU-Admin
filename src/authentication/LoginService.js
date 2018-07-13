/**
 * Created by Vincent on 13/07/2018.
 */
import React from 'react';
import { withRouter } from 'react-router';
import history from '../route/History';

function requireAuth(Component) {

    class AuthenticationComponent extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                isAuthorized: false
            };

            this.checkAuth = this.checkAuth.bind(this);
            this.storeUserInStorage = this.storeUserInStorage.bind(this);
            this.redirectToLogin = this.redirectToLogin.bind(this);
        }

        render() {
            return this.state.isAuthorized ? <Component { ...this.props } /> : null;
        }

        componentWillMount() {
            this.checkAuth();
        }

        checkAuth() {
            if(localStorage.getItem("token") == null)
                this.redirectToLogin();
            else
                this.setState({
                    isAuthorized : true
                });
        }

        storeUserInStorage(user) {
            localStorage.setItem('user-id', user.id);
        }

        redirectToLogin() {
            history.push('/login');
        }
    }

    return withRouter(AuthenticationComponent);

}

export default requireAuth;