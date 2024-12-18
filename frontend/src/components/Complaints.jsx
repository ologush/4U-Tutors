import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useSelector } from "react-redux"
import ComplaintCard from "./ComplaintCard"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const dateOptions = { month: "long", weekday: "long", day: "numeric"}
const timeOptions = { hour: "numeric", minute: "numeric"}

function Complaints(props) {

    const [loading, setLoading] = useState(true);
    const [complaints, setComplaints] = useState([]);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [hasComplaints, setHasComplaints] = useState(false);

    useEffect(() => {
        axios
        .get("/users/getComplaints", { params: { studentID: user.id } })
        .then(res => {
            
            if(res.data.length > 0) {
                setComplaints(res.data);
                setHasComplaints(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <Grid container spacing={2}>
            {
                !loading ? (
                    complaints.map(complaint => {
                        const date = new Date(complaint.dateSubmitted);
                        const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);

                        return (
                            <Grid item xs={4}>
                                <ComplaintCard 
                                    dateString={dateString}
                                    tutorEmail={complaint.tutorEmail}
                                    complaintType={complaint.complaintType}
                                    complaint={complaint.complaint}
                                />
                            </Grid>
                        )
                    }),
                    !hasComplaints && <Typography variant="h5">You have not filed any complaints, go to your past lessons to file a complaint</Typography>
                ) : (
                    <Typography variant="h5">Loading...</Typography>
                )
            }
        </Grid>
    )

}

export default Complaints;