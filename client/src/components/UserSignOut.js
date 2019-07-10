import React from 'react';
import { Consumer } from '../components/Context';
import { Redirect } from 'react-router-dom';

const UserSignOut = props => {
  
   return (
        <>
            {/* signgs out the user and redirects user to api/courses page */}
            <Consumer>{value => value.signOut()}</Consumer>
            <Redirect to="/" />  
        </>
    )
};

export default UserSignOut;