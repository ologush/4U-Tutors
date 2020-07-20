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
            date: e.target.id,
            postingID: this.props.posting._id,
            tutorName: this.props.auth.user.name,
            nextDates: "a", //have to figure out how this is determined
            otherStudentIDs: this.props.posting.otherStudentIDs,
            tutorDescription: this.props.auth.user.description,
            tutorRating: this.props.auth.tutor.rating
        };

        console.log(submissionData);

        // axios
        //     .post("/match/setMatch", submissionData)
        //     .then(res => {
        //         window.location.href = "/myLessons"
        //     })
        //     .catch(err => console.log(err))

        axios
            .post("/match/addBid", submissionData)
            .then(res => {
                window.location.href = "/myBids"
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

                

                
                {this.props.posting.availableTimes.map(time => (
                    <div>
                        {console.log(typeof time)}
                        <Typography variant="h5">{time}</Typography>
                        <button id={time} onClick={this.handleSubmit}>Book</button>
                    </div>
                ))}

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