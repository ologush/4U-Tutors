import React, { Component, useEffect, useState } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import BidCard from "./BidCard"
import Payment from "./Payment"
import PayPalBtn from "./PayPalBtn"
import Typography from "@material-ui/core/Typography"
import CardSection from "./CardSection"
import { useElements, CardElement, useStripe } from "@stripe/react-stripe-js"


// class SelectBid extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             bids: [],
//             hasSelected: false,
//             bidSelected: null
//         }

//         console.log(this.props.params)

//         this.selectBid = this.selectBid.bind(this);
//         this.onCancel = this.onCancel.bind(this);
//         this.onPay = this.onPay.bind(this);
        
//     }

//     componentWillMount() {
//        const { postingID } = this.props.match.params;
        

//         axios
//             .post("/match/getBids", { postingID: postingID })
//             .then(res => {
//                this.setState({
//                    bids: res.data
//                })


                
//             })
//             .catch(err => console.log(err))
//     }

//     selectBid(bid) {
//         this.setState({
//             hasSelected: true,
//             bidSelected: bid
//         })
//     }

//     onCancel() {
//         this.setState({
//             hasSelected: false,
//             bidSelected: null
//         })
//     }

//     onPay() {
//         const submissionData = {
//             tutorID: this.state.bidSelected.tutorID,
//             dateAndTime: this.state.bidSelected.date,
//             tutorName: this.state.bidSelected.tutorName,
//             postingID: this.state.bidSelected.postingID
//         }

//         console.log(submissionData);

//         axios
//             .post("/match/selectBid", submissionData)
//             .then(res => {
//                 console.log(res);
//                 window.location.href = "/displayLessons"
//             })
//             .catch(err => console.log(err))

//     }

//     render() {

//         if(this.state.hasSelected) {
//             console.log(this.state.bidSelected)
//         }
        
//         return(
            
//             !this.state.hasSelected ? (
//                 <Grid container>
//                 {
//                     this.state.bids.map((bid, index) => {
//                         console.log(bid);
//                         return(
//                             <Grid item xs={4}>
//                                 <BidCard 
//                                     tutorRating={bid.tutorRating}
//                                     tutorDescription={bid.tutorDescription}
//                                     tutorName={bid.tutorName}
//                                     index={index}
//                                     date={bid.date}
//                                     submit={() => this.selectBid(bid)}
//                                 />
//                             </Grid>
//                         )
//                     })
//                 }
//             </Grid>
//             ) : (
//                 <PayPalBtn 
//                     amount={25}
//                     onSuccess={this.onPay}
//                     cancel={this.onCancel}

//                 />
//             )
        
        
//         );
//     }
// }

function SelectBid(props) {
    
    const { postingID } = props.match.params;
    const [bids, setBids] = useState([]);
    const [hasBids, setHasBids] = useState(false);
    const [bidSelected, setBidSelected] = useState({});
    const [hasSelectedBid, setHasSelectedBid] = useState(false);

    useEffect(() => {
        axios
        .post("/match/getBids", { postingID: postingID })
        .then(res => {
            setBids(res.data);
            setHasBids(true);
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
            console.log(res);
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