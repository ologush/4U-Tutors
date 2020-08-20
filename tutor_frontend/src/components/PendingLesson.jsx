import React from 'react'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"

function PendingLesson(props) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.course}</Typography>
                <Typography variant="h5">At: {props.dateString}</Typography>
                <Typography variant="body1">{props.description}</Typography>
            </CardContent>
        </Card>
    )
}

PendingLesson.propTypes = {
    dateString: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
}

export default PendingLesson;
