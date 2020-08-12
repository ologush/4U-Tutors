import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    header: {
        padding: 10
    }
}))

function HomePage(props) {

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h3">Welcome to the Home Page</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <Typography variant="h4" align="left" className={classes.header}>Getting Started</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage;