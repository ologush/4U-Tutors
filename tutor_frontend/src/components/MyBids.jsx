import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Bid from "./Bid"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: theme.spacing(2)
    }
}))

const dateOptions = { weekday: "long", month: "long", day: "numeric" };
const timeOptions = { hour: "numeric", minute: "numeric" };
function MyBids(props) {

    const classes = useStyles();

    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get("/tutors/getBids", { params: { tutorID: user.id}})
        .then(res => {
            setBids(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, []);

    const deleteBid = (bidID) => {
        axios
        .post("/tutors/deleteBid", { bidID: bidID })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
        {
            loading ? (
                <Typography variant="h4">Loading...</Typography>
            ) : (
                <Grid container spacing={2}>
                    {
                        bids.map((bid, index) => {
                            const date = new Date(bid.date);
                            const dateString = date.toLocaleDateString("en-US", dateOptions) + " " + date.toLocaleTimeString("en-US", timeOptions);

                            // return(
                            //     <Grid item xs={4}>
                            //         <Typography variant="h4">Need to update the bid schema to add more relevant information</Typography>
                            //         <Typography variant="h4">{date.toLocaleDateString("en-US", dateOptions)} {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
                            //         <Button variant="contained" color="secondary" onClick={() => deleteBid(bid._id)}>Delete</Button>
                            //     </Grid>
                            // )
                            return (
                                <Grid item xs={4}>
                                <Bid
                                    course="Need to add to schema"
                                    description="Need to add to schema"
                                    time={dateString}
                                    cancel={() => deleteBid(bid._id)} 
                                />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            )
        }
        </div>
    )
}

export default MyBids;