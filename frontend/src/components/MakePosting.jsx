import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import AccountFinder from "./AccountFinder"

import classnames from "classnames"

import Button from "@material-ui/core/Button"

import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormLabel from "@material-ui/core/FormLabel"
import spacing from "@material-ui/system/spacing"

import MultipleDateTimePicker from "./MultipleDateTimePicker"

import isEmpty from "is-empty";

import Paper from "@material-ui/core/Paper"

import { Link, withRouter } from "react-router-dom"

import TagOptions from "./TagOptions"
import Grid from "@material-ui/core/Grid"
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers'
import { connect } from 'react-redux'
import errorReducers from '../reducers/errorReducers'

import axios from "axios"

const recurringOptions = [
    2,
    3,
    4,
    5,
    6,
    7,
    8
];

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
    },
    {
        name: "Business",
        checked: false,
        key: 'business'
    }
];

const groupOptions = [
    {
        amount: 2,
        costPerParticipant: 20
    },
    {
        amount: 3,
        costPerParticipant: 18
    },
    {
        amount: 4,
        costPerParticipant: 16
    },
    {
        amount: 5,
        costPerParticipant: 15
    }
];

const lessonTypes = [
    "SINGLE_SINGLE",
    "SINGLE_RECURRING",
    "GROUP_SINGLE",
    "GROUP_RECURRING"
];

const tags = {
    science: false,
    math: false,
    english: false,
    programming: false,
    technology: false,
    business: false
};
    


class MakePosting extends Component {
    constructor(props) {
        super(props);



        this.state = {
            studentID: "",
            course: "",
            infoTags: new Map(),
            description: "",
            year: "",
            studentName: "",
            otherStudentEmails: [],
            otherStudentIDs: [],
            type: "",
            numberOfParticipants: 0,
            numberOfRecurringLessons: 0,
            availableDates: []
        }

        

        

        if(!isEmpty(this.props.location.posting)) {
            
            let infoTags = new Map();

            const tagKeys = Object.keys(tags);

            tagKeys.forEach((key) => {
                if(this.props.location.posting.infoTags.includes(key)) {
                    infoTags.set(key, true);
                }
            });

            
            this.state = {
                studentID: this.props.location.posting.studentID,
                course: this.props.location.posting.course,
                infoTags: infoTags,
                description: this.props.location.posting.description,
                year: this.props.location.posting.year,
                studentName: this.props.location.posting.studentName,
                type: this.props.location.posting.type,
                availableDates: this.props.location.posting.availableTimes,
                otherStudentIDs: this.props.location.posting.otherStudentIDs,
                numberOfParticipants: this.props.location.posting.numberOfParticipants,
                numberOfRecurringLessons: this.props.location.posting.numberOfRecurringLessons,
                otherStudentEmails: this.props.location.posting.otherStudentEmails
            }

            console.log();

        
        }


        
        console.log(this.state);
    
        

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.addDate = this.addDate.bind(this);
        this.removeDate = this.removeDate.bind(this);
        this.currentLayout = this.currentLayout.bind(this);
    }

    onSubmit() {

        const chosenTags = [];

        this.state.infoTags.forEach((value, key) => {
            
            if(value) chosenTags.push(key);
        });

        if(!isEmpty(this.props.location.posting)) {
            const submissionData = {
                studentID: this.props.auth.user.id,
                course: this.state.course,
                description: this.state.description,
                year: this.state.year,
                studentName: this.props.auth.user.name,
                infoTags: chosenTags,
                postingID: this.props.location.posting._id,
                type: this.state.type,
                availableTimes: this.state.availableDates,
                otherStudentIDs: this.state.otherStudentIDs,
                numberOfParticipants: this.state.numberOfParticipants,
                numberOfRecurringLessons: this.state.numberOfRecurringLessons,
                otherStudentEmails: this.state.otherStudentEmails
            }
            console.log(this.props.location.posting)
            
            axios
                .post("/match/editPosting", submissionData)
                .then(res => {
                    this.props.history.push('myPostings');
                })
                .catch(err => console.log(err));

        } else {
            const submissionData = {
                studentID: this.props.auth.user.id,
                course: this.state.course,
                description: this.state.description,
                year: this.state.year,
                studentName: this.props.auth.user.name,
                infoTags: chosenTags,
                type: this.state.type,
                availableTimes: this.state.availableDates,
                otherStudentIDs: this.state.otherStudentIDs,
                numberOfParticipants: this.state.numberOfParticipants,
                numberOfRecurringLesons: this.state.numberOfRecurringLessons,
                otherStudentEmails: this.state.otherStudentEmails
            };
            axios
                .post("/match/addPosting", submissionData)
                .then(res => {
                    this.props.history.push('/myPostings');
                })
                .catch(err => console.log(err));
        }   
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
        console.log(this.state);
    }

    handleCheckbox(e) {
       
        const id = e.target.id;
        const checked = e.target.checked;
        
        this.setState(prevState => ({ infoTags: prevState.infoTags.set(id, checked)}));
        console.log(this.state);

    }

    handleSelect(e) {

        const selector = e.target.name;

        switch(selector) {
            case "LESSON_TYPE":
                this.setState({type: e.target.value});
                break;
            case "GROUP_SIZE":
                console.log("hmmm")
                this.setState({numberOfParticipants: e.target.value});
                break;
            case "RECURRING_NUMBER":
                this.setState({numberOfRecurringLessons: e.target.value});
                break;
            default:
                break;
        }
        
    }

    addStudent(student) {
        this.setState(prevState => ({
            otherStudentEmails: [...prevState.otherStudentEmails, student.email],
            otherStudentIDs: [...prevState.otherStudentIDs, student._id]
        }));
    }

    deleteStudent(studentID) {
        this.setState(prevState => ({
            otherStudentIDs: prevState.otherStudentIDs.filter((id, index) => {
                return id != studentID
            })
        }));
    }

    addDate(dateToAdd) {
        
        this.setState(prevState => ({
            availableDates: [...prevState.availableDates, dateToAdd]
        }));


    }

    removeDate(dateToRemove) {
        this.setState(prevState => ({
            availableDates: prevState.availableDates.filter(date => {
                return date != dateToRemove;
            })
        }));
    }

    newLayout = () => (
        <Grid container spacing={4} direction="column">
        <Grid container spacing={4}>
        <Grid container item xs={4} direction="column">
            <Paper>
            <Grid item>
                
                <TextField label="Course" />
            
            
            </Grid>
            <Grid item>
                <TextField label="Description" multiline rows={6} />
            </Grid>
            </Paper>
            
        </Grid>
        <Grid container spacing={2} item xs={4} direction="column">
            
            <Paper>
            <Grid container item>
                <TagOptions />
            </Grid>
            </Paper>
            <Grid item>
                <Paper>
                    <FormLabel component="legend">Select Available Times</FormLabel>
                    <MultipleDateTimePicker addDate={this.addDate} removeDate={this.removeDate} alreadySelectedDates={this.state.availableDates} />
                </Paper>
            </Grid>
            
        </Grid>
        <Grid container item xs={4} spacing={2} direction="column">
            <Grid item>
                <Paper>
                <FormLabel component="legend">Select a Lesson Type</FormLabel>
                <Select 
                    onChange={this.handleSelect}
                    value={this.state.type}
                    name="LESSON_TYPE"
                >
                    {
                        lessonTypes.map(lesson => (
                            <MenuItem value={lesson}>Lesson Type: {lesson}</MenuItem>
                        ))
                    }
                </Select>
                </Paper>
            </Grid>
                {
                    (this.state.type === "GROUP_SINGLE" || this.state.type === "GROUP_RECURRING" 
                        ?
                        (
                            
                            <Grid item>
                            <Paper>
                            
                            <FormLabel component="legend">Select Number of Participants</FormLabel>
                            <Select
                                onChange={this.handleSelect}
                                value={this.state.numberOfParticipants}
                                name="GROUP_SIZE"
                            >
                                {
                                    groupOptions.map(option => (
                                    <MenuItem value={option.amount}>Participants: {option.amount}, Cost Per Participant: {option.costPerParticipant}</MenuItem>
                                ))
                                }

                            </Select>
                            
                            
                            <FormLabel component="legend">Enter the Other Participants Emails</FormLabel>
                            <AccountFinder addStudent={this.addStudent} deleteStudent={this.deleteStudent} maxEmails={this.state.numberOfParticipants - 1} addedEmails={this.state.otherStudentEmails} addedStudentIDs={this.state.otherStudentIDs} />
                            
                            </Paper>
                            </Grid>

                        ) : null
                    )
                }

                {
                    (this.state.type === "SINGLE_RECURRING" || this.state.type === "GROUP_RECURRING" ) 
                    ? 
                    (
                        
                        <Grid item>
                        <Paper>
                        <FormLabel component="legend">Select the number of recurring lessons</FormLabel>
                        <Select 
                            onChange={this.handleSelect}
                            value={this.state.numberOfRecurringLessons}
                            name="RECURRING_NUMBER"
                        >
                            {
                                recurringOptions.map(option => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))
                            }

                        </Select>
                        </Paper>
                        </Grid>
                        
                    ) : null
                    
                }
            
        </Grid>
    </Grid>
        <Grid item>
        <Button variant="contained" color="primary">Submit</Button>
        </Grid>
    </Grid>
    
    );

    

    currentLayout = () => (
        <div>
                <Typography variant="h1">Make a Posting for a Tutor</Typography>
                <form onSubmit={this.onSubmit}>
                    <TextField error={this.props.errors.name} value={this.state.course} onChange={this.handleChange} required id="course" label="Course" className={classnames("", {
                        invalid: this.props.errors.name
                    })} />

                  

                    {/* {
                        tagOptions.map(option => (
                            <FormControlLabel 
                                control={<Checkbox name={option.name} id={option.key} checked={this.state.infoTags.get(option.key)} onChange={this.handleCheckbox} />}
                                label={option.name}
                            />
                        ))
                    } */}

                    <TagOptions />

                    <Typography variant="h4">Select Leson Type: </Typography>
                    <Select 
                        onChange={this.handleSelect}
                        value={this.state.type}
                        name="LESSON_TYPE"
                    >
                        {
                            lessonTypes.map(lesson => (
                                <MenuItem value={lesson}>Lesson Type: {lesson}</MenuItem>
                            ))
                        }



                    </Select>


                    {
                        (this.state.type === "GROUP_SINGLE" || this.state.type === "GROUP_RECURRING" 
                            ?
                            (
                                <div>

                                <Typography variant="h4">Select Number of Participants: </Typography>
                                <Select
                                    onChange={this.handleSelect}
                                    value={this.state.numberOfParticipants}
                                    name="GROUP_SIZE"
                                >
                                    {
                                        groupOptions.map(option => (
                                        <MenuItem value={option.amount}>Participants: {option.amount}, Cost Per Participant: {option.costPerParticipant}</MenuItem>
                                    ))
                                    }

                                </Select>
                                <Typography variant="h4">Enter the participants emails associated with their account</Typography>
                                <AccountFinder addStudent={this.addStudent} deleteStudent={this.deleteStudent} maxEmails={this.state.numberOfParticipants - 1} addedEmails={this.state.otherStudentEmails} addedStudentIDs={this.state.otherStudentIDs} />
                                </div>

                            ) : null
                        )
                    }

                    {
                        (this.state.type === "SINGLE_RECURRING" || this.state.type === "GROUP_RECURRING" ) 
                        ? 
                        (
                            <div>

                            <Typography variant="h4">Select the number of recurring lessons</Typography>
                            <Select 
                                onChange={this.handleSelect}
                                value={this.state.numberOfRecurringLessons}
                                name="RECURRING_NUMBER"
                            >
                                {
                                    recurringOptions.map(option => (
                                        <MenuItem value={option}>{option}</MenuItem>
                                    ))
                                }

                            </Select>

                            </div>
                        ) : null
                        
                    }

                    <Typography variant="h4">Select the times that you are available:</Typography>
                    
                    <MultipleDateTimePicker addDate={this.addDate} removeDate={this.removeDate} alreadySelectedDates={this.state.availableDates} />


                    

                    <TextField error={this.props.errors.name} value={this.state.description} onChange={this.handleChange} required id='description' label="Description" fullWidth style={{ margin: 8}} />

                    <TextField error={this.props.errors.name} value={this.state.year} onChange={this.handleChange} required id='year' label="Year" />

                    {
                        (!isEmpty(this.props.location.posting) ? <Button variant="contained" color="primary" onClick={this.onSubmit}>Edit Posting</Button>
                        
                        : 
                        
                        <Button variant='contained' color='primary' onClick={this.onSubmit}>Submit Posting</Button> )
                    }

                   



                </form>

            </div>
    );
   

    render() {

        return(
            <div>
            <Typography variant="h1">Make a Posting for a Tutor</Typography>
            <form onSubmit={this.onSubmit}>
                <TextField error={this.props.errors.name} value={this.state.course} onChange={this.handleChange} required id="course" label="Course" className={classnames("", {
                    invalid: this.props.errors.name
                })} />

              

                {
                    tagOptions.map(option => (
                        <FormControlLabel 
                            control={<Checkbox name={option.name} id={option.key} checked={this.state.infoTags.get(option.key)} onChange={this.handleCheckbox} />}
                            label={option.name}
                        />
                    ))
                }

                

                <Typography variant="h4">Select Leson Type: </Typography>
                <Select 
                    onChange={this.handleSelect}
                    value={this.state.type}
                    name="LESSON_TYPE"
                >
                    {
                        lessonTypes.map(lesson => (
                            <MenuItem value={lesson}>Lesson Type: {lesson}</MenuItem>
                        ))
                    }



                </Select>


                {
                    (this.state.type === "GROUP_SINGLE" || this.state.type === "GROUP_RECURRING" 
                        ?
                        (
                            <div>

                            <Typography variant="h4">Select Number of Participants: </Typography>
                            <Select
                                onChange={this.handleSelect}
                                value={this.state.numberOfParticipants}
                                name="GROUP_SIZE"
                            >
                                {
                                    groupOptions.map(option => (
                                    <MenuItem value={option.amount}>Participants: {option.amount}, Cost Per Participant: {option.costPerParticipant}</MenuItem>
                                ))
                                }

                            </Select>
                            <Typography variant="h4">Enter the participants emails associated with their account</Typography>
                            <AccountFinder addStudent={this.addStudent} deleteStudent={this.deleteStudent} maxEmails={this.state.numberOfParticipants - 1} addedEmails={this.state.otherStudentEmails} addedStudentIDs={this.state.otherStudentIDs} />
                            </div>

                        ) : null
                    )
                }

                {
                    (this.state.type === "SINGLE_RECURRING" || this.state.type === "GROUP_RECURRING" ) 
                    ? 
                    (
                        <div>

                        <Typography variant="h4">Select the number of recurring lessons</Typography>
                        <Select 
                            onChange={this.handleSelect}
                            value={this.state.numberOfRecurringLessons}
                            name="RECURRING_NUMBER"
                        >
                            {
                                recurringOptions.map(option => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))
                            }

                        </Select>

                        </div>
                    ) : null
                    
                }

                <Typography variant="h4">Select the times that you are available:</Typography>
                
                <MultipleDateTimePicker addDate={this.addDate} removeDate={this.removeDate} alreadySelectedDates={this.state.availableDates} />


                

                <TextField error={this.props.errors.name} value={this.state.description} onChange={this.handleChange} required id='description' label="Description" fullWidth style={{ margin: 8}} />

                <TextField error={this.props.errors.name} value={this.state.year} onChange={this.handleChange} required id='year' label="Year" />

                {
                    (!isEmpty(this.props.location.posting) ? <Button variant="contained" color="primary" onClick={this.onSubmit}>Edit Posting</Button>
                    
                    : 
                    
                    <Button variant='contained' color='primary' onClick={this.onSubmit}>Submit Posting</Button> )
                }

               



            </form>

        </div>
        
        )
            
        
    }
}

MakePosting.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    posting: PropTypes.object,
    isEdit: PropTypes.bool,
    test: PropTypes.number
};

MakePosting.defaultProps = {
    posting: null,

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(withRouter(MakePosting));