import React, { Component } from 'react';
import { Provider } from './components/Context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './styles/global.css';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import Forbidden from './components/Forbidden';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

export default  class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        isAuthenticated: false
      }

    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }


  // method for user sign in
  // sends GET request to api/users with parameters as authorization header
  // if response status is 200 (user is authenticated) update global state with response values
  signIn (emailAddress, password) {

    const url = 'http://localhost:5000/api/users';

    axios.get(url, {
      auth: {
        username: emailAddress,
        password: password
      }
    }).then(res => {
      if (res.status === 200){
      this.setState({
        user: {
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          emailAddress: res.data.emailAddress,
          password: res.config.auth.password,
          isAuthenticated: true
        }
      }); 
      }
      console.log('Authenticated');

    }).catch(function(error) {
      console.log('Error on Authentication');
    });
  }

  // method for user sign out
  // removes the user from global state
  signOut() {
    this.setState(
      {
        user: {
          id: '',
          firstName: '',
          lastName: '',
          emailAddress: '',
          password: '',
          isAuthenticated: false
        }
      });
  }

  render() {
    return (
      // <Provider> provides values to Consumer to use in components
      <Provider value={{
        state: this.state.user,
        signIn: this.signIn,
        signOut: this.signOut,
      }}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <Courses />} />
              {/* <PrivateRoute> checks if user is authenticated, if not redirects to /api/signin page */}
              <PrivateRoute exact path="/courses/create" component={CreateCourse} user={this.state.user} />
              <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
              <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
              <Route exact path="/signin" render={() => <UserSignIn />} />
              <Route exact path="/signup" render={() => <UserSignUp signIn={this.signIn} />} />
              <Route exact path="/signout" render={() => <UserSignOut />} />
              <Route exact path="/forbidden" render={() => <Forbidden />} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>

    )
  }
}