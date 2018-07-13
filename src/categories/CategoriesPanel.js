import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CategoriesPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categories : [],
            newCategory : ""
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
                        <List>
                            {
                                this.state.categories.map(function(object) {
                                    return (<ListItem key={object.id}>
                                                <ListItemText primary={object.name} secondary={object.id}/>
                                                <ListItemSecondaryAction>
                                                    <IconButton aria-label="Delete" onClick={() => this.deleteAt(object.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>)
                                            </ListItem>
                                            )
                                }, this)
                            }
                        </List>
                        <TextField
                            hintText="Enter a new category"
                            floatingLabelText="New category"
                            onChange = {(event,newValue) => this.setState({newCategory:newValue})}
                        />
                        <RaisedButton label="Submit" primary={true}  onClick={(event) => this.addNewCategory(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

    getAll(){
        var API_URL = "http://192.168.2.200:8001/api/medias/categories";
        let self = this;

        fetch(API_URL, {
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

        var API_URL = "http://192.168.2.200:8001/api/medias/categories/";
        let self = this;

        fetch(API_URL + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    addNewCategory(event){
        var API_URL = "http://192.168.2.200:8001/api/medias/categories";
        var self = this;

        fetch(API_URL, {
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