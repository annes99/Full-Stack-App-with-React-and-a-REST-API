import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';
import axios from 'axios';

class CreateCourse extends Component {

    constructor() {
        super();
        this.state = { 
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   // Handles form input changes and updates this.state
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    // Handles submitting the form. 
    // POST request to api/courses with current state values and authenticates the user
    // then redirects user back to same(updated) api/courses/id page
    // if there's error this.state error vill be updated

    handleSubmit(e) {

        e.preventDefault();
        const url = 'http://localhost:5000/api/courses';

        axios({
            method: 'post',
            url: url,
            auth: {
                username: this.props.value.state.emailAddress,
                password: this.props.value.state.password
            },
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
            }
          })

          .then(res => {
            this.props.history.push(`/courses/${res.headers.location}`);

            }, (error) => {
                if (error) {
                // handle error here
                    this.setState({
                        error: error.response.data.errors
                    });
                }
            }
        );
    }

    render() {
        return (
            <Consumer>
            {value => (

                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        {/* checking if theres any errors, if so show them */}
                        {this.state.error != ''? (
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        <li>{this.state.error[0]}</li>
                                        <li>{this.state.error[1]}</li>
                                    </ul>
                                </div>
                            </div>
                        ):(
                            null
                        )

                        }
                        <form onSubmit={this.handleSubmit}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        onChange={this.handleChange}
                                        autoFocus 
                                        /></div>
                                    <p>By {value.state.firstName} {value.state.lastName} </p>
                                </div>
                                <div className="course--description">
                                    <div><textarea 
                                        id="description" 
                                        name="description"
                                        placeholder="Course description..."
                                        onChange={this.handleChange}
                                        defaultValue={""} /></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input" 
                                                placeholder="Hours"
                                                onChange={this.handleChange}
                                                defaultValue={""}
                                                /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                placeholder="List materials..."
                                                onChange={this.handleChange}
                                                defaultValue={""} /></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom"><button 
                                className="button" 
                                type="submit">Create Course</button>
                                <NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink></div>
                        </form>
                    </div>
                </div>
            )}
            </Consumer>
        );
    }

}

// use the Consumer to set CreateCourse info the value prop, so I can use Consumer values outside render method
export default props => (
    <Consumer>
      {value => < CreateCourse {...props} value={value} />}
    </Consumer>
);