import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
const tagOptions = [
    {
        name: "Science",
        checked: false,
        key: 'science'
    },
    {
        name: "Math",
        checked: false,
        key: 'math'
    },
    {
        name: "English",
        checked: false,
        key: 'english'
    },
    {
        name: "Programming",
        checked: false,
        key: 'programming'
    },
    {
        name: "Technology",
        checked: false,
        key: 'technology'
    },
    {
        name: "Business",
        checked: false,
        key: 'business'
    }
];

class TagOptions extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <Grid container>
                <FormControl>
                <FormLabel component="legend">Choose related tags about the course</FormLabel>
                {
                    tagOptions.map((option, index) => {
                        const { name, checked, key} = option;

                        return (
                            <Grid item>
                                <FormControlLabel control={<Checkbox color="primary" />} label={index} />
                            </Grid>
                        )
                    })
                }
                </FormControl>
            </Grid>
        );
    }
}

export default TagOptions;