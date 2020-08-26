import React, { Component } from 'react'

import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"

import PropTypes from "prop-types"

function LessonDisplay(props) {

    const currentDate = new Date(Date.now());

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.subject}</Typography>
                <Typography variant="h6">{props.dateString}</Typography>
                <Typography variant="h6">With: {props.tutorName}</Typography>
                <Typography variant="body1">{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={props.onClick} disabled={props.date.getTime() - currentDate.getTime() > 300000}>Enter Lesson</Button>
                <Button variant="contained" color="secondary" onClick={props.cancelLesson}>Cancel</Button>
            </CardActions>
        </Card>   
    )
}


LessonDisplay.propTypes = {
    dateString: PropTypes.object.isRequired,
    subject: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    cancelLesson: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired
}

export default LessonDisplay;