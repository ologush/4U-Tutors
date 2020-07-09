import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"
import axios from 'axios';
import TextField from "@material-ui/core/TextField"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"

class AccountFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentEmailEntry: "",
            addedUsers: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);

    }

    handleChange(e) {
        this.setState({currentEmailEntry: e.target.value});
        console.log(e.target);
    }

    handleSubmit(e) {
        
        const searchData = {
            email: this.state.currentEmailEntry
        }
        axios
            .post("/users/findUserByEmail", searchData)
            .then(res => {
                console.log(res);
                const newUser = {
                    email: res.data.email,
                    _id: res.data._id
                };

                this.setState(prevState => ({
                    addedUsers: [...prevState.addedUsers, newUser],
                    currentEmailEntry: ""
                }));

                this.props.addStudent(newUser);
                

            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteStudent(e) {
        e.preventDefault();
        console.log(e.target);
        console.log(e.target.id);
        const idToDelete = e.target.id;
        
        
        this.setState(prevState => ({
            addedUsers: prevState.addedUsers.filter((value, index) => {
                return value._id != idToDelete;
            })
        }));
        this.props.deleteStudent(idToDelete);

    }  

    

    render()  {
        return(
            <div>
                {
                    this.state.addedUsers.map(user => (
                        <div>
                            <Typography variant="h6">{user.email}</Typography>
                            <button id={user._id} onClick={this.deleteStudent}>
                                X
                            </button>
                        </div>
                        
                    ))
                }
                <TextField disabled={this.props.maxEmails <= this.state.addedUsers.length } value={this.state.currentEmailEntry} onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}>Add</Button>
            </div>
        );
    }
}

AccountFinder.propTypes = {
    addStudent: PropTypes.func.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    maxEmails: PropTypes.bool
};
AccountFinder.defaultProps = {
    isEnabled: true
}

export default AccountFinder;