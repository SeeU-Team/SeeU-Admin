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
import { API_URL } from '../constants';

class CategoriesPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            newCategory : "",
            filterCategory: ""
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
                                    hintText           = "Search a category"
                                    floatingLabelText  = "Search"
                                    onChange           = {(event,newValue) => this.setState({filterCategory:newValue})}
                                />
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    className          = "NormalMargin"
                                    hintText           = "Enter a new category"
                                    floatingLabelText  = "New category"
                                    onChange           = {(event,newValue) => this.setState({newCategory:newValue})}
                                />
                                <RaisedButton className="NormalMargin" label="Add" primary={true}  onClick={(event) => this.addNewCategory(event)}/>
                            </Grid>
                        </Grid>
                        <List>
                            {
                                this.state.categories &&
                                this.state.categories
                                    .filter((category) => category.name.toLowerCase().indexOf(this.state.filterCategory.toLowerCase()) > -1)
                                    .map(function(category, index) {
                                    return (
                                        <div key={index}>
                                            <ListItem>
                                                    <ListItemText primary={category.name} secondary={category.id}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Delete" onClick={() => this.deleteAt(category.id)}>
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

    getAll(){
        var URL = API_URL + "api/medias/categories";
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
                    categories: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteAt(id){
        this.setState({
            categories : this.state.categories.filter(item => item.id != id)
        });

        var URL = API_URL + "api/medias/categories/" + id;

        fetch(URL , {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    addNewCategory(event){
        var URL = API_URL + "api/medias/categories";
        var self = this;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: self.state.newCategory
            })
        }).then(function(response) {
            return (response.status === 200) ? response : response.json();
        }).then(function(response) {
            if(response.status != 200){
                console.log("error");
            }
            self.getAll();
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default CategoriesPanel;