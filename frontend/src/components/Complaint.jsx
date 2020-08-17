import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import { useSelector } from "react-redux"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Button from "@material-ui/core/Button"
import axios from "axios"
import InputLabel from "@material-ui/core/InputLabel"


const complaintOptions = [
    "Tutor Did Not Show",
    "Tutor Lacked Expertise",
    "Poor Connection"
]

function Complaint(props) {

    const { pastLessonID } = props.match.params;

    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [complaint, setComplaint] = useState("");
    const [complaintType, setComplaintType] = useState("");
    const [pastLesson, setPastLesson] = useState({});
    const [loading, setLoading] = useState(true);

    const handleComplaint = (e) => {
    
        setComplaint(e.target.value);

    }

    const handleSelect = (e) => {
        setComplaintType(e.target.value);
    }

    const handleSubmit = (e) => {
        const submissionData = {
            pastLessonID: pastLessonID,
            studentID: user.id,
            studentEmail: user.email,
            tutorID: pastLesson.tutorID,
            tutorEmail: pastLesson.tutorEmail,
            complaintType: complaintType,
            complaint: complaint
        }

        axios
        .post("/users/submitComplaint", submissionData)
        .then(res => {
            props.history.push("/ComplaintSuccessful");
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        axios
        .get("/users/getPastLessonByID", { params: { pastLessonID: pastLessonID } })
        .then(res => {
            setPastLesson(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [])



    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">Course: {pastLesson.course}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        File a Complaint
                    </Typography>
                    
                    <TextField value={complaint} onChange={handleComplaint} fullWidth />

                    <FormControl>
                       
                        
                        <InputLabel>Complaint Type</InputLabel>
                        <Select 
                            value={complaintType}
                            onChange={handleSelect}
                        >
                            {
                                complaintOptions.map(complaint => (
                                    <MenuItem value={complaint}>{complaint}</MenuItem>
                                ))
                            }
                        </Select>
                        <br />
                        <Button onClick={handleSubmit}>Submit Complaint</Button>
                    </FormControl>
                    

                </Paper>
            </Grid>
        </Grid>
    )

}

export default Complaint;