import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    onDateChange(date) {
        this.setState({ dateOfBirth: date });
    };

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return(
            <Card>
                <CardContent>
                    <Typography variant='h3'>Register</Typography>
                </CardContent>
                <CardContent>
                    <Typography>Register for engsoc dash using a valid Queen's University email</Typography>
                </CardContent>
                <form onSubmit={this.onSubmit}>

                
                <CardActions>
                    <TextField error={errors.name} onChange={this.onChange} required id="name" label="Name" className={classnames("", {
                        invalid: errors.name
                    })} />

                <span className="red-text">{errors.name}</span>
                    

                    
                </CardActions>
                <CardActions>
                    <TextField error={errors.email} onChange={this.onChange} required id="email" label="Email" helperText="Please use a valid Queen's email" className={classnames("", {
                        invalid: errors.email
                    })} />
                    <span className="red-text">{errors.email}</span>
                </CardActions>


                <CardActions>
                    <TextField error={errors.password} onChange={this.onChange} required id="password" label="Password" className={classnames("", {
                        invalid: errors.password
                    })}/>
                    <span className="red-text">{errors.password}</span>
                </CardActions>
                <CardActions>
                    <TextField error={errors.password2} onChange={this.onChange} required id="password2" label="Confirm Password"  className={classnames("", {
                        invalid: errors.password2
                    })}/>
                    <span className="red-text">{errors.password2}</span>

                </CardActions>
                <CardActions>
                    <Button type="Submit">Register</Button>
                </CardActions>
                </form>
            </Card>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});



export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));

