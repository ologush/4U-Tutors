import React, { useState, useEffect } from 'react'
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import axios from "axios"

//Need to make sure passwords match


function Apply(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [description, setDescription] = useState("");
    const [reason, setReason] = useState("");

    const onSubmit = (e) => {
        console.log("aaaa")
        e.preventDefault();
        const submissionData = {
            name: name,
            email: email,
            password: password,
            password2: password2,
            description: description,
            applicationReason: reason
        }
        console.log(submissionData)
        axios
        .post("/tutors/apply", submissionData)
        .then(res => {
            console.log(res);
            props.history.push("/applied");
        })
        .catch(err => console.log(err));
    };

    return (
        <Paper padding={2}>
            <form onSubmit={onSubmit}>
            <Typography variant="h2">Welcome to the tutor application page</Typography>
            <Divider />
            <br />
            <Typography variant="h6" align="left">
                Please enter your information on the application page.
                Your answers will be recorded and we will review your application in the next 48 hours.
                If we determine you to be a good fit you will recieve an email informing you. If not we will also send an email.
                Your password will be hashed and stored securely so we will never see it.
            </Typography>
            <br />
            <Divider />
            <TextField onChange={(e) => setName(e.target.value)} required id="name" label="Name" fullWidth />
            <br />
            <TextField onChange={(e) => setEmail(e.target.value)} required id="email" label="Email" fullWidth />
            <br />
            <TextField onChange={(e) => setPassword(e.target.value)} required id="password" label="Password" type="password" fullWidth />
            <br />
            <TextField onChange={(e) => setPassword2(e.target.value)} required id="password2" label="Confirm Password" type="password" fullWidth />
            <br />
            <Divider />
            <br />
            <Typography variant="h6" align="left">
                Please provide a detailed description about yourself. For example your strong subjects in school, qualification/recognition of academic success, interests and hobbies, and anyting else that you think is important!
            </Typography>
            <TextField onChange={(e) => setDescription(e.target.value)} required id="description" label="Please Provide a detailed description" fullWidth multiline rows={6} />
            <Divider />
            <br />
            <Typography variant="h6" align="left">
                Please write several sentences on why you want to become a tutor on the website.
            </Typography>
            <TextField onChange={(e) => setReason(e.target.value)} required label="Provide your reasons on wanting to become a tutor" id="reason" fullWidth multiline rows={6} />
            <br />
            <Divider />
            <br />
            <Button variant="contained" type="Submit">Apply!</Button>
            <br />
            </form>
        </Paper>
    )
}

export default Apply;