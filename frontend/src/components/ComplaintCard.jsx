import React from 'react'
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

function ComplaintCard(props) {

    return (
        <Paper>
            <Typography variant="h5">With: {props.tutorEmail}</Typography>
            <Typography variant="h5">Submitted on: {props.dateString}</Typography>
            <Typography variant="h6">Type: {props.complaintType}</Typography>
            <Typography variant="body1">{props.complaint}</Typography>
        </Paper>
    )

}

ComplaintCard.propTypes = {
    dateString: PropTypes.string.isRequired,
    tutorEmail: PropTypes.string.isRequired,
    complaintType: PropTypes.string.isRequired,
    complaint: PropTypes.string.isRequired
}

export default ComplaintCard;