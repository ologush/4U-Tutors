import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

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
                        Getting Started
                    </Typography>
                    <Typography variant="body1">
                        Placeholder
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        Tutor of the Week
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Landing;