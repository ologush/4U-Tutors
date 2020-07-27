import React, { useState, useEffect } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import PastLesson from "./PastLesson"
import { useSelector } from 'react-redux'
import Typography from "@material-ui/core/Typography"

function PastLessons(props) {

    const user = useSelector(state => state.auth.user._id);
    const [pastLessons, setPastLessons] = useState([]);
    const [hasPastLessons, setHasPastLessons] = useState(false);

    useEffect(() => {
        axios
            .get("users/getPastLessons", { studentID: user})
            .then(res => {
                if(res.data.length > 0) {
                    setPastLessons(res.data);
                    setHasPastLessons(true)
                }
            })
            .catch(err => console.log(err))
    }, []);

    const onRequest = (id) => {
        window.location.href = "/request/" + id
    };

    const complain = (id) => {
        window.location.href = "/complain/" + id;
    };




    return(
        hasPastLessons ? (
            <Grid container>
            {
                pastLessons.map((lesson, index) => (
                    <Grid item xs={4}>
                        <PastLesson 
                            tutorName={lesson.tutorName}
                            date={lesson.date}
                            onRequest={() => onRequest(lesson._id)}
                            complain={() => complain(lesson._id)}
                        />
                    </Grid>
                ))
            }
            </Grid>
        ) : (
            <Typography varaint="h5">
                You have no past lessons, go to the make posting page to get started.
            </Typography>
        )
        
    )
}

export default PastLessons;