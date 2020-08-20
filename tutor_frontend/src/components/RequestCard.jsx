import React from "react"
import PropTypes from "prop-types"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

function RequestCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Course: {props.course}</Typography>
                <Typography variant="body1">{props.description}</Typography>
                <Typography variant="h6">Type: {props.type}</Typography>
                <Typography variant="h6">Payout: ${props.payout}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={props.enterRequest}>Enter Booking</Button>
                <Button variant="contained" color="secondary" onClick={props.decline}>Decline</Button>
            </CardActions>
        </Card>
    )
}

RequestCard.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    decline: PropTypes.func.isRequired,
    enterRequest: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    payout: PropTypes.number.isRequired
}

export default RequestCard;