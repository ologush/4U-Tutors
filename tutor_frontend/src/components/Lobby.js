import React from 'react'

import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const timeOptions = { hour: 'numeric', minute: 'numeric'}

const Lobby = ({
    username,
    handleUsernameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit,
    date,
    description
}) => {
    return(
        <Paper>
        <form onSubmit={handleSubmit}>
            <Typography variant="h4">
                Welcome {username} to the lesson lobby. Your lesson is scheduled to begin
                at {date.toLocaleTimeString('en-CA', timeOptions)} Click the Begin Lesson button to enter the lesson.
            </Typography>
            <Typography variant="h5">Course: {roomName}</Typography>
            

            <Button type="submit">Begin Lesson</Button>

        </form>
        </Paper>
    );
};

export default Lobby;