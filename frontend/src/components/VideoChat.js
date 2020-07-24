import React, { useState, useCallback } from 'react'
import Lobby from './Lobby';
import axios from 'axios';
import Room from './Room';
import { useSelector, useDispatch } from 'react-redux'
import { endLesson } from '../actions/lessonActions'
import Timer from "./Timer"


 const VideoChat = (props) => {
    
    const { lessonID } = props.match.params;

     const [username, setUsername] = useState('');
     
     //const [roomName, setRoomName] = useState(useSelector(state => state.lesson.lesson._id));
     const [roomName, setRoomName] = useState(lessonID);
     const [token, setToken] = useState(null);

     const user = useSelector(state => state.auth.user);
     const startTime = localStorage.getItem("startTime");
    console.log(startTime)
     console.log(user)
     const lesson = useSelector(state => state.lesson.lesson);
     const dispatch = useDispatch();
     const handleUsernameChange = useCallback(event => {
         setUsername(event.target.value);
     }, []);

     const handleRoomNameChange = useCallback(event => {
         setRoomName(event.target.value);
     }, []);

     const handleSubmit = useCallback(async event => {
         event.preventDefault();

         console.log(lesson);
         axios
            .get("/videoChat/token", {
                params: {
                    identity: user.name,
                    roomName: lessonID
                }
            })
            .then(res => {
                setToken(res.data)
            })
            .catch(err => console.log(err))
     }, [username, roomName]);

     const handleLogout = useCallback(event => {
         setToken(null);
         window.location.href = "/postLesson/" + lessonID;

         //dispatch(endLesson());

     }, []);

     const handleTimeout = () => {
         handleLogout()
     }

     let render;

     if(token) {
         render = (
             <div>
                <Room roomName={roomName} token={token} handleLogout={handleLogout} />
                <Timer
                    onTimeOut={handleTimeout}
                    startTime={new Date(startTime)}
                />
             </div>
         );
     } else {
         render = (
             <div>
                <Lobby 
                    username={user.name}
                    roomName={lesson.subject}
                    handleUsernameChange={handleUsernameChange}
                    handleRoomNameChange={handleRoomNameChange}
                    handleSubmit={handleSubmit}
                />
             
             </div>
             
         );
     }

     return render;
 };

 export default VideoChat;