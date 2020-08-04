import React, { Component } from 'react'
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import { setCurrentLesson } from "../actions/lessonActions"

import { Link, withRouter } from "react-router-dom"

import PropTypes from "prop-types"

import LessonDisplay from "./LessonDisplay"


import axios from "axios";

import Grid from "@material-ui/core/Grid"

class DisplayLessons extends Component {
    constructor() {
        super();

        this.state = {
            lessons: []
        };

        this.enterLesson = this.enterLesson.bind(this);
        this.cancelLesson = this.cancelLesson.bind(this);

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

    enterLesson(lessonID, index) {
        

        console.log(lessonID);

        this.props.setCurrentLesson(this.state.lessons[index]);
        localStorage.setItem("startTime", this.state.lessons[index].dateAndTime)
        //localStorage.setItem();

        //this.props.history.push('/videoChat');

        this.props.history.push('/videoChat/' + lessonID);

    }

    cancelLesson(lessonID) {
        axios
        .post("/lesson/student/cancel", { lessonID: lessonID })
        .then(res => {
            console.log(res);
            //location.reload();
        })
        .catch(err => console.log(err))

    }

    render() {

        const oldReturn = (
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

        return (
            <Grid container spacing={4}>
                {
                    this.state.lessons.map((lesson, index) => (
                        <Grid item xs={6}>
                            <LessonDisplay 
                                date={new Date(lesson.dateAndTime)}
                                subject={lesson.subject}
                                tutorName={lesson.tutorName}
                                onClick={() => this.enterLesson(lesson._id, index)}
                                cancelLesson={() => this.cancelLesson(lesson._id)}
                            />
                        </Grid>
                    ))
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