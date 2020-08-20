import React, { useState, useEffect } from 'react'
import Video from 'twilio-video';
import Participant from './Participant'
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Timer from "./Timer"

const Room = ({ roomName, token, handleLogout, subject, startTime}) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    

    useEffect(() => {
        const participantConnected = participant => {
            setParticipants(prevParticipants => [...prevParticipants, participant]);
        };
        const participantDisconnected = participant => {
            setParticipants(prevParticipants =>
                prevParticipants.filter(p => p != participant)
            );
        };
        console.log(roomName);
        Video.connect(token, {
            name: roomName
        }).then(room => {
            setRoom(room);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.participants.forEach(participantConnected);
        });
    
        return () => {
            setRoom(currentRoom => {
                if(currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            })
        }
    }, [roomName, token]);

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    const handleTimeout = () => {
        handleLogout();
    };

    // return (
    //     <div className="room">
    //         <h2>Room: {roomName}</h2>
    //         <button onClick={handleLogout}>Log out</button>
    //         <div className="local-participant">
    //             {room ? (
    //                 <Participant key={room.localParticipant.sid}
    //                             participant={room.localParticipant}
    //                 />
    //             ) : (
    //                 ''
    //             )}
    //         </div>
    //         <h3>Remote Participants</h3>
    //         <div className="remote-participants">{remoteParticipants}</div>
    //     </div>
    // );

    return (
        <Grid container spacing={2}>
            <Grid item container xs={11}>
                {
                    remoteParticipants.length > 3 ? (
                        remoteParticipants.map(participant => (
                            <Grid item xs={4}>
                                {participant}
                            </Grid>
                        ))
                     ) : (
                        remoteParticipants.map(participant => (
                            <Grid item xs={12/remoteParticipants.length}>
                                {participant}
                            </Grid>
                        ))
                     )
                }
            </Grid>
            <Grid item container xs={1} direction="column" wrap="nowrap">
                
                <Card>
                    <CardContent>
                        <Typography variant="h6">Room: {subject}</Typography>
                        <Timer 
                            startTime={new Date(startTime)}
                            onTimeOut={handleTimeout}
                        />
                    </CardContent>
                    <CardMedia>
                        {
                            room ? (
                                <Participant key={room.localParticipant.sid}
                                    participant={room.localParticipant}
                                />
                            ) : (
                                ""
                            )
                        }
                    </CardMedia>
                    <CardActions>
                        <Button variant="contained" onClick={handleLogout}>Exit Lesson</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Room;