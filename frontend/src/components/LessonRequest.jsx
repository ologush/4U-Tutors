import React, { useState, useEffect } from 'react'
import TutorFinder from "./TutorFinder"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import MultipleDateTimePicker from "./MultipleDateTimePicker"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"

function LessonRequest(props) {

    const [tutor, setTutor] = useState({});
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [dates, setDates] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [loading, setLoading] = useState(true);
    const [fromPastLesson, setFromPastLesson] = useState(false);

    const addTutor = (tutorToAdd) => {
        setTutor(tutorToAdd)
    };

    const addDate = (dateToAdd) => {
        setDates(prevState => {
            return [...prevState, dateToAdd]
        });
    }

    const removeDate = (dateToRemove) => {
        setDates(prevState => {
            return prevState.filter(date => {
                return dateToRemove.valueOf() != date.valueOf();
            });
        });
    }

    useEffect(() => {
        if(props.match.params.tutorID) {
            const { tutorID } = props.match.params;
            

            axios
            .get("/users/getTutorByID", { params: { tutorID: tutorID } })
            .then(res => {
                console.log(res.data)
                setFromPastLesson(true);
                setTutor(res.data);
                setLoading(false);
                
            })
            .catch(err => console.log(err));
        } else {
            setLoading(false);
        }
    }, [])

    const sendRequest = () => {
        const data = {
            studentID: user.id,
            studentName: user.name,
            tutorID: tutor._id,
            studentEmail: user.email,
            tutorEmail: tutor.email,
            availableTimes: dates,
            course: course,
            description: description,
            tutorName: tutor.name
        }

        console.log(data)

        axios
        .post("/lesson/addRequest", data)
        .then(res => {
            props.history.push("/myRequests");
        })
        .catch(err => console.log(err))
    }

    

    return(
        <div>
        {
            !loading ? (
                <Grid container spacing={2} direction="column">
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={4}>
                    <Paper>
                        <TutorFinder onEnter={addTutor} fromPastLesson={fromPastLesson} existingEmail={tutor.email} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <TextField label="Course" onChange={(e) => setCourse(e.target.value)} value={course} />

                        <br />
                        <br />

                        <TextField label="Description" fullWidth multiline rows={6} onChange={(e) => setDescription(e.target.value)} value={description} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <MultipleDateTimePicker 
                            addDate={addDate}
                            removeDate={removeDate}
                            alreadySelectedDates={dates}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={sendRequest}>Submit Request</Button>
            </Grid>
        </Grid> 
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </div>
    )
}

export default LessonRequest;