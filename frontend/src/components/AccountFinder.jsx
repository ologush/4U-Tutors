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

        let users = [];

        this.props.addedEmails.forEach((value, index) => {
            users.push({email: value, _id: this.props.addedStudentIDs[index]});
        });

        this.state = {
            currentEmailEntry: "",
            addedUsers: users
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    handleChange(e) {
        this.setState({currentEmailEntry: e.target.value});
    }

    handleSubmit(e) {
        
        const searchData = {
            email: this.state.currentEmailEntry
        }
        axios
            .post("/users/findUserByEmail", searchData)
            .then(res => {
                console.log("a")
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
                // if(err.response.data.userNotFound) {
                //     alert(err.response.data.userNotFound)
                // } else {
                //     alert("The server encountered an unknown error, try refreshing the page")
                // }         
                console.log(err);
            })
    }

    deleteStudent(user) {
        //e.preventDefault();
        const idToDelete = user._id;
        
        this.setState(prevState => ({
            addedUsers: prevState.addedUsers.filter((value, index) => {
                return value._id != idToDelete;
            })
        }));
        this.props.deleteStudent(user);
    }  

    

    render()  {
        return(
            <div>
                {
                    this.state.addedUsers.map(user => (
                       
                        <div>
                            
                            <Typography variant="h6">{user.email}</Typography>
                            
                            <IconButton aria-label="delete" onClick={() => this.deleteStudent(user)}>
                                <DeleteIcon />
                            </IconButton>
                            
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
    maxEmails: PropTypes.number,
    addedEmails: PropTypes.array,
    addedStudentIDs: PropTypes.array
};
AccountFinder.defaultProps = {
    isEnabled: true
}

export default AccountFinder;