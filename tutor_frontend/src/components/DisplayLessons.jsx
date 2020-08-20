import React, { Component } from 'react'
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import { setCurrentLesson } from "../actions/lessonActions"

import { Link, withRouter } from "react-router-dom"

import PropTypes from "prop-types"

import LessonDisplay from "./LessonDisplay"
import Grid from "@material-ui/core/Grid"

import axios from "axios";

class DisplayLessons extends Component {
    constructor() {
        super();

        this.state = {
            lessons: [],
            lessonEmpty: true
        };

        this.enterLesson = this.enterLesson.bind(this);

    }

    componentDidMount() {
        axios
            .post("/tutors/getLessons", {tutorID: this.props.auth.user.id})
            .then(res => {
                
                if(res.data.length > 0) {
                    this.setState({
                        lessons: res.data,
                        lessonEmpty: false
                    });
                } 
            })
            .catch(err => console.log(err));
    }

    enterLesson(lessonID, index) {
        
        const submissionData = {
            tutorID: this.props.auth.user.id,
            tutorEmail: this.props.auth.user.email,
            stripeID: this.props.auth.user.stripeID,
            lessonID: lessonID,

        }

        axios
        .post("/payments/addPendingPayment", submissionData)
        .then(res => {
            this.props.setCurrentLesson(this.state.lessons[index])
            this.props.history.push('/videoChat/' + lessonID);
        })
        .catch(err => {
            this.props.history.push('/videoChat/' + lessonID);
        });

        
    }

    render() {
        return(
            <Grid container spacing={4}>
                {
                    !this.state.lessonEmpty ? (
                    this.state.lessons.map((lesson, index) => (
                        <Grid item xs={6}>
                            <LessonDisplay
                                date={new Date(lesson.dateAndTime)}
                                subject={lesson.subject}
                                studentName={lesson.tutorName}
                                onClick={() => this.enterLesson(lesson._id, index)}
                            />
                        </Grid>
                    )) ) : (
                        <Typography variant="h5">You have no lessons, go to the find postings page to start booking lessons</Typography>
                    )
                }
            </Grid>
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