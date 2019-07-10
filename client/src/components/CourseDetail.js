import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Consumer } from '../components/Context';

class CourseDetail extends Component {

    constructor() {
        super();
        // keeping all fetched data states
        this.state = {
          course: [],
          user:[]
        };
        this.handleRemove = this.handleRemove.bind(this);
    }
    // when component mounts GET current course data and update this.state with response values
    async componentDidMount() {
        const id = await this.props.match.params.id;

     await axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(res => {
            this.setState({ course: res.data.course, user: res.data.course.User});
        })
        .catch((err) => {
            console.log(err);
        });  
    }

    // handleRemove deletes current course 
    // sends DELETE request to api/courses/:id with current state values and authenticates the user
    // asks confirmation for deleting the course
    // then redirects user back to api/coursespage

    handleRemove = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const url = `http://localhost:5000/api/courses/${id}`;

        if(window.confirm('Are you sure you want to permanently delete this course?')) {

            axios.delete(url, {
                auth: {
                    username: this.props.value.state.emailAddress,
                    password: this.props.value.state.password
                }
            })
                .then(res => {
                    this.props.history.push(`/`);
                })
                .catch((err) => {
                    console.log(err);
                }); 
        }
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    {/* if user is authenticated and user id matches course owners id => show links to Update and Delete courses */}
                                    {value.state.isAuthenticated && this.state.course.userId === value.state.id ? (
                                    <span>
                                        <NavLink to={`/courses/${this.state.course.id}/update`} className="button">Update Course</NavLink>
                                        <NavLink to={`/courses/${this.state.course.id}`} onClick={this.handleRemove} className="button">Delete Course</NavLink>
                                    </span>
                                    ) : (
                                        null
                                    )
                                    }
                                    <NavLink to='/' className="button button-secondary">Return to List</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="bounds course--detail">                 
                            <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.course.title}</h3>
                                <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                            </div>
                            <div className="course--description">
                                <ReactMarkdown source={this.state.course.description} />
                            </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{this.state.course.estimatedTime}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
                                    </li>
                                    </ul>
                                </div>
                            </div> 
                        </div>
                    </div>  
                )}
            </Consumer>
        );
    }
}
// use the Consumer to set CourseDetail info the value prop, so I can use Consumer values outside render method

export default props => (
    <Consumer>
      {value => < CourseDetail {...props} value={value} />}
    </Consumer>
);