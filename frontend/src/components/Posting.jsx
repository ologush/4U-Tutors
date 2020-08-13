import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

function Posting(props) {

    const tagString = props.tags.reduce((accumulator, tag) => {
        return accumulator + tag + ", ";
    }, "")

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{props.course}</Typography>
                <Typography variant="body1">{props.description}</Typography>
                <Typography variant="h6">{tagString}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={props.selectBid}>Select Bid</Button>
                <Button variant="contained" onClick={props.onEdit}>Edit Posting</Button>
                <Button variant="contained" color="secondary" onClick={props.onDelete}>Delete Posting</Button>
            </CardActions>
        </Card>
    )
}

Posting.propTypes = {
    course: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    selectBid: PropTypes.func.isRequired
}

export default Posting;