import React, { useState, useCallback } from 'react'
import Lobby from './Lobby';
import axios from 'axios';
import Room from './Room';
import { useSelector } from 'react-redux'


 const VideoChat = ({ match }) => {
     const [username, setUsername] = useState('');
     const [roomName, setRoomName] = useState('');
     const [token, setToken] = useState(null);

     const user = useSelector(state => state.auth.user);

     const handleUsernameChange = useCallback(event => {
         setUsername(event.target.value);
     }, []);

     const handleRoomNameChange = useCallback(event => {
         setRoomName(event.target.value);
     }, []);

     const handleSubmit = useCallback(async event => {
         event.preventDefault();

         axios
            .get("/videoChat/token", {
                params: {
                    identity: user.name,
                    room: match.params.meetingID
                }
            })
            .then(res => {
                setToken(res.data)
            })
            .catch(err => console.log(err))
     }, [username, roomName]);

     const handleLogout = useCallback(event => {
         setToken(null);
     }, []);

     let render;

     if(token) {
         render = (
             <div>
                 <Room roomName={roomName} token={token} handleLogout={handleLogout} />
             </div>
         );
     } else {
         render = (
             <Lobby 
                username={username}
                roomName={roomName}
                handleUsernameChange={handleUsernameChange}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={handleSubmit}
             />
         );
     }

     return render;
 };

 export default VideoChat;