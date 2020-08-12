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

// class FindPostings extends Component {
//     constructor() {
//         super();

//         this.state = {
//             postings: []
//         };

//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(postingID) {

//         //e.preventDefault();

        

//         //this.props.enterBooking(this.state.postings[e.target.id]);

//         this.props.history.push('/booking/' + postingID);



//     }

//     componentWillMount() {

//         //Accesses the db twice
        
//         axios
//             .get("/match/getPostings")
//             .then(res => {
//                 console.log(res);
//                 this.setState({
//                     postings: res.data
//                 });
//             })
//             .catch(err => console.log(err))


//     }

//     render() {
//         return(
//             <div>
//                 <Typography variant="h2">Welcome to the postings page</Typography>

//                 {this.state.postings.map((posting, index) => (
//                     <div>
//                         <Typography variant="h3">Course: {posting.course}</Typography>
//                         <Typography variant="h3">Grade: {posting.year}</Typography>
//                         <Typography variant="h4">Description: {posting.description}</Typography>
                        
//                         <Button variant="contained" color="primary" onClick={() => this.handleSubmit(posting._id)}>Schedule a Time</Button>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// };

// FindPostings.propTypes = {
//     auth: PropTypes.object.isRequired,
//     enterBooking: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//     mapStateToProps,
//     { enterBooking }
// )(withRouter(FindPostings));


function FindPostings(props) {

    //const [filter, setFilter] = useState(null);

    

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
    //const [filters, setFilters] = useState([]);


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
                console.log(res);
                setPostings(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
        }
        


    }, [filter]);

    const handleCheckbox = (name, index) => {

        let tempFilter = filter;

        tempFilter[index].checked = !tempFilter[index].checked;

        //console.log(tempFilter);
        
        setFilter([...tempFilter]);
        setLoading(true);

        // setFilters([
        //     filter.map((filter) => {
        //         if(filter.checked) return filter.tag;
        //         else return;
        //     })
        // ])

       

        
        console.log(filter)
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
                        {console.log("a")}
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