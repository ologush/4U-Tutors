import React, { Component } from 'react'

import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"

import PropTypes from "prop-types"

function LessonDisplay(props) {

    const dateOptions = { weekday: "long", month: "long", day: "numeric"}
    const timeOptions = { hour: "numeric", minute: "numeric"}

    const currentDate = new Date(Date.now());



    return (
        <Card>
            <CardContent>
                <Typography variant="h5"> {props.subject} </Typography>
                <br />
                <Typography variant="body1">With: {props.tutorName}</Typography>
                <br />
                <Typography variant="body1">Date: {props.date.toLocaleDateString("en-US", dateOptions)}</Typography>
                <br />
                <Typography variant="body1">Time: {props.date.toLocaleTimeString("en-US", timeOptions)}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="secondary" onClick={props.cancelLesson} disabled={props.date.getTime() - currentDate.getTime() < 86400000}>Cancel Lesson</Button>
                <Button onClick={props.onClick} disabled={props.date.getTime() - currentDate.getTime() > 300000}>Enter Lesson</Button>
                {props.date.getTime() - currentDate.getTime() > 3000 ? (<Typography variant="body1">Lesson will be available witin 5 minutes of the start time</Typography>) : (null)}
            </CardActions>
        </Card>
    );
}


LessonDisplay.propTypes = {
    date: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    cancelLesson: PropTypes.func.isRequired
}

export default LessonDisplay;