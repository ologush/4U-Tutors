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

// class MultipleDateTimePicker extends Component {
//     constructor(props) {
//         super(props);
//         console.log(this.props.alreadySelectedDates);
//         let dates = [];
//         this.props.alreadySelectedDates.forEach((value, index) => {
//             dates.push(new Date(value));
//         });
//         this.state = {
//             currentDate: new Date(),
//             selectedDates: dates
//         }

//         console.log(this.state.selectedDates);

//         this.handleDate = this.handleDate.bind(this);
//         this.addDate = this.addDate.bind(this);
//         this.removeDate = this.removeDate.bind(this);
//     }

//     handleDate(e) {

//         console.log(e);
//         this.setState({
//             currentDate: e
//         });
//     }

//     addDate(e) {
//         let dateToAdd = new Date(this.state.currentDate);

//         dateToAdd.setMilliseconds(0);
//         dateToAdd.setSeconds(0);
        

//         if(this.state.selectedDates.includes(dateToAdd)) {
//             //Date has already been added, show a message
//         } else {
//             this.setState(prevState => ({
//                 selectedDates: [...prevState.selectedDates, dateToAdd]
//             }));
//         }
//         this.props.addDate(dateToAdd);
//     }
    
//     removeDate(dateToRemove) {
//         //e.preventDefault();
//         //const dateToRemove = e.target.id;

//         this.setState(prevState => ({
//             selectedDates: prevState.selectedDates.filter(date => {
//                 return dateToRemove != date;
//             })
//         }));
//         this.props.removeDate(dateToRemove);
//     }

//     render() {
//         return(
//             <div>
//                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <DateTimePicker onChange={this.handleDate} minDate={addDate(Date.now(), {days: 1})} maxDate={addDate(Date.now(), {weeks: 2, days: 1})} value={this.state.currentDate} />
//                     <Button onClick={this.addDate}>Add</Button>
//                 </MuiPickersUtilsProvider>

//                 {
//                     this.state.selectedDates.map((date, index) => (
//                         <div>
//                             {console.log(typeof date)}

//                             <Typography variant="h5">{date.toLocaleDateString("en-US", dateOptions)} at {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
                            
//                             <IconButton aria-label="delete" size="small" onClick={() => this.removeDate(date)}>
//                                 <DeleteForeverIcon />
//                             </IconButton>
//                         </div>
//                     ))
//                 }
                
//             </div>
//         );
//     }

// }

function MultipleDateTimePicker(props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDate = (e) => {
        setCurrentDate(e);
    };

    useEffect(() => {
        let dates = [];

        props.alreadySelectedDates.forEach((value, index) => {
            dates.push(new Date(value));
        });

        setSelectedDates(dates);
    }, []);

    const addDateToArray = (e) => {
        let dateToAdd = new Date(currentDate);

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
                <DateTimePicker onChange={handleDate} minDate={addDate(Date.now(), {days:1})} maxDate={addDate(Date.now(), {weeks: 2, days: 1})} value={currentDate} />
                <Button onClick={addDateToArray}>Add</Button>
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