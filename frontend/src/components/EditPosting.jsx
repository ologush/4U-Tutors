import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField"


class EditPosting extends Component {
    constructor() {
        super();

        this.state = {
            course: this.props.posting.course,
            infoTags: this.props.posting.infoTags,
            description: this.props.posting.description,
            year: this.props.posting.year
        };
    }

    render() {
        return(
            <div>
                
            </div>
        );
    }
}

EditPosting.propTypes = {
    posting: PropTypes.object.isRequired,
    submitEdit: PropTypes.func.isRequired
};