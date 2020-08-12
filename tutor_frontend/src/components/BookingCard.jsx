import React from 'react'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"


function BookingCard(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{props.dateString}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" disabled={props.disabled} onClick={props.onSubmit}>Select this Time</Button>
            </CardActions>
        </Card>
    )
}

BookingCard.propTypes = {
    dateString: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default BookingCard;