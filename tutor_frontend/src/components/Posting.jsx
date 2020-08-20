import React from 'react'

import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

function Posting(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Course: {props.course}</Typography>
                <Typography variant="body1">{props.description}</Typography>
                <Typography variant="h6">Grade: {props.grade}</Typography>
                <Typography variant="h6">Type: {props.type}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={props.enterBooking} variant="contained">Book a Time</Button>
            </CardActions>
        </Card>
    )
}

Posting.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    enterBooking: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default Posting;