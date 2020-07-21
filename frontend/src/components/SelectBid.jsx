import React, { Component } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import BidCard from "./BidCard"
import Payment from "./Payment"
import PayPalBtn from "./PayPalBtn"

class SelectBid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bids: [],
            hasSelected: false,
            bidSelected: null
        }

        console.log(this.props.params)

        this.selectBid = this.selectBid.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onPay = this.onPay.bind(this);
        
    }

    componentWillMount() {
       const { postingID } = this.props.match.params;
        

        axios
            .post("/match/getBids", { postingID: postingID })
            .then(res => {
               this.setState({
                   bids: res.data
               })


                
            })
            .catch(err => console.log(err))
    }

    selectBid(bid) {
        this.setState({
            hasSelected: true,
            bidSelected: bid
        })
    }

    onCancel() {
        this.setState({
            hasSelected: false,
            bidSelected: null
        })
    }

    onPay() {
        const submissionData = {
            tutorID: this.state.bidSelected.tutorID,
            dateAndTime: this.state.bidSelected.date,
            tutorName: this.state.bidSelected.tutorName,
            postingID: this.state.bidSelected.postingID
        }

        console.log(submissionData);

        axios
            .post("/match/selectBid", submissionData)
            .then(res => {
                console.log(res);
                window.location.href = "/displayLessons"
            })
            .catch(err => console.log(err))

    }

    render() {

        if(this.state.hasSelected) {
            console.log(this.state.bidSelected)
        } 
        
        return(
            
            !this.state.hasSelected ? (
                <Grid container>
                {
                    this.state.bids.map((bid, index) => {
                        console.log(bid);
                        return(
                            <Grid item xs={4}>
                                <BidCard 
                                    tutorRating={bid.tutorRating}
                                    tutorDescription={bid.tutorDescription}
                                    tutorName={bid.tutorName}
                                    index={index}
                                    date={bid.date}
                                    submit={() => this.selectBid(bid)}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            ) : (
                <PayPalBtn 
                    amount={25}
                    onSuccess={this.onPay}
                    cancel={this.onCancel}

                />
            )
        
        
        );
    }
}

export default SelectBid;