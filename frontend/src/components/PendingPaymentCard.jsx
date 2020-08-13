import React from 'react'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

function PendingPaymentCard(props) {
    return(
        <Card>
            <CardContent>
                <Typography variant="h5">{props.course}</Typography>
                <Typography variant="h6">With: {props.tutorName}</Typography>
                <Divider />
                <Typography variant="body1">{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={props.enterPay}>Pay</Button>
            </CardActions>
        </Card>
    )
}

PendingPaymentCard.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    enterPay: PropTypes.func.isRequired,
    tutorName: PropTypes.string.isRequired,
    tutorEmail: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired
}

export default PendingPaymentCard;