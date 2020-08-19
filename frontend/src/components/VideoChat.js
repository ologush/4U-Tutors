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
     
     
     console.log(user)
     //const lesson = useSelector(state => state.lesson.lesson);
     const dispatch = useDispatch();

    useEffect(() => {
        axios
        .get("/lesson/user/lessonByID", { params: { lessonID: lessonID }})
        .then(res => {
            setLesson(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [])


     const handleUsernameChange = useCallback(event => {
         setUsername(event.target.value);
     }, []);

     const handleRoomNameChange = useCallback(event => {
         setRoomName(event.target.value);
     }, []);

     const handleSubmit = useCallback(async event => {
         event.preventDefault();

         console.log(lesson);

        const submissionData = {
            identity: user.email,
            lessonID: lessonID,
            studentID: user.id,
            studentName: user.name,
            studentEmail: user.email,
            startTime: lesson.dateAndTime,
            subject: lesson.subject
        };

         axios
            .post("/videoChat/user/token", submissionData)
            .then(res => {
                setToken(res.data)
            })
            .catch(err => console.log(err))
     }, [username, roomName, lesson]);

     const handleLogout = useCallback(event => {
         setToken(null);

        const submissionData = { lessonID: lessonID}

         axios
            .post("/users/lessonOver", submissionData)
            .then(res => {
                console.log(res);
                dispatch(endLesson());
                window.location.href = "/postLesson/" + lessonID;
            })
            .catch(err => console.log(err));
         

         //dispatch(endLesson());

     }, []);

     const handleTimeout = () => {
         console.log('over')
         handleLogout()
     }

     let render;

     if(token) {
         render = (
             
                <Room 
                    roomName={roomName} 
                    token={token} 
                    handleLogout={handleLogout} 
                    subject={lesson.subject}
                    startTime={lesson.dateAndTime}    
                />
             
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
                    date={new Date(lesson.dateAndTime)}
                />
             
             </div>
             
         );
     }

     return (
         <div>
             {
                 loading ? (
                    <Typography variant="h5">Loading...</Typography>
                 ) : (
                     render
                 )
             }
         </div>
     )
 };

 export default VideoChat;