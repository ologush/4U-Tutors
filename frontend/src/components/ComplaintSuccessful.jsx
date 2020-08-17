import React from 'react'
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

function ComplaintSuccessful(props) {

    return (
        <Paper>
            <Typography variant="h5">Your complaint was submitted successfully</Typography>

            <Button onClick={() => props.history.push("/complaints")} variant="contained">Go to my complaints</Button>
        </Paper>
    )
}

export default ComplaintSuccessful;