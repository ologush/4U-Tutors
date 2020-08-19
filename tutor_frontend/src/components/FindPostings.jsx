import React, { Component, useState, useEffect } from 'react'

import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import CheckBox from "@material-ui/core/CheckBox"


import axios from "axios";
import { connect, useSelector, useDispatch } from 'react-redux'
import Typography from "@material-ui/core/Typography"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types";
import Posting from "./Posting"

import { enterBooking } from "../actions/lessonActions";


import { Link, withRouter } from 'react-router-dom'




function FindPostings(props) {

    

    const [filter, setFilter] = useState([
        {
            name: "Math",
            checked: false,
            tag: "math"
        },
        {
            name: "English",
            checked: false,
            tag: "english"
        },
        {
            name: "Business",
            checked: false,
            tag: "business"
        },
        {
            name: "Science",
            checked: false,
            tag: "science"
        },
        {
            name: "Programming",
            checked: false,
            tag: "programming"
        },
        {
            name: "Technology",
            checked: false,
            tag: "technology"
        }
    ]);


    const [postings, setPostings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("effect")
        const filters = filter.filter(filter => {
            return filter.checked;
        })
        .map(filter => {
            return filter.tag
        });

        

        console.log(filters)
        if(filters.length == 0) {
            axios
            .get("/match/getPostings")
            .then(res => {
                setPostings(res.data);
                setLoading(false);
            })
        } else {
            axios
            .post("/match/getPostingsByTags", { tags: filters })
            .then(res => {
                setPostings(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
        }
        


    }, [filter]);

    const handleCheckbox = (name, index) => {

        let tempFilter = filter;

        tempFilter[index].checked = !tempFilter[index].checked;

    
        
        setFilter([...tempFilter]);
        setLoading(true);
    };

    const handleSubmit = (postingID) => {
        props.history.push("/booking/" + postingID)
    };

    


    

    return(
        <div>
            {
                loading ? (
                    <Typography variant="h5">Loading...</Typography>
                ) : (
                    
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            {
                                
                                filter.map((value, index) => (
                                    <FormControlLabel
                                    control={<CheckBox checked={value.checked} onChange={() => handleCheckbox(value.name, index)} name={value.name} />}
                                    label={value.name} />
                                ))
                                
                            }
                            </Grid>
                            {
                                postings.map((posting, index) => (
                                    <Grid item xs={4}>
                                        <Posting 
                                            course={posting.course}
                                            description={posting.description}
                                            grade={posting.year}
                                            enterBooking={() => handleSubmit(posting._id)}
                                            type={posting.type}
                                        />
                                    </Grid>
                                ))
                            }
                            
                        </Grid>
                    </div>
                )
            }
        </div>
    )
}

export default FindPostings;