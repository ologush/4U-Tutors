import React, { Component } from 'react'
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { withRouter } from "react-router-dom"
import {Create as CreateIcon, Home as HomeIcon, List as ListIcon, ListAlt as ListAltIcon, Archive as ArchiveIcon, PostAdd as PostAddIcon, ContactMail as ContactMailIcon} from "@material-ui/icons"
import Divider from "@material-ui/core/Divider"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    }
}))


const options = [
    {
        name: "Home",
        path: "/HomePage",
        icon: <HomeIcon />
    },
    {
        name: "My Lessons",
        path: "/myLessons",
        icon: <ListIcon />
    },
    {
        name: "Find Postings",
        path: "/findPostings",
        icon: <ListAltIcon />
    },
    {
        name: "Past Lessons",
        path: "/pastLessons",
        icon: <ArchiveIcon />
    },
    {
        name: "Lesson Requests",
        path: "/requests",
        icon: <PostAddIcon />
    },
    {
        name: "My Bids",
        path: "/myBids",
        icon: <ContactMailIcon />
    }
];

function Menu(props) {

    const classes = useStyles();

    const onClick = (path) => {
        props.menuState();
        window.location.href = path;
    }

    const handleClose = (e) => {
        props.menuState();
    }

    return (
        <Drawer anchor="left" open={props.open} variant="persistent" className={classes.drawer}>
                <div>
                    <IconButton onClick={handleClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Divider />
                </div>
                <List>
                    {
                        options.map((option, index) => {
                            const { name, path, icon} = option;
                            return (
                                <ListItem button onClick={() => onClick(path)} key={path}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Drawer>
        );
    
}

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    menuState: PropTypes.func.isRequired

}

//export default withRouter(Menu);
export default Menu;
