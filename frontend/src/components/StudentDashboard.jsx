import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../actions/authActions"
import Typography from "@material-ui/core/Typography"

class StudentDashboard extends Component {
    constructor(){
        super();
    }

    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
    }

    render() {
        return(
            <div>
                <Typography variant="h1">Welcome to the Student Dashboard</Typography>
            </div>
        );
    }
}