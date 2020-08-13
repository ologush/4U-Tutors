import React, { useState, useEffect } from 'react'

import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { useSelector } from "react-redux"
import PendingLesson from "./PendingLesson"
import Typography from "@material-ui/core/Typography"
const dateOptions = { weekday: "long", month: "long", day: "numeric"}
const timeOptions = { hour: "numeric", minute: "numeric"}

function LessonsPending(props) {

    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [pendingLessons, setPendingLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(user);
        axios
        .get("/lesson/tutor/getPendingLessons", { params: { tutorID: user.id } })
        .then(res => {
            setPendingLessons(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <Grid container spacing={2}>
        {
            !loading ? (
                pendingLessons.map((pending) => {
                    let date = new Date(pending.dateAndTime);
                    let dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);
                    
                    return (
                        <Grid item xs={4}>
                            <PendingLesson 
                                dateString={dateString}
                                description={pending.description}
                                course={pending.subject}
                            />
                        </Grid>
                    )
                })
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </Grid>
    )
}

export default LessonsPending;