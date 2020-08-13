import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser} from "./actions/authActions"


import { Provider } from "react-redux"
import store from "./store"


import NavBar from "./components/NavBar"
import Register from './components/Register'
import Login from './components/Login'
import Landing from './components/Landing'
import PrivateRoute from "./components/private-route/PrivateRoute"
import Dashboard from "./components/StudentDashboard"
import DisplayLessons from "./components/DisplayLessons"
import MakePosting from "./components/MakePosting"
import VideoChat from "./components/VideoChat"
import MyPostings from "./components/MyPostings"
import Payment from "./components/Payment"
import SelectBid from "./components/SelectBid"
import Timer from "./components/Timer"
import ReBook from "./components/ReBook"
import PostLesson from "./components/PostLesson"
import PastLessons from "./components/PastLessons"
import Grid from "@material-ui/core/Grid"
import TutorFinder from "./components/TutorFinder"
import LessonRequest from "./components/LessonRequest"
import RequestPayment from "./components/RequestPayment"
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import Payout from "./components/Payout"
import AccountSettings from "./components/AccountSettings"
import MyRequests from "./components/MyRequests"
import PayForRequest from "./components/PayForRequest"
import PendingPayments from "./components/PendingPayments"

import Paper from "@material-ui/core/Paper"

import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import clsx from "clsx"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "./theme"
const drawerWidth = 240;



const stripePromise = loadStripe('pk_test_51H7oaAFvYqAjSG5i5XoVmFeBNE7rPgvwrXbA9GNOFuFc6RkCevXgfVMLFTVBmMGRKMH7zwOSqOZiO3KvKxBUztBV00j6fEfFKo');

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: 64
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth,
  },
  header: {
    display: 'flex',
    alighItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}))

if(localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}





function App() {

  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(prev => !prev);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
          
          <NavBar handleMenu={handleMenu}/>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: openMenu,
            })}
          >

          
          
            <Paper>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Elements stripe={stripePromise}>
            <Route exact path="/test" component={Payout} />
          </Elements>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/displayLessons" component={DisplayLessons} />
            <PrivateRoute exact path="/makePosting" component={MakePosting} />
            <PrivateRoute exact path="/videoChat/:lessonID" component={VideoChat} />
            <PrivateRoute exact path="/myPostings" component={MyPostings} />
            <PrivateRoute exact path="/editPosting/:postingID" component={MakePosting} />
            
            
            
            <PrivateRoute exact path="/postLesson/:lessonID" component={PostLesson} />
            <PrivateRoute exact path="/pastLessons" component={PastLessons} />
            <PrivateRoute exact path="/requestLesson" component={LessonRequest} />
            <PrivateRoute exact path="/accountsettings" component={AccountSettings} />
            <PrivateRoute exact path="/myRequests" component={MyRequests} />
            <PrivateRoute exact path="/pendingPayments" component={PendingPayments} />
            <Elements stripe={stripePromise}>
              <PrivateRoute exact path="/selectBid/:postingID" component={SelectBid} />
              <PrivateRoute exact path="/pay/:paymentID" component={PayForRequest} />
            </Elements>
          </Switch>
          </Paper>
          
          </main>
          </ThemeProvider>
        </div>
      </Router>
    </Provider>
    
    
  );
}

export default App;
