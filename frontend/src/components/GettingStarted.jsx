import React from 'react'
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

function GettingStarted(props) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h3">Getting Started</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="1." />
                    <CardMedia 
                        image={require("../1.png")}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            First navigate to the register page, once there fill out the form to register.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="2." />
                    <CardMedia 
                        image={require('../2.png')}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Now that you are registered, go to the login page to login with your new account. Enter your email and password to log in.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="3." />
                    <CardMedia 
                        image={require('../3.png')}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Now you should be at the homepage for your account. From here you can navigate the menu by clicking the three lines on the top left of the screen.
                            From here there are two ways to get lessons. The first is to create a posting for all tutors to see. The other is to request a lesson from a specific tutor. 
                            For the first option see steps 4-6, for the second option see steps 7-10.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="4." />
                    <CardMedia 
                        image={require("../5.png")}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            To make a posting, navigate to the menu and click the Make a Posting option. You will be taken to the posting page.
                            Once on the posting page enter the required information. The checkboxes are tags that relate to the subject you are posting about, check the ones that apply.
                            You must select a lesson type, either single or group. If you have chosen a group lesson you will then be asked for the number of participants, and their emails associated with their account.
                            Next select the times that you are available over the next two weeks.
                            The description that you enter is very important. It should provide a good description of what you hope to learn during the lesson.
                            This will ensure that the tutor can be adequately prepared for the lesson.
                            Next include your year (grade) in school. Then you can click the make posting button.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="5." />
                    <CardMedia 
                        image={require("../6.png")}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Once the lesson posting has been posted, it will be available in the My Postings menu option.
                            If you enter this page you can view and edit all your requests by clicking the edit request button.
                            Once the request has been up for a while you can check if any tutors have bid on the lesson by clicking the view bid button.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="6." />
                    <CardMedia 
                        image={require("../7.png")}
                    />
                    <CardContent>
                        <Typography variant="body1">
                            From here you can select the tutor that you want to run your session. Each tutor will have a description about themself, and a rating displayed.
                            Each tutor will select a time that you set as available.
                            You will then be taken to the payment page, where you will enter your credit card information to pay for the lesson.
                            After the lesson has been payed for the lesson will be confirmed. You have up until 24 hours before the lesson to cancel it.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="7." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            To make a request for a specific tutor open the menu and navigate to the Request a Lesson page. 
                            From here you enter the tutors email associated with their account, and click select. If that email does not match a valid tutor email, you will get a warning.
                            Once a valid tutor email has been entered, enter the course, times, and description as you would with the make a posting.
                            Remember, a thorough description is important for the quality of lesson a tutor is able to provide. After all this has been entered, press submit.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="8." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            After you have sent the request, wait for the tutor to respond. If they accept a time, or decline, you will recieve an email.
                            From this email you can click a link to pay for the lesson to finalize it, or navigate to your pending payments on the menu.
                            Select the pending payment that you want to pay, and it will direct you to a payment page like in the posting. 
                            Fill out your credit card information, and press pay. Now the lesson is confirmed and will be available on the my lessons page.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="9." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            The final way to book a lesson is to request a follow up lesson. This can be done by navigating to the past lessons page on the menu.
                            Once on the past lessons page click the Request another lesson button that will take you to the same page that the lesson request is made on, with the tutors email already filled in.
                            From here do what you did with the lesson request.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="10." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Now that you know how to book a lesson, I will go over the process of being in the lesson. First navigate to the my lessons page.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="11." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Once you are on the my lessons page, all of your upcoming lessons will be displayed. You will be able to cancel up to 24 hours before the lesson.
                            You will be able to enter the lesson five minutes before it's scheduled start time. Once it is available, enter the lobby.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card align="left">
                    <CardHeader title="12." />
                    <CardMedia 
                        image=""
                    />
                    <CardContent>
                        <Typography variant="body1">
                            Now that you are in the lobby, you are free to enter the actual video call any time by pressing the Enter Lesson button.
                            Once you are in the lesson, there will be a timer indicating the amount of time left in the lesson. There is an overflow time of five minutes passed the end time.
                            If this ends, the lesson will automatically be ended. You will be taken to a post lesson page to provide feedback to the tutor.
                            It is required that you provide a rating out of 5, it is not required to write them feedback, however we encourage and appreciate it.
                        </Typography>
                    </CardContent>

                </Card>
            </Grid>

        </Grid>
    )
}

export default GettingStarted;