import React from 'react'
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"

function PastLesson(props) {

    return(
        <Card>
            <CardContent>
                <Typography variant="h5">
                    With: {props.tutorName}
                </Typography>
                <br />
                <Typography variant="h5">
                    On: {props.date.toLocaleDate("en-CA", )}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={props.onRequest}>Request Another Lesson</Button>
                <Button onClick={props.complain}>File a Complaint</Button>
            </CardActions>
        </Card>
    )
}

PastLesson.propTypes = {
    tutorName: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    onRequest: PropTypes.func.isRequired,
    complain: PropTypes.func.isRequired
}

export default PastLesson;