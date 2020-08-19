import React, { useState, useEffect } from 'react'
import axios from "axios"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import { useSelector } from "react-redux"

import RequestCard from "./RequestCard"


function Requests(props) {

    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [noRequests, setNoRequests] = useState(true);


    useEffect(() => {
        axios
        .get("/tutors/getRequests", { params: { tutorID: user.id}})
        .then(res => {
            setNoRequests(false);
            setRequests(res.data);
        })
        .catch(err => console.log(err))
    }, [])


    const enterRequest = (requestID) => {
        window.location.href = "/request/" + requestID;
    }

    const declineRequest = (requestID) => {
        axios
        .post("/tutors/denyRequest", { requestID: requestID })
        .then(res => {
            
            console.log(res);
        })
        .catch(err => {
            console.log('a')
            //setNoRequests(true);
            console.log(err);
        })

    }


    return(
        <Grid container spacing={4}>
            {
                !noRequests ? (
                    requests.map((request, index) => (
                        <Grid item xs={4}>
                            
                            <RequestCard 
                                course={request.course}
                                description={request.description}
                                decline={() => declineRequest(request._id)}
                                enterRequest={() => enterRequest(request._id)}
                                type={request.type}
                                payout={request.payout}
                            />
                        </Grid>
                    ))

                 ) : (
                    <Typography variant="h4">You have no lesson requests</Typography>
                 )

                
                
            }
        </Grid>
    )
}

export default Requests;