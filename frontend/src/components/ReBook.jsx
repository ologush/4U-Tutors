import React, { useState } from 'react'
import { DateTimePicker } from "@material-ui/pickers"
import Paper from "@material-ui/core/Paper"
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { PersonAddDisabledTwoTone } from '@material-ui/icons';
import Button from "@material-ui/core/Button"


function ReBook(props) {

    const [pickedDate, setPickedDate] = useState(null);

    const handleDate = (e) => {
        setPickedDate(e);
    };

    const onSubmit = () => {
        console.log(pickedDate)
    };

    const addDate = (date) => {
        console.log(date)
        date.setDate(date.getDate() + 1)
        console.log(date)
        return date;
    }

    return(
        <Paper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker onChange={handleDate} minDate={addDate(new Date(Date.now()))} value={pickedDate} />

                
            </MuiPickersUtilsProvider>

            <Button onClick={onSubmit} variant="contained" color="primary">Select Time</Button>
        </Paper>
    )
}

export default ReBook;