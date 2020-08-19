import React, { useState, useEffect } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import PastLesson from "./PastLesson"
import { useSelector } from 'react-redux'
import Typography from "@material-ui/core/Typography"

const timeOptions = { hour: "numeric", minute: "numeric"}
const dateOptions = { weekday: "long", month: "long", day: "numeric"}

function PastLessons(props) {

    //const user = useSelector(state => state.auth.user._id);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [pastLessons, setPastLessons] = useState([]);
    const [hasPastLessons, setHasPastLessons] = useState(false);

    useEffect(() => {
        axios
            .get("/users/getPastLessons", { params: { studentID: user.id } })
            .then(res => {
                if(res.data.length > 0) {
                    setPastLessons(res.data);
                    setHasPastLessons(true)
                }
            })
            .catch(err => console.log(err))
    }, []);

    const onRequest = (tutorID) => {
        window.location.href = "/request/" + tutorID;
    };

    const complain = (id) => {
        window.location.href = "/complain/" + id;
    };




    return(
        hasPastLessons ? (
            <Grid container spacing={2}>
            {
                pastLessons.map((lesson, index) => {
                    const date = new Date(lesson.date);
                    const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);
                    return (
                        <Grid item xs={4}>
                            <PastLesson 
                                tutorEmail={lesson.tutorEmail}
                                date={dateString}
                                onRequest={() => onRequest(lesson.tutorID)}
                                complain={() => complain(lesson._id)}
                            />
                        </Grid>
                    )

                    
                })
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