import React, { useState } from 'react'
import TutorFinder from "./TutorFinder"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import MultipleDateTimePicker from "./MultipleDateTimePicker"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { useSelector } from "react-redux"

function LessonRequest(props) {

    const [tutor, setTutor] = useState({});
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");
    const [dates, setDates] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user))

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
                return dateToRemove != date;
            });
        });
    }

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

    let newReturn = (
        <Grid container spacing={2} direction="column">
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={4}>
                    <Paper>
                        <TutorFinder onEnter={addTutor} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <TextField label="Course" onChange={(e) => setCourse(e.target.value)} value={course} />
                        <TextField label="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
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
                <Button fullWidth variant="contained">Submit Request</Button>
            </Grid>
        </Grid> 
    )

    let oldReturn = (

        <Grid container>
            <Grid item xs={4}>
                <TutorFinder onEnter={addTutor} />
            </Grid>
            <Grid item xs={4}>
                <Paper>
                <TextField label="Course" onChange={(e) => setCourse(e.target.value)} value={course} />

                <br />
                <br />

                <TextField label="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
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
            <Button onClick={sendRequest}>Submit Request</Button>
        </Grid>

    )

    return(
        newReturn
    )
}

export default LessonRequest;