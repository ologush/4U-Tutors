import React, { useState } from 'react'
import Grid from "@material-ui/core/Grid"
import ReBook from "./ReBook"
import Feedback from "./Feedback"
import { endLesson } from "../actions/lessonActions"
import { useSelector, useDispatch } from "react-redux"


function PostLesson(props) {
    const { lessonID } = props.match.params

    const [rating, setRating] = useState(null);
    const [feedBack, setFeedBack] = useState("");
    


    return(
        <Grid container>
            <Grid item xs={6}>
                <Feedback lessonID={lessonID}/>
            </Grid>
            <Grid item xs={6}>
                <ReBook />
            </Grid>
        </Grid>
    )
}

export default PostLesson;