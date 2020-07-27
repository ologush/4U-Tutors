import React from 'react'
import Button from "@material-ui/core/Button"

const Lobby = ({
    username,
    handleUsernameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit
}) => {
    return(
        <form onSubmit={handleSubmit}>
            <h2>Welcome {username}</h2>
            <h2>Lobby for lesson: {roomName}</h2>

            <button type="submit">Enter Lesson</button>

        </form>
    );
};

export default Lobby;