import React from "react";
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

import PropTypes from "prop-types"

function Bid(props) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Course: {props.course}</Typography>
                <Typography variant="h6">Time: {props.time}</Typography>
                <Typography variant="body1">{props.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={props.cancel} variant="contained" color="secondary">Cancel</Button>
            </CardActions>
        </Card>
    )
}

Bid.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cancel: PropTypes.func.isRequired,
    time: PropTypes.string.isRequired
}

export default Bid;