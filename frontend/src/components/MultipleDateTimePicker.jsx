import React, { Component } from 'react'
import { Calendar } from "@material-ui/pickers"

class MultipleDateTimePicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Calendar />
            </div>
        );
    }

}

export default MultipleDateTimePicker;