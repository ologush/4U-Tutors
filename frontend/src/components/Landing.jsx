import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import Divider from "@material-ui/core/Divider"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import { makeStyles } from "@material-ui/styles/"



function Landing(props) {
    
    // return (
    //     <Grid container spacing={2} direction="column">
    //         <Grid item xs={12}>
    //             <Paper>
    //                 <Typography variant="h5">
    //                     About Us
    //                 </Typography>
    //                 <Typography variant="body1">
    //                     4U Academics was created by Will King, a third-year Engineering student at Queeen’s University, Kingston, Ontario.  As a student athlete during his high school years, Will has experienced first-hand the challenges of keeping up with a demanding high school curriculum while spending significant time away from the classroom.  While working on-line to complete his second year curriculum last spring, Will realized the potential impact and challenges of removing learners from the traditional classroom.  Additionally, as both he and many of his peers saw their part-time jobs this fall disappear as on-campus services shut down, he recognized a need for university students to continue to earn income to pay tuition fees for the upcoming year.  Will is excited to launch an affordable win-win solution for Ontario students during the coming academic year and hopes to make a positive difference in students and parents lives during the ongoing pandemic.
    //                 </Typography>
    //                 <Typography variant="body1">

    //                 </Typography>
    //             </Paper>
    //         </Grid>
    //         <Grid item xs={12}>
    //             <Paper>
    //                 <Typography variant="h5">
    //                     Getting Started
    //                 </Typography>
    //                 <Typography variant="body1">
    //                     4U Academics was built by university students, to help with the academic struggles that COVID-19 may cause with their high-school level peers,  and provide them with a cost effective and local solution. It is imperative that Canadians support each other during these trying times, and 4U Academics is committed to help secondary school students by partnering them with the right university students to meet their academic needs.   4U Academics will do this by providing a single on-line location for students to request, select, meet, pay, and schedule times with a tutor of their choosing. 4U Academics will provide these services for students, but at a fraction of the cost of traditional options, while giving the consumer the control throughout the whole process. 
	// 4U Academics puts the power in the student’s and parents' hands, as they can request a lesson, outline their desires and criteria for a tutor, and select one of the candidates through the integrated tutor database. Once a tutor is selected, the student can book a time, and finalize the session before it starts. At the time of the session, the student will log into the site, select their session, and start learning! Once the session is over the student has the option to book another lesson with the same tutor, and after every session the students can anonymously leave feedback and a rating for the tutor. 4U Academics will record and monitor every session that is run, so if there are any concerns, the session can be reviewed to ensure a safe and enjoyable experience for everyone.
	// One of 4U Academics differentiating factors is its exclusive use of post-secondary students as tutors. University students submit their transcripts to apply to tutor courses in which they showed mastery, which allows them to help prepare their students for university curriculums. Additionally, the tutors are able to provide recent and applicable perspectives on courses and relate with current students learning styles and challenges. Along with their knowledge, all 4U Academics tutors are equipped with model curriculums recommended by current Ontario Teachers to ensure they are delivering the most applicable material to the students. 4U Academics uses university students to facilitate mutually beneficial relationships, which allow students to receive tutoring at significantly lower costs then traditional 

    //                 </Typography>
    //             </Paper>
    //         </Grid>
    //         <Grid item xs={12}>
    //             <Paper>
    //                 <Typography variant="h5">
    //                     Tutor of the Week
    //                 </Typography>
    //             </Paper>
    //         </Grid>
    //     </Grid>
    // )

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h3">Welcome</Typography>
                </Paper>
            </Grid>
            <Grid item container xs={12} direction="row" spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Tutor of the Week"  />
                        <Divider />
                        <CardMedia>
                            {/* <img src={require("../jon")} /> */}
                        </CardMedia>
                        <CardContent align="left">
                            <Typography variant="h5">About Jon:</Typography>
                            <Typography variant="body1">Description</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title="Frequently Asked Questions" />
                        <Divider />
                        <CardContent align="left">
                            <Typography variant="h6">How do I get started?</Typography>
                            <Typography variant="body1">First sign up for an account on our register page. Then sign in and navigate the menu to make a posting. For more information visit our getting started page.</Typography>
                            <Divider />
                            <Typography variant="h6">Is my credit card information secure?</Typography>
                            <Typography variant="body1">We use a third party service to manage payments. Additionally we do not save any credit card data so it is completely secure.</Typography>
                            <Divider />
                            <Typography variant="h6">How much will  a sesion cost?</Typography>
                            <Typography variant="body1">All sessions will cost between $25 and $30 per hour, depending on the time of booking, and the selected tutor. Non-peak times during school days (between 9am - 4pm) are less expensive than peak evening times.</Typography>
                            <Divider />
                            <Typography variant="h6">Who are your tutors?</Typography>
                            <Typography variant="body1">Our 4U Academics tutors are top university students from across the province and country. Tutors apply with their university and high school transcripts and undergo a background check. 4U Academics vets and selects the top students who have shown mastery in their areas of expertise at both the high school and post secondary level, and who also have experience working with youth as mentors, camp counselors, or sports coaches. </Typography>
                            <Divider />
                            <Typography variant="h6">Unsure About Online Tutoring?</Typography>
                            <Typography variant="body1">Online tutoring has been used for several years as a substitute for in-person sessions in a variety of education settings. 4U Academics uses a in-depth screening process to make sure that all our tutors are equipped to help your young learners. Each tutor must pass a basic background check, and they must have experience working with young adults and teens. Additionally, 4U Academic tutoring sessions are recorded and stored online to ensure quality and safety for everyone, and that any discrepancies or concerns can be reviewed and addressed.  In today’s COVID age, on-line tutoring offers unparalleled safety learning from your own home.</Typography>
                            <Divider />
                            <Typography variant="h6">What if our child doesn’t like their tutor?</Typography>
                            <Typography variant="body1">We encourage feedback so we can continuously improve our services, and make sure we are doing the best possible job matching students with tutors.  Please use our rating system to provide feedback, and also contact us with any concerns or for 1:1 discussion.  At any time, you are free to cancel or change tutors to find the best match for you.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper spacing={20}>
                    <Box m={2} pt={3} pb={3}>
                <Button variant="contained"  color="primary" onClick={() => window.location.href= "/gettingStarted"}>Getting Started</Button>
                </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Landing;