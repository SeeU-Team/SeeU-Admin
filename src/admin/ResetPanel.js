/**
 * Created by Thomas on 16/07/2018.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { API_URL } from '../constants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class ResetPanel extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton label="Reset" secondary={true} onClick={this.handleClickOpen}></RaisedButton>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to reset the whole database ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClick} color="primary">
                                Yes
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }

    handleClick(event){
        var URL = API_URL + "api/teams/admin/reset";

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });

        this.setState({ open: false });
    }
}

export default ResetPanel;