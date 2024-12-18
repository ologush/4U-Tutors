import React, { useState, useEffect } from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"
import axios from "axios"
import Paper from "@material-ui/core/Paper"

function TutorFinder(props) {

    const [value, setValue] = useState("");


    useEffect(() => {

        console.log(props);

        if(props.fromPastLesson) {
            setValue(props.existingEmail);
            console.log('a')
        }

    }, [])

    const updateValue = (e) => {
        setValue(e.target.value);
    }

    

    const submitEmail = (e) => {
        axios
            .get("/tutors/findByEmail", { params: { email: value } })
            .then(res => {
                console.log(res.data);
                props.onEnter(res.data);
            })
            .catch(err => {
                if(err.response.status === 404) {
                    alert("You entered an incorrect email")
                }
            })
    }

    return(
        <Paper>
            <TextField value={value} onChange={updateValue}></TextField>
            <Button onClick={submitEmail}>Select</Button>
        </Paper>  
    )
}

TutorFinder.propTypes = {
    onEnter: PropTypes.func.isRequired,
    existingEmail: PropTypes.string,
    fromPastLesson: PropTypes.bool
}

export default TutorFinder;