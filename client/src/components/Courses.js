import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
    constructor() {
        super();
        // keeping all fetched data states
        this.state = {
            courses: []
        };
    }
    // when component mounts GET current course data and update this.state with response values
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {
                this.setState({ courses: res.data.courses });
            })
            .catch(console.log);
    }

    

    render() {
        return (
            <div className="bounds">
                {/* map through courses in current state and show them */}
                {this.state.courses.map((course) =>
                    <div className="grid-33" key={course.id}>
                        <NavLink to={`/courses/${course.id}`} className="course--module course--link">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </NavLink>
                    </div>
                )}

                <div className="grid-33">
                    <NavLink to='/courses/create' className="course--module course--add--module">
                        <h3 className="course--add--title">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 13 13"
                                className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                            </svg>New Course
                        </h3>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Courses;
