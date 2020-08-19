import React, { Component, useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import BookingCard from "./BookingCard"
import Paper from "@material-ui/core/Paper"

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
    const [unavailableTimes, setUnavailableTimes] = useState([]);

    useEffect(() => {
        axios
        .get("/match/tutor/postingByID", { params: { postingID: postingID }})
        .then(res => {
            setPosting(res.data);
            setHasPosting(true);
        })
        .catch(err => console.log(err));

        axios
        .get("/tutors/unavailableTimes", { params: { tutorID: user.id } })
        .then(res => {
            setUnavailableTimes(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, []);

    const handleSubmit = (date) => {
        const submissionData = {
            tutorID: user.id,
            date: date,
            postingID: posting._id,
            tutorName: user.name,
            otherStudentIDs: posting.otherStudentIDs,
            tutorDescription: user.description,
            tutorRating: user.rating,
            description: posting.description,
            course: posting.course
        };

        axios
        .post("/match/addBid", submissionData)
        .then(res => {
            window.location.href = "/myBids";
        })
        .catch(err => console.log(err))
    };

    const isConflict = (date) => {

        
        let conflict = false;

         unavailableTimes.forEach( (time, index) => {
            const unavailable = new Date(time);
            console.log('a')
            if(date.getTime() >= unavailable.getTime() && date.getTime() <= (unavailable.getTime() + 3600000)) {
                console.log(date);
                console.log(unavailable);
                console.log(index)
                console.log('conflict');
                console.log("conflict at: " + unavailable.toLocaleDateString("en-CA", dateOptions) + ", " + unavailable.toLocaleTimeString("en-CA", timeOptions))
                conflict = true;
                return;
            } else {
                console.log("no conflict")
            }
        })
        
        

        return conflict;
    }

    return(
        // <div>
        // {
        //     hasPosting ? (
        //         <div>
        //             <Typography variant="h3">Submit a Bid</Typography>
        //             <Typography variant="h5">Course: {posting.course}</Typography>
        //             <Typography variant="h5">Student Name: {posting.studentName}</Typography>
        //             <Typography variant="h5">Description: {posting.description}</Typography>

        //             {
        //                 posting.availableTimes.map((time, index) => {
        //                     const date = new Date(time);

        //                     return (
        //                         <div>
        //                             <Typography variant="h5">{date.toLocaleDateString("en-US", dateOptions)} {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
        //                             <Button onClick={() => handleSubmit(date)} disabled={isConflict(date)}>Select</Button>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>
        //     ) : (
        //         <Typography variant="h5">Loading...</Typography>
        //     )
        // }
        // </div>
        <div>
        {
            hasPosting ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <Typography variant="h5">Select a time you are available</Typography>
                            <Typography variant="h5">Course: {posting.course}</Typography>
                            <Typography variant="body1">Description: {posting.description}</Typography>
                        </Paper>
                    </Grid>
                    {
                        posting.availableTimes.map((time, index) => {
                            const date = new Date(time);
                            const dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);

                            return (
                                <Grid item xs={4}>
                                <BookingCard 
                                    dateString={dateString}
                                    onSubmit={() => handleSubmit(date)}
                                    disabled={isConflict(date)}
                                />
                                </Grid>
                            )
                        })
                    }
                    
                </Grid>
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