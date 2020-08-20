import React, { Component, useState, useEffect } from 'react'
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
import { connect, useSelector, useDispatch } from 'react-redux'
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
        cost: 45
    },
    {
        amount: 3,
        cost: 65
    },
    {
        amount: 4,
        cost: 85
    },
    {
        amount: 5,
        cost: 105
    }
];

const lessonTypes = [
    "SINGLE",
    "GROUP"
];

const tags = {
    science: false,
    math: false,
    english: false,
    programming: false,
    technology: false,
    business: false
};
    




function MakePosting(props) {

    

    const [studentID, setStudentID] = useState(useSelector(state => state.auth.user.id)); //meh
    const [course, setCourse] = useState("");
    const [infoTags, setInfoTags] = useState(new Map()); //meh
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [studentName, setStudentName] = useState(useSelector(state => state.auth.user.name)); //meh
    const [otherStudentEmails, setOtherStudentEmails] = useState([]);
    const [otherStudentIDs, setOtherStudentIDs] = useState([]);
    const [type, setType] = useState("");
    const [numberOfParticipants, setNumberOfParticipants] = useState(1);
    const [availableDates, setAvailableDates] = useState([]);
    const [numberOfRecurringLessons, setNumberOfRecurringLessons] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        
        
        if(props.match.params.postingID) {
            console.log("isEdit")
            const { postingID } = props.match.params;

            axios
            .get("/match/user/postingByID", { params: { postingID: postingID } })
            .then(res => {
                const { data } = res;
                
                setCourse(data.course);
                
                setDescription(data.description);
                setYear(data.year);
                setOtherStudentEmails(data.otherStudentEmails);
                setOtherStudentIDs(data.otherStudentIDs);
                setType(data.type);
                setNumberOfParticipants(data.numberOfParticipants);
                

                let dates = [];

                data.availableTimes.forEach(date => {
                    let dateObj = new Date(date);
                    dates.push(dateObj);
                });


                setAvailableDates(dates);


                const tagKeys = Object.keys(tags);
                let newTags = new Map();
                tagKeys.forEach((key) => {
                    if(data.infoTags.includes(key)) {
                        setInfoTags(infoTags.set(key, true))
                    }
                });

                setInfoTags(new Map(infoTags))
                setIsEdit(true);
                
                console.log(newTags);
                
                console.log(infoTags);
                setLoading(false);
            }) 
            .catch(err => console.log(err));
        } else {
            setLoading(false);
        }
    }, [])

    const submitNew = () => {
        const chosenTags = [];

        infoTags.forEach((value, key) => {
            if(value) chosenTags.push(key);
        });

        const submissionData = {
            studentID: studentID,
            course: course,
            description: description,
            year: year,
            studentName: studentName,
            infoTags: chosenTags,
            type: type,
            availableTimes: availableDates,
            otherStudentIDs: otherStudentIDs,
            numberOfParticipants: numberOfParticipants,
            numberOfRecurringLessons: numberOfRecurringLessons,
            otherStudentEmails: otherStudentEmails
        };

        axios
        .post("/match/addPosting", submissionData)
        .then(res => {
            props.history.push('/myPostings');
        })
        .catch(err => console.log(err));
    }

    const submitEdit = () => {
        const chosenTags = [];

        infoTags.forEach((value, key) => {
            if(value) chosenTags.push(key);
        });

        const submissionData = {
            studentID: studentID,
            course: course,
            description: description,
            year: year,
            studentName: studentName,
            infoTags: chosenTags,
            postingID: props.match.params.postingID,
            type: type,
            availableTimes: availableDates,
            otherStudentIDs: otherStudentIDs,
            numberOfParticipants: numberOfParticipants,
            numberOfRecurringLessons: numberOfRecurringLessons,
            otherStudentEmails: otherStudentEmails
        };

        console.log(submissionData);

        axios
        .post("/match/editPosting", submissionData)
        .then(res => {
           // props.history.push('/myPostings');
        })
        .catch(err => console.log(err))
    }

    const handleCourse = (e) => {
        setCourse(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleYear = (e) => {
        setYear(e.target.value);
    }
    
    //need to fix
    const handleCheckbox = (e) => {
        const { id, checked } = e.target;
        setInfoTags(new Map(infoTags.set(id, checked)))
    }

    const handleSelect = (e) => {
        const selector = e.target.name;
        const { value } = e.target;

        switch(selector) {
            case "LESSON_TYPE":
                setType(value);
                break;
            case "GROUP_SIZE":
                setNumberOfParticipants(value);
                break;
            case "RECURRING_NUMBER":
                setNumberOfRecurringLessons(value)
                break;
            default:
                break;
        }
    }

    const addStudent = (student) => {
        console.log(otherStudentEmails);
        setOtherStudentEmails(prevState => [...prevState, student.email]);
        setOtherStudentIDs(prevState => [...prevState, student._id]);
    };


    //May need to fix
    const deleteStudent = (student) => {
        // setOtherStudentEmails(prevState => {
        //     prevState.filter((email, index) => {
        //         return email != student.email;
        //     });
        // });

        // setOtherStudentIDs(prevState => {
        //     prevState.filter((id, index) => {
        //         return id != student._id;
        //     });
        // });
        setOtherStudentEmails(otherStudentEmails.filter(email => student.email != email));
        setOtherStudentIDs(otherStudentIDs.filter(id => student._id != id));
        
    }

    const addDate = (dateToAdd) => {
        setAvailableDates(prevDates => [...prevDates, dateToAdd]);
    };

    

    const removeDate = (dateToRemove) => {
        setAvailableDates(availableDates.filter(date => dateToRemove.valueOf() != date.valueOf()));
    }

    return (
        <div>
        {
            loading ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <div>
            <Typography variant="h3">Make a Posting for a Tutor</Typography>
            <form onSubmit={isEdit ? submitEdit : submitNew}>
                <TextField value={course} onChange={handleCourse} required id="course" label="Course" />

                {
                    
                    tagOptions.map(option => (
                        
                        <FormControlLabel
                            control={<Checkbox name={option.name} id={option.key} checked={infoTags.get(option.key)} onChange={handleCheckbox} />}
                            label={option.name}
                        />
                    ))
                }

                <Typography variant="h4">Select Lesson Type:</Typography>
                <Select
                    onChange={handleSelect}
                    value={type}
                    name="LESSON_TYPE"
                >
                    {
                        lessonTypes.map(lesson => (
                            <MenuItem value={lesson}>LessonType: {lesson}</MenuItem>
                        ))
                    }
                </Select>

                {
                    (type === "GROUP"
                        ?
                        (
                            <div>

                            <Typography variant="h4">Select Number of Participants: </Typography>
                            <Select
                                onChange={handleSelect}
                                value={numberOfParticipants}
                                name="GROUP_SIZE"
                            >
                                {
                                    groupOptions.map(option => (
                                    <MenuItem value={option.amount}>Participants: {option.amount}, Cost: {option.cost}</MenuItem>
                                ))
                                }

                            </Select>
                            <Typography variant="h4">Enter the participants emails associated with their account</Typography>
                            <AccountFinder addStudent={addStudent} deleteStudent={deleteStudent} maxEmails={numberOfParticipants - 1} addedEmails={otherStudentEmails} addedStudentIDs={otherStudentIDs} />
                            </div>

                        ) : null
                    )
                }

                <Typography variant="h4">Select the times you are available:</Typography>

                <MultipleDateTimePicker addDate={addDate} removeDate={removeDate} alreadySelectedDates={availableDates} />

                <TextField value={description} onChange={handleDescription} multiline rows={5} required id="description" label="Description" fullWidth style={{ margin: 8 }} />

                <TextField value={year} onChange={handleYear} required id="year" label="Year" />

                {
                    isEdit ? (
                        <Button variant="contained" color="primary" onClick={submitEdit}>Edit Posting</Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={submitNew}>Submit Posting</Button>
                    )
                }
            </form>
        </div>
            )
        }
        </div>
        
    )
}

export default MakePosting;