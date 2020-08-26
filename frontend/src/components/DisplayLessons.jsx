import React, { Component, useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import { setCurrentLesson } from "../actions/lessonActions"

import { Link, withRouter } from "react-router-dom"

import PropTypes from "prop-types"

import LessonDisplay from "./LessonDisplay"


import axios from "axios";

import Grid from "@material-ui/core/Grid"



const dateOptions = { weekday: "long", month: "long", day: "numeric"}
const timeOptions = { hour: "numeric", minute: "numeric"}

function DisplayLessons(props) {
    const [lessons, setLessons] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [loading, setLoading] = useState(true);
    const [hasLessons, setHasLessons] = useState(false);

    useEffect(() => {
        // axios
        // .post("/users/getLessons", { studentID: user.id})
        // .then(res => {
        //     if(res.data.length > 0) {
        //         setLessons(res.data);
        //         setHasLessons(true);
        //         setLoading(false);
        //     } else {
        //         setLoading(false);
        //     }
        // })
        // .catch(err => console.log(err));

        axios
        .get("/users/getLessons", { params: { studentID: user.id } })
        .then(res => {
            if(res.data.length > 0) {
                console.log(res.data);
                setLessons(res.data);
                setHasLessons(true);
                setLoading(false);
            } else {
                setLoading(false)
            }
        })
    }, []);

    const enterLesson = (lessonID, index) => {
        props.setCurrentLesson(lessons[index]);

        props.history.push("/videoChat/" + lessonID);
    }

    const cancelLesson = (lessonID) => {
        axios
        .post("/lesson/student/cancel", { lessonID: lessonID })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <Grid container spacing={2}>
            { !loading ? (
                lessons.map((lesson, index) => {
                    const date = new Date(lesson.dateAndTime);
                    const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);

                    return (
                        <Grid item xs={4}>
                            <LessonDisplay 
                                date={dateString}
                                subject={lesson.subject}
                                tutorName={lesson.tutorName}
                                onClick={() => enterLesson(lesson._id, index)}
                                cancelLesson={() => cancelLesson(lesson._id)}
                                date={date}
                            />
                        </Grid>
                    )
                })
                //!hasLessons && <Typography variant="h5">You have no lessons, make a posting to get started</Typography>
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
            }
        </Grid>
    )
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