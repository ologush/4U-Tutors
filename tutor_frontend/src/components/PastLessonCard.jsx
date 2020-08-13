import React from 'react'
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"

function PastLessonCard(props) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.course}</Typography>
                <Typography variant="h6">{props.dateString}</Typography>
                <Typography variant="body1">{props.description}</Typography>
                <Typography variant="h6">Rating: {props.rating}/5</Typography>
                <Typography variant="body1">Feedback: {props.feedback}</Typography>
            </CardContent>
        </Card>
    )
}

PastLessonCard.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    feedback: PropTypes.string.isRequired
}

export default PastLessonCard;