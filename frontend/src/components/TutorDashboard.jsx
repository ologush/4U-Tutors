import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class TutorDashboard extends Component {
    constructor() {
        super();
    }

    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
    }

    render() {
        return(
            <div>
                <Typography variant="h1">Welcome to the Tutor Dashboard</Typography>
            </div>
        );
    }
}

TutorDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TutorDashboard);