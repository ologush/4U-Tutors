import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

function Landing(props) {
    
    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        About Us
                    </Typography>
                    <Typography variant="body1">
                        4U Academics was created by Will King, a third-year Engineering student at Queeen’s University, Kingston, Ontario.  As a student athlete during his high school years, Will has experienced first-hand the challenges of keeping up with a demanding high school curriculum while spending significant time away from the classroom.  While working on-line to complete his second year curriculum last spring, Will realized the potential impact and challenges of removing learners from the traditional classroom.  Additionally, as both he and many of his peers saw their part-time jobs this fall disappear as on-campus services shut down, he recognized a need for university students to continue to earn income to pay tuition fees for the upcoming year.  Will is excited to launch an affordable win-win solution for Ontario students during the coming academic year and hopes to make a positive difference in students and parents lives during the ongoing pandemic.
                    </Typography>
                    <Typography variant="body1">

                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        Getting Started
                    </Typography>
                    <Typography variant="body1">
                        4U Academics was built by university students, to help with the academic struggles that COVID-19 may cause with their high-school level peers,  and provide them with a cost effective and local solution. It is imperative that Canadians support each other during these trying times, and 4U Academics is committed to help secondary school students by partnering them with the right university students to meet their academic needs.   4U Academics will do this by providing a single on-line location for students to request, select, meet, pay, and schedule times with a tutor of their choosing. 4U Academics will provide these services for students, but at a fraction of the cost of traditional options, while giving the consumer the control throughout the whole process. 
	4U Academics puts the power in the student’s and parents' hands, as they can request a lesson, outline their desires and criteria for a tutor, and select one of the candidates through the integrated tutor database. Once a tutor is selected, the student can book a time, and finalize the session before it starts. At the time of the session, the student will log into the site, select their session, and start learning! Once the session is over the student has the option to book another lesson with the same tutor, and after every session the students can anonymously leave feedback and a rating for the tutor. 4U Academics will record and monitor every session that is run, so if there are any concerns, the session can be reviewed to ensure a safe and enjoyable experience for everyone.
	One of 4U Academics differentiating factors is its exclusive use of post-secondary students as tutors. University students submit their transcripts to apply to tutor courses in which they showed mastery, which allows them to help prepare their students for university curriculums. Additionally, the tutors are able to provide recent and applicable perspectives on courses and relate with current students learning styles and challenges. Along with their knowledge, all 4U Academics tutors are equipped with model curriculums recommended by current Ontario Teachers to ensure they are delivering the most applicable material to the students. 4U Academics uses university students to facilitate mutually beneficial relationships, which allow students to receive tutoring at significantly lower costs then traditional 

                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant="h5">
                        Tutor of the Week
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Landing;