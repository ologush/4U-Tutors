import React, { Component, useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const dateOptions = { weekday: "long", month: "long", day: "numeric" };
const timeOptions = { hour: "numeric", minute: "numeric" };

// class BookingPage extends Component {
//     constructor() {
//         super();

//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.onChange = this.onChange.bind(this);

//         this.state = {
//             dateAndTime: ""
//         };
//     }

    


//     handleSubmit(e) {
//         e.preventDefault();

//         console.log(this.props);

//         const submissionData = {
//             tutorID: this.props.auth.user.id,
//             date: e.target.id,
//             postingID: this.props.posting._id,
//             tutorName: this.props.auth.user.name,
//             nextDates: "a", //have to figure out how this is determined
//             otherStudentIDs: this.props.posting.otherStudentIDs,
//             tutorDescription: this.props.auth.user.description,
//             tutorRating: this.props.auth.user.rating
//         };

//         console.log(submissionData);

//         // axios
//         //     .post("/match/setMatch", submissionData)
//         //     .then(res => {
//         //         window.location.href = "/myLessons"
//         //     })
//         //     .catch(err => console.log(err))

//         axios
//             .post("/match/addBid", submissionData)
//             .then(res => {
//                 window.location.href = "/myBids"
//             })
//             .catch(err => console.log(err))

        
//     }

//     onChange(e) {

//         this.setState({ [e.target.id]: e.target.value});

//     }

//     render() {
//         return(
//             <div>
//                 <Typography variant="h2">Book a Lesson</Typography>

//                 <Typography variant="h4">{this.props.posting.course}</Typography>
//                 <Typography variant="h4">{this.props.posting.description}</Typography>
//                 <Typography variant="h4">{this.props.posting.studentName}</Typography>

                

                
//                 {this.props.posting.availableTimes.map(time => (
//                     <div>
//                         {console.log(typeof time)}
//                         <Typography variant="h5">{time}</Typography>
//                         <button id={time} onClick={this.handleSubmit}>Book</button>
//                     </div>
//                 ))}

//             </div>
//         );
//     }
// }

function BookingPage(props) {

    const { postingID } = props.match.params;

    const [posting, setPosting] = useState({});
    const [hasPosting, setHasPosting] = useState(false);
    const [user, setUser] = useState(useSelector(state => state.auth.user));

    useEffect(() => {
        axios
        .get("/match/postingByID", { params: { postingID: postingID }})
        .then(res => {
            setPosting(res.data);
            setHasPosting(true);
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (date) => {
        const submissionData = {
            tutorID: user.id,
            date: date,
            postingID: posting._id,
            tutorName: user.name,
            otherStudentIDs: posting.otherStudentIDs,
            tutorDescription: user.description,
            tutorRating: user.rating
        };

        axios
        .post("/match/addBid", submissionData)
        .then(res => {
            window.location.href = "/myBids";
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
        {
            hasPosting ? (
                <div>
                    <Typography variant="h3">Submit a Bid</Typography>
                    <Typography variant="h5">Course: {posting.course}</Typography>
                    <Typography variant="h5">Student Name: {posting.studentName}</Typography>
                    <Typography variant="h5">Description: {posting.description}</Typography>

                    {
                        posting.availableTimes.map((time, index) => {
                            const date = new Date(time);

                            return (
                                <div>
                                    <Typography variant="h5">{date.toLocaleDateString("en-US", dateOptions)} {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
                                    <Button onClick={() => handleSubmit(date)}>Select</Button>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                <Typography variant="h5">Loading...</Typography>
            )
        }
        </div>
    )
}

// BookingPage.propTypes = {
//     auth: PropTypes.object.isRequired,
//     posting: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth,
//     posting: state.booking.posting
// });

// export default connect(
//     mapStateToProps
// )(withRouter(BookingPage));

export default BookingPage;