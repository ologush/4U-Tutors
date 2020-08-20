import React, { Component, useState, useEffect } from 'react'
import { Calendar } from "@material-ui/pickers"
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import { isThisHour } from 'date-fns/esm';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { DateTimePicker } from "@material-ui/pickers"
import PropTypes from "prop-types"
import addDate from "date-fns/add"
import IconButton from "@material-ui/core/IconButton"
import { DeleteForever as DeleteForeverIcon } from "@material-ui/icons/"
import { createMuiTheme } from "@material-ui/core"

const dateOptions = { weekday: "long", month: "long", day: "numeric" };
const timeOptions = { hour: 'numeric', minute: 'numeric' };



function MultipleDateTimePicker(props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDate = (e) => {
        console.log("date handled")
        setCurrentDate(e);
        
    };

    useEffect(() => {
        let dates = [];

        props.alreadySelectedDates.forEach((value, index) => {
            dates.push(new Date(value));
        });

        setSelectedDates(dates);
    }, []);

    const addDateToArray = (date) => {
        let dateToAdd = new Date(date);

        dateToAdd.setMilliseconds(0);
        dateToAdd.setSeconds(0);

        if(selectedDates.includes(dateToAdd)) {

        } else {
            setSelectedDates(prevDates => [...prevDates, dateToAdd]);
            props.addDate(dateToAdd);
        }
    }

     

    const removeDate = (dateToRemove) => {

        

        setSelectedDates(selectedDates.filter(date => dateToRemove.valueOf() != date.valueOf()));
        props.removeDate(dateToRemove);
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker onChange={handleDate} minDate={addDate(Date.now(), {days:1})} maxDate={addDate(Date.now(), {weeks: 2, days: 1})} value={currentDate} onAccept={addDateToArray}/>
                
            </MuiPickersUtilsProvider>
            {console.log(selectedDates)};
            {
                
                selectedDates.map((date, index) => (
                    <div>
                        <Typography variant="h5">{date.toLocaleDateString("en-CA", dateOptions)} at {date.toLocaleTimeString("en-CA", timeOptions)}</Typography>

                        <IconButton aria-label="delete" size="small" onClick={() => removeDate(date)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                ))
            }
        </div>
    )

}

MultipleDateTimePicker.propTypes = {
    addDate: PropTypes.func.isRequired,
    removeDate: PropTypes.func.isRequired,
    alreadySelectedDates: PropTypes.arrayOf(PropTypes.object)
}

export default MultipleDateTimePicker;