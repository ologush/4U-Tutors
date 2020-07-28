import React, { Component } from 'react'

import axios from "axios";
import { connect } from 'react-redux'
import Typography from "@material-ui/core/Typography"

import Button from "@material-ui/core/Button"

import PropTypes from "prop-types";

import { enterBooking } from "../actions/lessonActions";


import { Link, withRouter } from 'react-router-dom'

class FindPostings extends Component {
    constructor() {
        super();

        this.state = {
            postings: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(postingID) {

        //e.preventDefault();

        

        //this.props.enterBooking(this.state.postings[e.target.id]);

        this.props.history.push('/booking/' + postingID);



    }

    componentWillMount() {

        //Accesses the db twice
        
        axios
            .get("/match/getPostings")
            .then(res => {
                console.log(res);
                this.setState({
                    postings: res.data
                });
            })
            .catch(err => console.log(err))


    }

    render() {
        return(
            <div>
                <Typography variant="h2">Welcome to the postings page</Typography>

                {this.state.postings.map((posting, index) => (
                    <div>
                        <Typography variant="h3">Course: {posting.course}</Typography>
                        <Typography variant="h3">Grade: {posting.year}</Typography>
                        <Typography variant="h4">Description: {posting.description}</Typography>
                        
                        <Button variant="contained" color="primary" onClick={() => this.handleSubmit(posting._id)}>Schedule a Time</Button>
                    </div>
                ))}
            </div>
        );
    }
};

FindPostings.propTypes = {
    auth: PropTypes.object.isRequired,
    enterBooking: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { enterBooking }
)(withRouter(FindPostings));