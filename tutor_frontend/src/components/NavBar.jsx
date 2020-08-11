import React, { Component, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Menu as AccountMenu } from '@material-ui/core/'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import { connect, useSelector, useDispatch } from 'react-redux'
import PropTypes from "prop-types"
import { logoutUser } from "../actions/authActions"
import HomePage from './HomePage'
import { Link, withRouter } from 'react-router-dom'
import Menu from "./Menu"
import { FormatColorTextSharp } from '@material-ui/icons'
import clsx from 'clsx'

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

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLEft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}))

function NavBar(props) {
    
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState(false);

    const [auth, setAuth] = useState(useSelector(state => state.auth));



    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
        window.location.href = "http://localhost:4000"
    };

    const handleAccountMenu = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenAccountMenu(true);
    };

    const handleMenu = (e) => {
        console.log(auth);
        setOpenMenu(prev => !prev);
        props.handleMenu();
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        //setOpenMenu(false);
        handleMenu();
        setOpenAccountMenu(false);

        if(e.target.id == "Logout") {
            onLogoutClick(e);
        } else if (e.target.id == "Account Settings") {
            props.history.push("/accountSettings")
        } else {
            props.history.push(e.target.id)
        }
    };

    return (
        <AppBar 
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: openMenu
            })}
        >
            <ToolBar>
                <Grid 
                    justify="space-between"
                    container
                >
                    <Grid item xs={1}>
                        {
                            props.auth.isAuthenticated && 
                            <div>
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                                    <MenuIcon />
                                </IconButton>

                                <Menu open={openMenu} menuState={handleMenu} />
                            </div>
                        }
                    </Grid>
                    <Grid item xs={10}>
                        <Typography align="left" variant="h4">4U Academics</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {
                            props.auth.isAuthenticated &&
                            <div>
                                <IconButton edge="end" color="inherit" aria-label="Account" onClick={handleAccountMenu}>
                                    <AccountCircle />
                                </IconButton>
                                <AccountMenu
                                    id="account-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    open={openAccountMenu}
                                    onClose={handleClose}
                                >
                                    {
                                        accountOptions.map((option) => (
                                            <MenuItem id={option} key={option} slected={option === "Pyxis"} onClick={handleClose}>
                                                {option}
                                            </MenuItem>
                                        ))
                                    }

                                </AccountMenu>
                            </div>
                        }
                    </Grid>
                </Grid>
            </ToolBar>
        </AppBar>
    )


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