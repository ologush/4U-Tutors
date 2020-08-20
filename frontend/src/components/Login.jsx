import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"


const styles = {
    
}

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;
        return(
            <Card>
                <CardContent>
                    <Typography variant="h3">
                        Login
                    </Typography>
                </CardContent>
                <form onSubmit={this.onSubmit}>

                
                <CardActions>
                    <TextField error={errors.email} id="email" onChange={this.onChange} label="Email" helperText="Please provide a valid account email" className={classnames("", {
                        invalid: errors.email || errors.emailNotFound
                    })}/>
                    <span className="red-text">
                        {errors.email}
                        {errors.emailNotFound}
                    </span>
                </CardActions>
                <CardActions>
                    <TextField type="password" error={errors.password} id="password" onChange={this.onChange} label="Password" className={classnames("", {
                        invalid: errors.password || errors.passwordIncorrect
                    })}/>
                    <span className="red-text">
                        {errors.password}
                        {errors.passwordIncorrect}
                    </span>
                </CardActions>

                <CardActions>
                    <Button type="Submit" variant="contained" color="primary">Login</Button>
                </CardActions>
                </form>
            </Card>
        );
    }


}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);