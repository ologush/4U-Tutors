import React, { Component } from 'react'
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

const dateOptions = { weekday: "long", month: "long", day: "numeric" };
const timeOptions = { hour: 'numeric', minute: 'numeric' };

class MultipleDateTimePicker extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.alreadySelectedDates);
        let dates = [];
        this.props.alreadySelectedDates.forEach((value, index) => {
            dates.push(new Date(value));
        });
        this.state = {
            currentDate: new Date(),
            selectedDates: dates
        }

        console.log(this.state.selectedDates);

        this.handleDate = this.handleDate.bind(this);
        this.addDate = this.addDate.bind(this);
        this.removeDate = this.removeDate.bind(this);
    }

    handleDate(e) {

        console.log(e);
        this.setState({
            currentDate: e
        });
    }

    addDate(e) {
        let dateToAdd = new Date(this.state.currentDate);

        dateToAdd.setMilliseconds(0);
        dateToAdd.setSeconds(0);
        

        if(this.state.selectedDates.includes(dateToAdd)) {
            //Date has already been added, show a message
        } else {
            this.setState(prevState => ({
                selectedDates: [...prevState.selectedDates, dateToAdd]
            }));
        }
        this.props.addDate(dateToAdd);
    }
    
    removeDate(e) {
        e.preventDefault();
        const dateToRemove = e.target.id;

        this.setState(prevState => ({
            selectedDates: prevState.selectedDates.filter(date => {
                return dateToRemove != date;
            })
        }));
        this.props.removeDate(dateToRemove);
    }

    render() {
        return(
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker onChange={this.handleDate} minDate={addDate(Date.now(), {days: 1})} maxDate={addDate(Date.now(), {weeks: 2, days: 1})} value={this.state.currentDate} />
                    <Button onClick={this.addDate}>Add</Button>
                </MuiPickersUtilsProvider>

                {
                    this.state.selectedDates.map((date, index) => (
                        <div>
                            {console.log(typeof date)}

                            <Typography variant="h5">{date.toLocaleDateString("en-US", dateOptions)} at {date.toLocaleTimeString("en-US", timeOptions)}</Typography>
                            <button id={date} onClick={this.removeDate}>X</button>
                        </div>
                    ))
                }
                
            </div>
        );
    }

}

MultipleDateTimePicker.propTypes = {
    addDate: PropTypes.func.isRequired,
    removeDate: PropTypes.func.isRequired,
    alreadySelectedDates: PropTypes.arrayOf(PropTypes.object)
}

export default MultipleDateTimePicker;