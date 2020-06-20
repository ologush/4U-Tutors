import React from 'react';
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
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/displayLessons" component={DisplayLessons} />
            <PrivateRoute exact path="/makePosting" component={MakePosting} />
          </Switch>
        </div>
      </Router>
    </Provider>
    
    
  );
}

export default App;
