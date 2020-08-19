import React, { Component, useState, useEffect } from 'react'
import axios from "axios";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button"

import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';

import { Link, withRouter } from 'react-router-dom'

import Grid from "@material-ui/core/Grid"

import Posting from "./Posting";



function MyPostings(props) {
    
    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(useSelector(state => state.auth.user));
    const [hasPostings, setHasPostings] = useState(false);

    useEffect(() => {
        axios
        .post("/users/getPostings", { studentID: user.id})
        .then(res => {
            if(res.data.length > 0) {
                console.log(res.data)
                setPostings(res.data);
                setHasPostings(true);
                setLoading(false);
            } else {
                setLoading(false);
            }
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
        props.history.push("/editPosting/" + postingID);
    }

    const selectBid = (postingID) => {
        props.history.push("/selectBid/" + postingID);
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
                    //!hasPostings && <Typography variant="h5">You have no postings, go to the my postings page to get started</Typography>
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