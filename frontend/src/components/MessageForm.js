import React, { Component } from 'react'

import PropTypes from "prop-types"

class MessageForm extends Component {
    constructor(props) {
        super(props);

        
    }

    componentDidMount() {
        this.input.focus();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.onMessageSend(this.input.value);
        this.input.value = "";
    }

    render() {
        return(
            <div>
                <form className="MessageForm" onSubmit={this.handleFormSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            ref={(node) => (this.input = node)}
                            placeholder="Enter your message..."
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


MessageForm.propTypes = {
    onMessageSend: PropTypes.func.isRequired
};

export default MessageForm;