import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import MediasPanel from '../medias/MediasPanel';
import CategoriesPanel from '../categories/CategoriesPanel';
import AssetsPanel from '../assets/AssetsPanel';
import TagsPanel from '../tags/TagsPanel';
import AdminPanel from '../admin/AdminPanel';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Medias" />
                        <Tab label="Categories"/>
                        <Tab label="Assets"/>
                        <Tab label="Tags"/>
                        <Tab label="Admin"/>
                    </Tabs>
                </AppBar>
                <TabContainer>
                {value === 0 && <MediasPanel/>}
                {value === 1 && <CategoriesPanel/>}
                {value === 2 && <AssetsPanel/>}
                {value === 3 && <TagsPanel/>}
                {value === 4 && <AdminPanel/>}
                </TabContainer>
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);