import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
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

const accountOptions = [
    "Account Settings",
    "Logout"
];


const tutorRoutes = [
    {
        name: "Home",
        path: "./HomePage"
    },
    {
        name: "My Lessons",
        path: "./myLessons"
    },
    {
        name: "Find Postings",
        path: "./findPostings"
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
        this.setState({
            anchorEl: e.currentTarget,
            openMenu: true
        });
    }

    handleClose(e) {
        this.setState({
            anchorEl: null,
            openMenu: false,
            openAccountMenu: false
        });



        if(e.target.id == "Logout") {
            this.onLogoutClick(e);
        } else {
            this.props.history.push(e.target.id);
        }
    }

    render() {

        return(<div>

            <AppBar position="static">
                <ToolBar>
                    <Grid
                        justify="space-between"
                        container
                    >
                        { this.props.auth.isAuthenticated && 
                            <Grid item>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleMenu}>
                                <MenuIcon />

                            </IconButton>
                            <Menu
                                id='menu-bar'
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={this.state.openMenu}
                                onClose={this.handleClose}
                            >
                                

                                {tutorRoutes.map((option) => (
                                    
                                
                                
                                    <MenuItem key={option.name} id={option.path} selected={option === 'Pyxis'} onClick={this.handleClose}>
                                        {option.name}
                                    </MenuItem> 
                                ))}
                            </Menu>

                            
                                
                        </Grid> }
                        

                        { this.props.auth.isAuthenticated && 
                        <Grid item>
                            <IconButton edge="end" color="inherit" aria-label="Account" onClick={this.handleAccountMenu}>
                                <AccountCircle />
                            </IconButton>
                            <Menu 
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
                               

                            </Menu>
                        </Grid> }
                            
                    

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