import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"


class BookingPage extends Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            dateAndTime: ""
        };
    }


    handleSubmit(e) {
        e.preventDefault();

        console.log(this.props);

        const submissionData = {
            tutorID: this.props.auth.user.id,
            dateAndTime: this.state.dateAndTime,
            postingID: this.props.posting._id,
            tutorName: this.props.auth.user.name
        };

        console.log(submissionData);

        axios
            .post("/match/setMatch", submissionData)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    onChange(e) {

        this.setState({ [e.target.id]: e.target.value});

    }

    render() {
        return(
            <div>
                <Typography variant="h2">Book a Lesson</Typography>

                <Typography variant="h4">{this.props.posting.course}</Typography>
                <Typography variant="h4">{this.props.posting.description}</Typography>
                <Typography variant="h4">{this.props.posting.studentName}</Typography>

                <TextField onChange={this.onChange} id="dateAndTime" label="Date and Time" />

                <button onClick={this.handleSubmit}>Book!</button>

            </div>
        );
    }
}

BookingPage.propTypes = {
    auth: PropTypes.object.isRequired,
    posting: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    posting: state.booking.posting
});

export default connect(
    mapStateToProps
)(withRouter(BookingPage));