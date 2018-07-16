import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { post } from 'axios';
import { API_URL } from '../constants';

class AssetsPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            assets : [],
            newAsset : "",
            filterAsset: "",
            selectedFile: ""
        };

        this.getAll = this.getAll.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    render() {
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <Grid container spacing={8}>
                            <Grid item xs={2}>
                                <TextField
                                    className          = "NormalMargin"
                                    hintText           = "Search an asset"
                                    floatingLabelText  = "Search"
                                    onChange           = {(event,newValue) => this.setState({filterAsset:newValue})}
                                />
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    className          = "NormalMargin"
                                    hintText           = "Enter a new asset"
                                    floatingLabelText  = "New asset"
                                    onChange           = {(event,newValue) => this.setState({newAsset:newValue})}
                                />
                                <RaisedButton
                                    className          = "NormalMargin"
                                    containerElement   = "label"
                                    onChange           = {this.fileChangedHandler}>
                                    <input type="file" />
                                </RaisedButton>
                                <RaisedButton className="NormalMargin" label="Add" primary={true}  onClick={(event) => this.addNewAsset(event)}/>
                            </Grid>
                        </Grid>
                        <List>
                            {
                               this.state.assets &&
                               this.state.assets
                                    .filter((asset) => asset.name.toLowerCase().indexOf(this.state.filterAsset.toLowerCase()) > -1)
                                    .map(function(asset, index) {
                                        return (
                                            <div key={index}>
                                                <ListItem>
                                                    <Avatar alt={asset.name} src={asset.imageLight} />
                                                    <ListItemText primary={asset.name} secondary={asset.id}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Delete" onClick={() => this.deleteAt(asset.id)}>
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
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
        console.log(this.state.selectedFile);
    };

    addNewAsset(event){
        var URL = API_URL + "api/medias/assets";
        let self = this;

        const formData = new FormData();
        formData.append('name', this.state.newAsset);
        formData.append('imageLight', this.state.selectedFile);
        formData.append('imageDark', this.state.selectedFile);

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        post(URL, formData,config).then(function (response) {

        }).catch(function (error) {
            // handle error
            console.log(error);
        }).then(function () {
            self.getAll();
        });

    }

    getAll(){
        var URL = API_URL + "api/medias/assets";
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
                    assets: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteAt(id){
        this.setState({
            assets : this.state.assets.filter(item => item.id != id)
        });

        var URL = API_URL + "api/medias/assets/" + id;

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

export default AssetsPanel;