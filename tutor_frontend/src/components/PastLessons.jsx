import React, { useState, useEffect } from 'react'
import PastLessonCard from "./PastLessonCard"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"

const dateOptions = { weekday: "long", month: "long", day: "numeric" }
const timeOptions = { hour: "numeric", minute: "numeric"}

function PastLessons(props) {
    
    const [pastLessons, setPastLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(useSelector(state => state.auth.user));

    useEffect(() => {
        axios
        .get("/tutors/getFeedback", { params: { tutorID: user.id } })
        .then(res => {
            setPastLessons(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);


    return (
        <Grid container spacing={2}>
        {
            !loading ? (
                pastLessons.map(pastLesson => {

                    const date = new Date(pastLesson.dateAndTime);
                    const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);

                    return (
                        <Grid item xs={4}>
                            <PastLessonCard 
                                course={pastLesson.course}
                                description={pastLesson.description}
                                dateString={dateString}
                                rating={pastLesson.rating}
                                feedback={pastLesson.feedback}
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

export default PastLessons;