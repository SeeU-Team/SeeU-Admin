import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from 'material-ui/Divider';
import { API_URL } from '../constants';

class AdminPanel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            admins:[],
            filterAdmin:"",
            email:'',
            password:'',
            passwordVerification:'',
            passwordAreDifferent : false,
            requestError : false
        }
    }

    componentDidMount() {
        this.getAll();
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <Grid container spacing={8}>
                            <Grid item xs={2}>
                                <TextField
                                    className          = "NormalMargin"
                                    hintText           = "Search an admin"
                                    floatingLabelText  = "Search"
                                    onChange           = {(event,newValue) => this.setState({filterAdmin:newValue})}
                                />
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    className          = "NormalMargin"
                                    hintText           = "Enter a new admin email"
                                    floatingLabelText  = "Email"
                                    onChange           = {(event,newValue) => this.setState({email:newValue})}
                                />
                                <TextField
                                    className          = "NormalMargin"
                                    type               = "password"
                                    hintText           = "(8 characters minimum)"
                                    floatingLabelText  = "Password"
                                    onChange           = {(event,newValue) => this.setState({password:newValue})}
                                />
                                <TextField
                                    className          = "NormalMargin"
                                    type               = "password"
                                    hintText           = "Verify your password"
                                    floatingLabelText  = "Password Verification"
                                    onChange           = {(event,newValue) => this.setState({passwordVerification:newValue})}
                                />
                                <RaisedButton className="NormalMargin" label="Add" primary={true}  onClick={(event) => this.addNewAdmin(event)}/>
                            </Grid>
                        </Grid>
                        <List>
                            {
                                this.state.admins &&
                                this.state.admins
                                    .filter((admin) => admin.email.toLowerCase().indexOf(this.state.filterAdmin.toLowerCase()) > -1)
                                    .map(function(admin, index) {
                                        return (
                                            <div key={index}>
                                                <ListItem>
                                                    <ListItemText primary={admin.email} secondary={admin.id}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Delete" onClick={() => this.deleteAt(admin.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        )
                                    }, this)
                            }
                        </List>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.passwordAreDifferent}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Password are not matching</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={this.state.requestError}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Request error</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            passwordAreDifferent: false,
            requestError: false
        });
    };

    addNewAdmin(event){
        var URL = API_URL + "admin";
        var self = this;

        if(this.state.password != this.state.passwordVerification){
            this.setState({
                passwordAreDifferent: true
            })
        } else {
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    email: self.state.email,
                    password: self.state.password
                })
            }).then(function(response) {
                if(response.status != 201)
                    self.setState({
                        requestError: true
                    })
                self.getAll();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    getAll(){
        var URL = API_URL + "admin";
        let self = this;

        fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response) {

            if(response){
                self.setState({
                    admins: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteAt(id){
        this.setState({
            admins : this.state.admins.filter(item => item.id != id)
        });

        var URL = API_URL + "admin/" + id;

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default AdminPanel;