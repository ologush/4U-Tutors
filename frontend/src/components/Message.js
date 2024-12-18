import React, { Component } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"

class Message extends Component {

    render() {
        const classes = classNames('Message', {
            log: !this.props.author,
            me: this.props.me
        })

        return(
            <div className={classes}>
                {this.props.author && (
                    <span className="author">{this.props.author}:</span>
                )}
                {this.props.body}
            </div>
        );
    }
    
}

Message.propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool
};

export default Message; 