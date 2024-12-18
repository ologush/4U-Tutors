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
    const [roomName, setRoomName] = useState(lessonID);
    const [token, setToken] = useState(null);
    const [lesson, setLesson] = useState({});
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

         console.log(lesson)

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
            .post("/videoChat/tutor/token", submissionData)
            .then(res => {
                setToken(res.data)
            })
            .catch(err => console.log(err))
     }, [username, roomName, lesson]);

    

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
        .get("/lesson/tutor/lessonByID", { params: { lessonID: lessonID } })
        .then(res => {
            setLesson(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
     }, [])

     let render;

     if(token) {
         console.log(roomName)
         render = (
             <div>
                 <Room 
                    roomName={roomName} 
                    token={token} 
                    handleLogout={handleLogout} 
                    subject={lesson.subject} 
                    startTime={lesson.dateAndTime}    
                />
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
                date={new Date(lesson.dateAndTime)}
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
                 <div>
                 {render}
                 </div>
             )
         }
         </div>
     )
 };

 export default VideoChat;