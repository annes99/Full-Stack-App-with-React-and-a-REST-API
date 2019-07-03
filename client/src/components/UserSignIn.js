import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';


class UserSignIn extends Component {

    constructor() {
        super();
        this.state = { 
            emailAddress: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Consumer>
            {value => (
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign In</h1>
                        <div>
                            <form>
                                <div>
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress" 
                                        type="text" 
                                        placeholder="Email Address" 
                                        autoFocus
                                        value={this.state.emailAddress}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange} 
                                    />
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <NavLink
                                        to='/' 
                                        className="button"
                                        onClick={()=> value.signIn(this.state.emailAddress, this.state.password)}
                                        >Sign In</NavLink>
                                    <NavLink to='/' className="button button-secondary">Cancel</NavLink>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
                    </div>
                </div> 
            )}
            </Consumer>
        );
    }
}

export default UserSignIn;