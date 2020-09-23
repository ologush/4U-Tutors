import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"
import { Provider } from "react-redux"
import store from "./store"

import Apply from "./components/Apply"
import HomePage from "./components/HomePage"
import BookingPage from "./components/BookingPage"
import Register from "./components/Register"
import Login from "./components/Login"
import Landing from "./components/Landing"
import PrivateRoute from "./components/private-route/PrivateRoute"
import Dashboard from "./components/TutorDashboard"
import DisplayLessons from "./components/DisplayLessons"
import VideoChat from "./components/VideoChat"
import FindPostings from "./components/FindPostings"
import Request from "./components/Request"
import Requests from "./components/Requests"
import AccountSettings from "./components/AccountSettings"
import NavBar from "./components/NavBar"
import SaveStripe from "./components/SaveStripe"
import MyBids from "./components/MyBids"
import Test from "./components/Test"
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import Applied from "./components/Applied"

import PastLessons from "./components/PastLessons"
import LessonsPending from "./components/LessonsPending"

import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline"

import clsx from 'clsx'

const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    //marginLeft: -drawerWidth,
    
    marginTop: 64
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth,
    //marginTop: 64
  },
  header: {
    display: 'flex',
    alignItems: 'center',
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
    setOpenMenu(prev => !prev)
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ThemeProvider theme={theme}>
            <CssBaseline />
          <NavBar handleMenu={handleMenu} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: openMenu,
            })}
          >
            
         
          <Route exact path="/" component={Landing} />
          <Route exact path="/secretRegisterPage" component={Register} />
          <Route exact path="/apply" component={Apply} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/applied" component={Applied} />
          <Switch>
            <PrivateRoute exact path="/homePage" component={HomePage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/myLessons" component={DisplayLessons} />
            <PrivateRoute exact path="/videoChat/:lessonID" component={VideoChat} />
            <PrivateRoute exact path="/findPostings" component={FindPostings} />
            <PrivateRoute exact path="/booking/:postingID" component={BookingPage} />
            <PrivateRoute exact path="/request/:requestID" component={Request} />
            <PrivateRoute exact path="/requests" component={Requests} />
            <PrivateRoute exact path="/accountSettings" component={AccountSettings} />
            <PrivateRoute path="/savestripe" component={SaveStripe} />
            <PrivateRoute exact path="/myBids" component={MyBids} />
            <PrivateRoute exact path="/lessonsPendingPayment" component={LessonsPending} />
            <PrivateRoute exact path="/pastLessons" component={PastLessons} />
          </Switch>
          
          </main>
          </ThemeProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
