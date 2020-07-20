import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"

class BidCard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        const date = new Date(this.props.date);
        const dateOptions = { weekday: "long", month: "long", day: "numeric"}
        const timeOptions = { hour: "numeric", minute: "numeric"}
        return(
            <Card>
                <CardContent>
                    <Typography variant="h5"> {this.props.tutorName} </Typography>
                    <Typography variant="h6">Rating: {this.props.tutorRating}</Typography>
                    <Typography variant="h6">Description: {this.props.tutorDescription}</Typography>
                    <Typography variant="h6">Date: {date.toLocaleDateString("en-US", dateOptions)}</Typography>
                    <Typography variant="h6">Time: {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={() => this.props.submit(this.props.index)}>Book!</Button>
                </CardActions>
            </Card>
        );
    }
}

BidCard.propTypes = {
    tutorRating: PropTypes.number.isRequired,
    tutorDescription: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
}

export default BidCard;