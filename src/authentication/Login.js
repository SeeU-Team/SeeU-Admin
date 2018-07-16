import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../route/History';
import { API_URL } from '../constants';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            loading: false
        }
    }

    componentWillMount(){
        if(localStorage.getItem("token") != null)
            history.push("/app");
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="HorizontalCentered">
                        <AppBar
                            title="SeeU Administration Portal"
                        />
                        <div className="VerticalCentered">
                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange = {(event,newValue) => this.setState({email:newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange = {(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)}/>
                            <br/>
                            <br/>
                            <br/>
                            { this.state.loading && <CircularProgress thickness={7} />}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        var URL = API_URL + "login/admin";
        var self = this;

        this.setState({
            loading : true,
        });

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: self.state.email,
                password: self.state.password
            })
        }).then(function(response) {
            self.setState({
                loading : false,
            });
            return (response.status === 200) ? response : response.json();
        }).then(function(response) {
            if(response.status === 200){

                let authorizationHeader = response.headers.get("Authorization");
                let token = authorizationHeader.split(" ")[1];

                console.log("Login successfull");
                localStorage.setItem("token", token);
                history.push('/app');

            }
            else if(response.status === 404){
                console.log("Username password do not match");
                alert("username password do not match")
            }
            else{
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        })
        .catch(function (error) {
            self.setState({
                loading : false,
            });
            console.log(error);
        });
    }
}

export default Login;