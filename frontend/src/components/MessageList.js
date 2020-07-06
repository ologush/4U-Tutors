import React, { Component } from 'react'
import PropTypes from "prop-types"
import Message from "./Message"

class MessageList extends Component {
    constructor() {
        super();
    }

    componentDidUpdate = () => {
        this.componentDidUpdate.scrollTop = this.componentDidUpdate.scrollHeight;
    }

    render() {
        return(
            <div className="MessageList" ref={(node) => (this.node = node)}>
                {this.props.messages.map((message, i) => (
                    <Message key={i} {...message} />
                ))}

            </div>
        );
    }

}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
};

MessageList.defaultProps = {
    messages: []
};

export default MessageList;