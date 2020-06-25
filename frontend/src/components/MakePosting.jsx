import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import classnames from "classnames"

import Button from "@material-ui/core/Button"

import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"

import { Link, withRouter } from "react-router-dom"

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import { connect } from 'react-redux'
import errorReducers from '../reducers/errorReducers'

import axios from "axios"


const tagOptions = [
    {
        name: "Science",
        checked: false,
        key: 'science'
    },
    {
        name: "Math",
        checked: false,
        key: 'math'
    },
    {
        name: "English",
        checked: false,
        key: 'english'
    },
    {
        name: "Programming",
        checked: false,
        key: 'programming'
    },
    {
        name: "Technology",
        checked: false,
        key: 'technology'
    }
];

const tags = {
    science: false,
    math: false,
    english: false,
    programming: false,
    technology: false
}
    


class MakePosting extends Component {
    constructor() {
        super();

        this.state = {
            studentID: "",
            course: "",
            infoTags: new Map(),
            description: "",
            year: "",
            studentName: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    onSubmit() {

        const chosenTags = [];

        this.state.infoTags.forEach((value, key) => {
            if(value) chosenTags.push(key);
        });

        console.log(this.props.auth.id);

        const submissionData = {
            studentID: this.props.auth.user.id,
            course: this.state.course,
            description: this.state.description,
            year: this.state.year,
            studentName: this.props.auth.user.name,
            infoTags: chosenTags
        }

        console.log(submissionData);

        axios
            .post("/match/addPosting", submissionData)
            .then(res => {
                this.props.history.push('/myPostings');
            })
            .catch(err => console.log(err));
        
        
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
        
    }

    handleCheckbox(e) {
       
        const id = e.target.id;
        const checked = e.target.checked;
        
        this.setState(prevState => ({ infoTags: prevState.infoTags.set(id, checked)}));

    }

    render() {
        return(
            <div>
                <Typography variant="h1">Make a Posting for a Tutor</Typography>
                <form onSubmit={this.onSubmit}>
                    <TextField error={this.props.errors.name} onChange={this.handleChange} required id="course" label="Course" className={classnames("", {
                        invalid: this.props.errors.name
                    })} />

                    {/* {this.state.infoTags.map((option) => (
                        <FormControlLabel 
                            control={<Checkbox checked={option.checked} id={option.name} onChange={this.handleChange} name={option.name}/>}
                            label={option.name}
                        />
                    ))} */}

                    {
                        tagOptions.map(option => (
                            <FormControlLabel 
                                control={<Checkbox name={option.name} id={option.key} checked={this.state.infoTags.get(option.name)} onChange={this.handleCheckbox} />}
                                label={option.name}
                            />
                        ))
                    }

                    <TextField error={this.props.errors.name} onChange={this.handleChange} required id='description' label="Description" fullWidth style={{ margin: 8}} />

                    <TextField error={this.props.errors.name} onChange={this.handleChange} required id='year' label="Year" />

                    <Button variant='contained' color='primary' onClick={this.onSubmit}>Submit Posting</Button>



                </form>

            </div>
        );
    }
}

MakePosting.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(withRouter(MakePosting));