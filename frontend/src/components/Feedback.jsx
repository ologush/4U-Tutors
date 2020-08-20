import React, { useEffect } from 'react'
import { useState } from 'react'

import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"

import Button from "@material-ui/core/Button"

import axios from "axios"

import { useSelector } from "react-redux"

import PropTypes from "prop-types"

function Feedback(props) {

    const { lessonID } = props.match.params;

    const [feedBack, setFeedBack] = useState("");
    const [rating, setRating] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [lesson, setLesson] = useState({});
    const [user, setUser] = useState(useSelector(state => state.auth.user));

    const [didSubmit, setDidSubmit] = useState(false);

    useEffect(() => {
        axios
        .get("/lesson/user/lessonByID", { params: { lessonID: lessonID } })
        .then(res => {
            setLesson(res.data);
        }) 
        .catch(err => console.log(err))

        //maybe will work if feedback is not submitted
        // return function noSubmit() {
        //     alert("did run cleanup")
        //     if(!didSubmit) {
        //         const submissionData = {
        //             lessonID: lessonID,
        //             rating: null,
        //             feedback: "",
        //             studentID: user.id
        //         };

        //         axios
        //         .post("/tutors/giveFeedback", submissionData)
        //         .then(res => {
        //             alert("fuck")
        //         })
        //         .catch(err => console.log(err));
        //     }
        // }
    }, [])

    const handleSelect = (e) => {
        setRating(e.target.value);
    };

    const handleChange = (e) => {
        setFeedBack(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log('a')
        setHasSubmitted(true);
        if(rating == null) {
            alert('You must assign a rating to the tutor')
        } else {
            const submissionData = {
                lessonID: lessonID,
                rating: rating,
                feedback: feedBack,
                studentID: user.id
            }

            axios
                .post("/tutors/giveFeedback", submissionData)
                .then(res => {
                    console.log(res);
                    setHasSubmitted(true);
                    props.history.push("/pastLessons")
                })
                .catch(err => console.log(err))
        }
    };

    return(
        <Paper>
            <Typography variant="h5">Rating: </Typography>
            <Select value={rating} onChange={handleSelect}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>

            <br />
            <br />

            <Typography variant="h5">Feedback:</Typography>
            <br />
            <TextField onChange={handleChange} value={feedBack} />
            <br />
            <br />
            <Button onClick={handleSubmit} disabled={rating == null}>Submit Feedback</Button>

            
        </Paper>
    )
    
}



export default Feedback;