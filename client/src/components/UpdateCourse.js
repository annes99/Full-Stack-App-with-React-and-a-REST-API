import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';
import axios from 'axios';



class UpdateCourse extends Component {

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
    // when components mounts GET the current course data, so update course input fields are pre filled
    async componentDidMount() {
        const id = await this.props.match.params.id;

     axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(res => {
            this.setState({ 
                title: res.data.course.title,
                description: res.data.course.description,
                materialsNeeded: res.data.course.materialsNeeded, 
                estimatedTime: res.data.course.estimatedTime
            });
        })
        .catch((err) => {
            console.log(err);
        });  
    }
   // Handles form input changes and updates this.state
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    // Handles submitting the form. 
    // PUT request to api/courses/:id with current state values and authenticates the user
    // then redirects user back to same(updated) api/courses/id page
    // if there's error this.state error will be updated
    handleSubmit(e) {
        const id = this.props.match.params.id;
        e.preventDefault();
        const url = `http://localhost:5000/api/courses/${id}`;

        axios({
            method: 'put',
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
                this.props.history.push(`/courses/${id}`);

            }, (error) => {
                if (error) {
                    // handle error here
                    this.setState({
                        error: error.response.data.errors
                    });
                }
            });
    }

    render() {
        const id = this.props.match.params.id; 
        return (
            <div className="bounds course--detail">
            <h1>Update Course</h1>
                {this.state.error !== '' ? (
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>{this.state.error[0]}</li>
                                <li>{this.state.error[1]}</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                        null
                    )
                }
            <div>
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
                        defaultValue={this.state.title}
                        onChange={this.handleChange}
                        autoFocus
                        /></div>
                    <p>By {this.props.value.state.firstName} {this.props.value.state.lastName}</p>
                    </div>
                    <div className="course--description">
                    <div><textarea 
                        id="description" 
                        name="description"
                        placeholder="Course description..." 
                        value={this.state.description}
                        onChange={this.handleChange}
                        />
                    </div>
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
                            className="course--time--input" 
                            placeholder="Hours" 
                            defaultValue={this.state.estimatedTime} 
                            onChange={this.handleChange}
                            /></div>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                            <textarea
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                placeholder="List materials..." 
                                value={this.state.materialsNeeded}
                                onChange={this.handleChange}
                            />
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button>
                <NavLink to={`/courses/${id}`}><button className="button button-secondary">Cancel</button></NavLink></div>
                </form>
            </div>
            </div>
        );
    }
}

// use the Consumer to set UpdateCourse info the value prop, so I can use Consumer values outside render method
export default props => (
    <Consumer>
      {value => < UpdateCourse {...props} value={value} />}
    </Consumer>
);