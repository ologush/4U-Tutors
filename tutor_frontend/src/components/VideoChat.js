import React, { useState, useCallback, useEffect } from 'react'
import Lobby from './Lobby';
import axios from 'axios';
import Room from './Room';
import { useSelector, useDispatch } from 'react-redux'
import { endLesson } from '../actions/lessonActions'
import Timer from "./Timer"
import Typography from "@material-ui/core/Typography"

 const VideoChat = (props) => {

    const { lessonID } = props.match.params;

    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState(useSelector(state => state.lesson.lesson._id));
    const [token, setToken] = useState(null);
    const [lesson, setLesson] = useState([]);
    const [loading, setLoading] = useState(true);

     const user = useSelector(state => state.auth.user);
     //const lesson = useSelector(state => state.lesson.lesson);
     const dispatch = useDispatch();
     const handleUsernameChange = useCallback(event => {
         setUsername(event.target.value);
     }, []);

     const handleRoomNameChange = useCallback(event => {
         setRoomName(event.target.value);
     }, []);

     const handleSubmit = useCallback(async event => {
         event.preventDefault();

        const submissionData = {
            identity: user.email,
            lessonID: lessonID,
            tutorID: user.id,
            tutorName: user.name,
            tutorEmail: user.email,
            startTime: lesson.dateAndTime,
            subject: lesson.subject
        };

         console.log(lesson);
         axios
            .post("/videoChat/token", submissionData)
            .then(res => {
                setToken(res.data)
            })
            .catch(err => console.log(err))
     }, [username, roomName]);

    

     const handleLogout = useCallback(event => {
         setToken(null);

         const submissionData = { lessonID: lessonID };

         axios
            .post("/tutors/lessonOver", submissionData)
            .then(res => {
                console.log(res);
                //window.location.href = "something"
                dispatch(endLesson()); //idk about this
            })

         
     }, []);

     useEffect(() => {
        axios
        .get("/lesson/lessonByID", { params: { lessonID: lessonID } })
        .then(res => {
            setLesson(res.data);
            setLoading(false);
        })
     }, [])

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
                username={user.name}
                roomName={lesson.subject}
                handleUsernameChange={handleUsernameChange}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={handleSubmit}
             />
         );
     }

     //return render;

     return (
         <div>
         {
             loading ? (
                 <Typography varaint="h5">Loading...</Typography>
             ) : (
                 {render}
             )
         }
         </div>
     )
 };

 export default VideoChat;