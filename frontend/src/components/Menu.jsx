import React, { Component } from 'react'
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { withRouter } from "react-router-dom"
import {Create as CreateIcon, Home as HomeIcon, List as ListIcon, ListAlt as ListAltIcon} from "@material-ui/icons"

const options = [
    {
        name: "Home",
        path: "/HomePage",
        icon: <HomeIcon />
    },
    {
        name: "Make Posting",
        path: "/makePosting",
        icon: <CreateIcon />
    },
    {
        name: "My Lessons",
        path: "/displayLessons",
        icon: <ListIcon />
    },
    {
        name: "My Postings",
        path: "/myPostings",
        icon: <ListAltIcon />
    }
];


class Menu extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(path) {
        
        //will switch to window.location.href after done
        this.props.menuState();
        window.location.href = path;
        //this.props.history.push(path);
        
      
    }


    render() {
        return(
            <Drawer anchor="left" open={this.props.open}>
                <List>
                    {
                        options.map((option, index) => {
                            const { name, path, icon} = option;
                            return (
                                <ListItem button onClick={() => this.onClick(path)} key={path}>
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
    open: PropTypes.bool.isRequired,
    menuState: PropTypes.func.isRequired

}

export default withRouter(Menu);
