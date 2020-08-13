import React, { Component } from 'react'
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import { withRouter } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons"
import {Create as CreateIcon, Home as HomeIcon, List as ListIcon, ListAlt as ListAltIcon, Archive as ArchiveIcon, PostAdd as PostAddIcon, Ballot as BallotIcon, Payment as PaymentIcon } from "@material-ui/icons"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    }
}))

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
    },
    {
        name: "Past Lessons",
        path: "/pastLessons",
        icon: <ArchiveIcon />
    },
    {
        name: "Request a Lesson",
        path: "/requestLesson",
        icon: <PostAddIcon />
    },
    {
        name: "My Requests",
        path: "/myRequests",
        icon: <BallotIcon />
    },
    {
        name: "Pending Payments",
        path: "/pendingPayments",
        icon: <PaymentIcon />
    }
];

function Menu(props) {
    const classes = useStyles();

    const onClick = (path) => {
        props.menuState();
        window.location.href = path;
    };

    const handleClose = (e) => {
        props.menuState();
    }

    return (
        <Drawer anchor="left" open={props.open} variant="persistent" className={classes.drawer} classes={{
            paper: classes.drawerPaper
        }}>
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
    )
}

// class Menu extends Component {
//     constructor(props) {
//         super(props);

//         this.onClick = this.onClick.bind(this);
//     }

//     onClick(path) {
        
//         //will switch to window.location.href after done
//         this.props.menuState();
//         window.location.href = path;
//         //this.props.history.push(path);
        
      
//     }


//     render() {
//         return(
//             <Drawer anchor="left" open={this.props.open}>
//                 <List>
//                     {
//                         options.map((option, index) => {
//                             const { name, path, icon} = option;
//                             return (
//                                 <ListItem button onClick={() => this.onClick(path)} key={path}>
//                                     <ListItemIcon>{icon}</ListItemIcon>
//                                     <ListItemText primary={name} />
//                                 </ListItem>
//                             )
//                         })
//                     }
//                 </List>
//             </Drawer>
//         );
//     }
// }

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    menuState: PropTypes.func.isRequired
}

export default withRouter(Menu);
