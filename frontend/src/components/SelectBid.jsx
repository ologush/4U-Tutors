import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import BidCard from "./BidCard"
import Payment from "./Payment"
import PayPalBtn from "./PayPalBtn"
import Typography from "@material-ui/core/Typography"
import CardSection from "./CardSection"
import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js"




function SelectBid(props) {
    
    const { postingID } = props.match.params;
    const [bids, setBids] = useState([]);
    const [hasBids, setHasBids] = useState(false);
    const [bidSelected, setBidSelected] = useState({});
    const [hasSelectedBid, setHasSelectedBid] = useState(false);
    const [posting, setPosting] = useState({});

    useEffect(() => {
        axios
        .post("/match/getBids", { postingID: postingID })
        .then(res => {
            setBids(res.data);
            setHasBids(true);
        })
        .catch(err => console.log(err))

        axios
        .get("/match/user/postingByID", { params: { postingID: postingID } })
        .then(res => {
            setPosting(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    const selectBid = (bid) => {
        setBidSelected(bid);
        setHasSelectedBid(true);
    };

    const onPay = () => {
        const submissionData = {
            tutorID: bidSelected.tutorID,
            dateAndTime: bidSelected.date,
            tutorName: bidSelected.tutorName,
            postingID: bidSelected.postingID
        };

        axios
        .post("/match/selectBid", submissionData)
        .then(res => {
            
            window.location.href = "/displayLessons"
        })
        .catch(err => console.log(err))
    }


    return(
        <div>
        {
            hasSelectedBid ? (
                
                <Payment 
                    onPay={onPay}
                    cost={posting.cost}
                    date={new Date(bidSelected.date)}
                    course={posting.course}
                />
            ) : (
                <div>
                {
                    hasBids ? (
                        <Grid container>
                        {
                            bids.map((bid, index) => (
                                <Grid item xs={4}>
                                    <BidCard 
                                        tutorRating={bid.tutorRating}
                                        tutorDescription={bid.tutorDescription}
                                        tutorName={bid.tutorName}
                                        index={index}
                                        date={bid.date}
                                        submit={() => selectBid(bid)}
                                    />
                                </Grid>
                            ))
                        }
                        </Grid>
                    ) : (
                        <Typography variant="h5"> Loading... </Typography>
                    )
                }
                </div>
            )
        }
        
        </div>
    )
}

export default SelectBid;