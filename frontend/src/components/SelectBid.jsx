import React, { Component } from 'react'
import axios from "axios"
import Grid from "@material-ui/core/Grid"
import BidCard from "./BidCard"
import Payment from "./Payment"

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
            hasSelected: true
        })
    }

    render() {
        
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
                                    submit={this.selectBid}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            ) : (
                <Payment />
            )
        
        
        );
    }
}

export default SelectBid;