import React, { Component } from 'react'
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"

import {Create, Home, List, ListAlt} from "@material-ui/icons"

const options = [
    {
        name: "Home",
        path: "./HomePage",
        icon: <Home />
    },
    {
        name: "Make Posting",
        path: "./makePosting",
        icon: <Create />
    },
    {
        name: "My Lessons",
        path: "./displayLessons",
        icon: <List />
    },
    {
        name: "My Postings",
        path: "./myPostings",
        icon: <AltList />
    }
];


class Menu extends Component {
    constructor(props) {
        super(props);


    }


    render() {
        return(
            <Drawer>
                <List>
                    {
                        options.map((option, index) => {
                            const { name, path, icon} = option;
                            return (
                                <ListItem button onClick={this.props.history.push(path)} key={name}>
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
}

Menu.propTypes = {
    isEnabled: PropTypes.bool,
    options: PropTypes.array,

}