import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { API_URL } from '../constants';

class TagsPanel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tags : [],
            filterTag: ""
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
                        <TextField
                            className          = "NormalMargin"
                            hintText           = "Search a tag"
                            floatingLabelText  = "Search"
                            onChange           = {(event,newValue) => this.setState({filterTag:newValue})}
                        />
                        <List>
                            {
                                this.state.tags &&
                                this.state.tags
                                    .filter((tag) => tag.name.toLowerCase().indexOf(this.state.filterTag.toLowerCase()) > -1)
                                    .map(function(tag, index) {
                                        return (
                                            <div key={index}>
                                                <ListItem>
                                                    <ListItemText primary={tag.name} secondary={tag.id}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Delete" onClick={() => this.deleteAt(tag.id)}>
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
        var URL = API_URL + "api/medias/tags";
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
                    tags: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteAt(id){
        this.setState({
            tags : this.state.tags.filter(item => item.id != id)
        });

        var URL = API_URL + "api/medias/tags/" + id;

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

export default TagsPanel;