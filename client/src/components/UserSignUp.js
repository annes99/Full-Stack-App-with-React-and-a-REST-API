import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';
import axios from 'axios';
import { withRouter } from "react-router";

class UserSignUp extends Component {

    constructor() {
        super();
        this.state = { 
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();
        const url = 'http://localhost:5000/api/users';
    
        axios.post(url, { 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            password: this.state.password 

        })
          .then(res => {
          console.log(res);
          this.props.signIn(this.state.emailAddress, this.state.password);
          this.props.history.push("/");
    
        })
        .catch(function(error) {
            console.log(error);
          console.log('Error creating user');
        });
    }

    render() {
        return (
            <Consumer>
            {value => (
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign Up</h1>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div><input 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    autoFocus /></div>
                                <div><input 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text"
                                    placeholder="Last Name" 
                                    onChange={this.handleChange}
                                    /></div>
                                <div><input 
                                    id="emailAddress" 
                                    name="emailAddress" 
                                    type="text" 
                                    placeholder="Email Address"
                                    onChange={this.handleChange}
                                    /></div>
                                <div><input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    /></div>
                                <div><input 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    /></div>
                                <div className="grid-100 pad-bottom"><button 
                                    className="button"
                                    type="submit">Sign Up</button>
                                <NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink></div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
                    </div>
                </div>

            )}
            </Consumer>
        );
    }

}

export default withRouter(UserSignUp);