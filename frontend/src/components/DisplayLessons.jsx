import React, { Component } from 'react'
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import { setCurrentLesson } from "../actions/lessonActions"

import { Link, withRouter } from "react-router-dom"

import PropTypes from "prop-types"


import axios from "axios";

class DisplayLessons extends Component {
    constructor() {
        super();

        this.state = {
            lessons: []
        };

        this.enterLesson = this.enterLesson.bind(this);

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
            .catch(err => console.log(err));
    }

    enterLesson(e) {
        e.preventDefault();

        console.log(e.target.id);

        this.props.setCurrentLesson(this.state.lessons[e.target.id]);

        this.props.history.push('/videoChat');
    }

    render() {
        return(
            <div>
                <Typography variant="h1">These are your lessons</Typography>
                
                {this.state.lessons.map((lesson, index) => (
                    <div>

                    <Typography variant="h4">{lesson.dateAndTime}</Typography>
                    <Typography variant="h4">{lesson.subject}</Typography>
                    <Typography variant="h4">{lesson.studentName}</Typography>
                    <Typography variant="h4">{lesson.tutorName}</Typography>
                    
                    <button id={index} onClick={this.enterLesson}>Enter Lesson</button>
                    </div>
                ))}
            </div>
        );
    }
}

DisplayLessons.propTypes = {
    auth: PropTypes.object.isRequired,
    setCurrentLesson: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { setCurrentLesson }
)(withRouter(DisplayLessons));