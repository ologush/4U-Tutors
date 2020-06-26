import React, { Component } from 'react'
import axios from "axios";

import Typography from "@material-ui/core/Typography";


import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom'

class MyPostings extends Component {
    constructor() {
        super();

        this.state = {
            postings: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        
    }

    componentWillMount() {

        axios
            .post("/users/getPostings", { studentID: this.props.auth.user.id})
            .then(res => {
                console.log(res.data);
                this.setState({
                    postings: res.data
                });
            })
            .catch(err => console.log(err))
    }

    handleDelete(e) {

        
        axios
            .post("/users/deletePosting", { postingID: this.state.postings[e.target.id]._id} )
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    


    render() {
        return(
            <div>
                <Typography variant="h1">This is your postings page</Typography>
                {this.state.postings.map((posting, index) => (
                    <div>
                        <Typography variant="h2">Course: {posting.course}</Typography>
                        <Typography variant="h2">Tags: {posting.tags}</Typography>
                        <Typography variant="h2">Description: {posting.description}</Typography>
                        <Typography variant="h2">Year: {posting.year}</Typography>
                        <button id={index} name="delete" onClick={this.handleDelete}>Delete</button>
                        <Link to={{
                            pathname: "/makePosting",
                            posting: this.state.postings[index]
                        }}>
                            <button id={index} name="edit">Edit</button>
                        </Link>
                        
                    </div>
                ))}
            </div>
        );
    }
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