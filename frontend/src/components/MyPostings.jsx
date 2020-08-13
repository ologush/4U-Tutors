import React, { Component, useState, useEffect } from 'react'
import axios from "axios";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button"

import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';

import { Link, withRouter } from 'react-router-dom'

import Grid from "@material-ui/core/Grid"

import Posting from "./Posting";

// class MyPostings extends Component {
//     constructor() {
//         super();

//         this.state = {
//             postings: []
//         };

//         this.handleDelete = this.handleDelete.bind(this);
        
//     }

//     componentWillMount() {

//         axios
//             .post("/users/getPostings", { studentID: this.props.auth.user.id})
//             .then(res => {
//                 console.log(res.data);
//                 this.setState({
//                     postings: res.data
//                 });
//             })
//             .catch(err => console.log(err))
            
//     }

//     handleDelete(e) {

        
//         axios
//             .post("/users/deletePosting", { postingID: this.state.postings[e.target.id]._id} )
//             .then(res => {
//                 window.location.reload();
//             })
//             .catch(err => console.log(err));
//     }

//     handleEdit(postingID) {
//         window.location.href = "/editPosting/" + postingID;
//     }

    


//     render() {
//         return(
//             <div>
//                 <Typography variant="h1">This is your postings page</Typography>
//                 {this.state.postings.map((posting, index) => (
//                     <div>
//                         {console.log(this.state.postings)}
//                         <Typography variant="h2">Course: {posting.course}</Typography>
//                         <Typography variant="h2">Tags: {posting.tags}</Typography>
//                         <Typography variant="h2">Description: {posting.description}</Typography>
//                         <Typography variant="h2">Year: {posting.year}</Typography>
//                         <button id={index} name="delete" onClick={this.handleDelete}>Delete</button>
//                         <Link to={{
//                             pathname: "/makePosting",
//                             posting: this.state.postings[index]
//                         }}>
//                             <button id={index} name="edit">Edit</button>
//                         </Link>
//                         <Button onClick={() => this.props.history.push("/editPosting/" + posting._id)}>Edit</Button>
//                         <Link to={{
//                             pathname: "/selectBid/" + this.state.postings[index]._id
//                         }}>
//                             <button id={index} name="bids">Select Bid</button>
//                         </Link>
                        
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }

function MyPostings(props) {
    
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(useSelector(state => state.auth.user));

    useEffect(() => {
        axios
        .post("/users/getPostings", { studentID: user.id})
        .then(res => {
            console.log(res.data);
            setPostings(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
    }, []);

    const handleDelete = (postingID) => {
        axios
        .post("/users/deletePosting", { postingID: postingID })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    const handleEdit = (postingID) => {
        props.history.push("/editPosting" + postingID);
    }

    const selectBid = (postingID) => {
        props.location.push("/selectBid/" + postingID);
    }

    return (
        <Grid container spacing={2}>
            {
                !loading ? (
                    postings.map((posting, index) => {
                        
                        return (
                            <Grid item xs={4}>
                                <Posting 
                                    course={posting.course}
                                    description={posting.description}
                                    tags={posting.infoTags}
                                    onDelete={() => handleDelete(posting._id)}
                                    onEdit={() => handleEdit(posting._id)}
                                    selectBid={() => selectBid(posting._id)}
                                />
                            </Grid>
                        )
                    })
                ) : (
                    <Typography variant="h5">Loading...</Typography>
                )
            }
        </Grid>
    )
}

MyPostings.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withRouter(MyPostings));