import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"



function RequestTime(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Date: {props.dateString}</Typography>
                <Typography variant="h6">Time: {props.timeString}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" disabled={props.disabled} onClick={props.select}>Select This time</Button>
            </CardActions>
        </Card>
    )
}

RequestTime.propTypes = {
    disabled: PropTypes.bool.isRequired,
    timeString: PropTypes.string.isRequired,
    dateString: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired
}

export default RequestTime;