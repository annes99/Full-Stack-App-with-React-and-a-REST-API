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
    }

    async componentDidMount() {
        const id = await this.props.match.params.id;

     await axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
            this.setState({ course: response.data.course, user: response.data.course.User});
            console.log(response.data.course);
        })
        .catch(console.log);
    }

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <NavLink to={`/courses/${this.state.course.id}/update`} className="button">Update Course</NavLink>
                                <NavLink to='/tosomewhere' className="button">Delete Course</NavLink>
                            </span>
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
        );
    }

}

export default CourseDetail;