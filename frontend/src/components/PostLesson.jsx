import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid"
import ReBook from "./ReBook"
import Feedback from "./Feedback"
import { endLesson } from "../actions/lessonActions"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"


function PostLesson(props) {
    const { lessonID } = props.match.params

    const [rating, setRating] = useState(null);
    const [feedBack, setFeedBack] = useState("");
    
    //may implement a rebook feature, for now wont;

    useEffect(() => {
        
    }, [])

    return(
        <Grid container>
            <Grid item xs={6}>
                <Feedback lessonID={lessonID}/>
            </Grid>
            
        </Grid>
    )
}

export default PostLesson;