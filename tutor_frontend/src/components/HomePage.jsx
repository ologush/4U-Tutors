import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"

class HomePage extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Typography variant="h1">Welcome to the HomePage</Typography>
            </div>
        );
    }

}

export default HomePage;