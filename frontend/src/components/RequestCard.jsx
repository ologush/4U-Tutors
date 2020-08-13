import React from 'react'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

function RequestCard(props) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.course}</Typography>
                <Typography variant="h6">{props.tutorName}</Typography>
                <Typography variant="h6">{props.tutorEmail}</Typography>
                <Divider />
                <Typography variant="body1">{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={props.onCancel}>Cancel</Button>
            </CardActions>
        </Card>
    )
}

RequestCard.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    tutorName: PropTypes.string.isRequired,
    tutorEmail: PropTypes.string.isRequired,
    times: PropTypes.array.isRequired
}

export default RequestCard;