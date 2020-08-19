import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"



function Landing(props) {

    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        About Us
                    </Typography>
                    <Typography variant="body1">
                        Placeholder
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        Get Started
                    </Typography>
                    <Typography variant="body1">
                        Email us at tutors@4uacademics.com to apply to become a tutor.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Landing;