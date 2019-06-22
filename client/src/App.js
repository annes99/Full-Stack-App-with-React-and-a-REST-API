import React, { Component } from 'react';
import { Provider } from './components/Context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './styles/global.css';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';


export default  class App extends Component {

  render() {
    return (
      <Provider>
      {/* <Provider value={this.state}> */}
        <BrowserRouter>
          <div>
            <Header />
              <Switch>
                
                <Route exact path="/" render={() => <Courses />}/>
                <Route exact path="/courses/create" render={() => <CreateCourse  />} />
                <Route exact path="/courses/:id/update" render={() => <UpdateCourse />} />
                <Route exact path="/courses/:id" render={() => <CourseDetail />} />
                <Route exact path="/signin" render={() => <UserSignIn />} />
                <Route exact path="/signup" render={() => <UserSignUp />} />
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