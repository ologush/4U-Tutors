import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { logoutUser } from "../actions/authActions"
import HomePage from './HomePage'
import { Link, withRouter } from 'react-router-dom'
import Menu from "./Menu"
import { Menu as AccountMenu } from "@material-ui/core" 

const accountOptions = [
    "Account Settings",
    "Logout"
];

const studentRoutes = [
    {
        name: "Home",
        path: "./HomePage",
        authLevel: 0
    },
    {
        name: "Search for Tutors",
        path: "./TutorSearch",
        authLevel: 0
    },
    {
        name: "Display Lessons",
        path: "./displayLessons",
        authLevel: 0
    },
    {
        name: "Make Lesson Posting",
        path: "./makePosting",
        authLevel: 0
    },
    {
        name: "My Postings",
        path: "./myPostings",
        authLevel: 0
    }
];

const tutorRoutes = [
    {
        name: "Home",
        path: "./HomePage",
        authLevel: 0
    },
    {
        name: "My Students",
        path: "./MyStudents",
        authLevel: 0
    },
    {
        name: "Upcoming Lessons",
        path: "./UpcomingLessons",
        authLevel: 0
    },
    {
        name: "Find Students",
        path: "./FindStudents",
        authLevel: 0
    }
];


class NavBar extends Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null,
            openMenu: false,
            openAccountMenu: false
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccountMenu = this.handleAccountMenu.bind(this);



    }


    //const classes = useStyles();
    
    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
    }

    handleChange(e) {
        
        
    }

    handleAccountMenu(e) {
        console.log(this.props.auth.user);
        this.setState({
            anchorEl: e.currentTarget,
            openAccountMenu: true
        });

    }

    handleMenu(e) {
        // this.setState({
        //     anchorEl: e.currentTarget,
        //     openMenu: true
        // });

        this.setState(prevState => ({
            openMenu: !prevState.openMenu
        }));
    }

    handleClose(e) {
        this.setState({
            anchorEl: null,
            openMenu: false,
            openAccountMenu: false
        });



        if(e.target.id == "Logout") {
            this.onLogoutClick(e);
        } else if(e.target.id == "Account Settings") {
            this.props.history.push("/accountsettings")
        } else {
            this.props.history.push(e.target.id);
        }
    }

    render() {

        return(<div>

            <AppBar position="fixed">
                <ToolBar disableGutters>
                    <Grid
                        justify="space-between"
                        container
                        direction="row"
                    >
                        <Grid item xs={1}>

                        
                        { this.props.auth.isAuthenticated && 
                            <div>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleMenu}>
                                <MenuIcon />

                            </IconButton>
                            <Menu open={this.state.openMenu} menuState={this.handleMenu} />

                            </div>
                                
                         }
                        </Grid>
                        <Grid item xs={10}>
                            <Typography align="left" variant="h4">4U Academics</Typography>
                        </Grid>
                        
                        <Grid item xs={1}>
                        { this.props.auth.isAuthenticated && 
                        <div>
                            <IconButton edge="end" color="inherit" aria-label="Account" onClick={this.handleAccountMenu}>
                                <AccountCircle />
                            </IconButton>
                            <AccountMenu
                                id="account-menu"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={this.state.openAccountMenu}
                                onClose={this.handleClose}
                            >
                                {accountOptions.map((option) => (
                                    <MenuItem id={option} key={option} selected={option === "Pyxis"} onClick={this.handleClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                               

                            </AccountMenu>
                            </div>
                         }
                            
                         </Grid>

                    </Grid>
                    
                    
                  
                </ToolBar>
            </AppBar>

        </div>);
        
    }
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(NavBar));