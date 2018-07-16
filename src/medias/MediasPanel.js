import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { API_URL } from '../constants';

class MediasPanel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            picturesFromTeams:[],
            picturesFromUsers:[]
        };

        this.getAll = this.getAll.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    render() {
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={6}>
                        <h1>Team pictures</h1>
                        <GridList spacing={1} cols={6}>
                            {
                                this.state.picturesFromTeams &&
                                this.state.picturesFromTeams.map(function(picture, index) {
                                    return (
                                        <GridListTile key={index}>
                                            <img src={picture.pictureUrl}/>
                                            <GridListTileBar
                                                actionIcon={
                                                    <IconButton onClick={() => this.deleteTeamPicture(picture.id)}>
                                                        <DeleteIcon color="secondary" />
                                                    </IconButton>
                                                }
                                                actionPosition="left"

                                            />
                                        </GridListTile>)
                                }, this)
                            }
                        </GridList>
                    </Grid>
                    <Grid item xs={6}>
                        <h1>User pictures</h1>
                        <GridList spacing={1} cols={6}>
                            {
                                this.state.picturesFromUsers &&
                                this.state.picturesFromUsers.map(function(picture, index) {
                                    return (
                                        <GridListTile key={index}>
                                            <img src={picture.pictureUrl}/>
                                            <GridListTileBar
                                                actionIcon={
                                                    <IconButton onClick={() => this.deleteUserPicture(picture.id)}>
                                                        <DeleteIcon color="secondary" />
                                                    </IconButton>
                                                }
                                                actionPosition="left"
                                            />
                                        </GridListTile>)
                                }, this)
                            }
                        </GridList>
                    </Grid>
                </Grid>
            </div>
        );
    }

    getAll(){
        this.getPicturesFromTeams();
        this.getPicturesFromUsers();

    }

    deleteTeamPicture(id){
        this.setState({
            picturesFromTeams : this.state.picturesFromTeams.filter(item => item.id != id)
        });

        var URL = API_URL + "api/teams/pictures/" + id;

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteUserPicture(id){
        this.setState({
            picturesFromUsers : this.state.picturesFromUsers.filter(item => item.id != id)
        });

        var URL = API_URL + "api/users/pictures/" + id;

        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    getPicturesFromTeams(){
        var URL = API_URL + "api/teams/pictures";
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
                    picturesFromTeams: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

    getPicturesFromUsers(){
        var URL = API_URL + "api/users/pictures";
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
                    picturesFromUsers: response
                });
            }

        }).catch(function (error) {
            console.log(error);
        });
    }
}

export default MediasPanel;