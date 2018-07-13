import React from 'react';
import history from '../route/History';

class Logout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    componentWillMount() {

        localStorage.clear();
        history.push('/login');

    }

    render() {

        return (
            <div>
                You will be redirected to the Login page soon...
            </div>
        );
    }
}

export default Logout;