import React, { Component } from 'react'
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";

import { Link, withRouter } from "react-router-dom"

import PropTypes from "prop-types"


import axios from "axios";

class DisplayLessons extends Component {
    constructor() {
        super();

        this.state = {
            lessons: []
        }

    }

    componentDidMount() {
        axios
            .post("/users/getLessons", {studentID: this.props.auth.user.id})
            .then(res => {
                console.log(res.data);
                this.setState({
                    lessons: res.data
                });
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                <Typography variant="h1">These are your lessons</Typography>

                {this.state.lessons.map((lesson) => (
                    <Typography variant="h4">{lesson.dateAndTime}</Typography>
                ))}
            </div>
        );
    }
}

DisplayLessons.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withRouter(DisplayLessons));