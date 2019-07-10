import React from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';

const Header = props => {

  return (
    <Consumer>
      {value => (
        <div>
          <div className="header">
            <div className="bounds">
              <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>

              {/* if user is authenticated show welcome message and sign out link, if not show sign up and sign in link*/}
              {value.state.isAuthenticated ? (
                <nav><span>Welcome {value.state.firstName} {value.state.lastName}!</span><NavLink to='/signout' className="signout">Sign Out</NavLink></nav>
              ) : (
                  <nav><NavLink to='/signup' className="signup">Sign Up</NavLink><NavLink to='/signin' className="signin">Sign In</NavLink></nav>
                )
              }
            </div>
          </div>
          <hr />
        </div>
      )}
    </Consumer>
  );
}

export default Header;