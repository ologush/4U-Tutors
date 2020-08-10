import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

function Timer(props) {
    const calculateTimeLeft = () => {
        
        let year = new Date().getFullYear();

        //Adds 1 hour to the start time in milliseconds
        let finishTime = props.startTime.getTime() + 3600000;
        console.log(props.startTime)
        

        const difference = +new Date(finishTime) - +new Date();

        let timeLeft = {};

        console.log(difference)

        if(difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };

            console.log(timeLeft);
        } else if(difference > -300000) {
            const newDifference = +new Date(finishTime + 300000) - +new Date();
            timeLeft = {
                hours: Math.floor((newDifference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((newDifference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60) + 60
            }

            if(!hasSurpassed) {
                setHasSurpassed(true);
            }
        } else if(difference < -300000) {
            props.onTimeOut();
        }

        return timeLeft;
    }
    
    const [hasSurpassed, setHasSurpassed] = useState(false)
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000)
    })

    return (
        <div>
            <Paper>
                <Typography variant="body1">Time Left: {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</Typography>
            </Paper>
        </div>
    );
}

Timer.propTypes = {
    startTime: PropTypes.object.isRequired,
    onTimeOut: PropTypes.func.isRequired
}

Timer.defaultProps = {
    startTime: new Date(Date.now())
}

export default Timer;