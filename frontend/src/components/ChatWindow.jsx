import React, { Component } from 'react'
import axios from "axios"
import Message from "./Message"
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import TwilioChat from "twilio-chat"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0,
        color: "green"
    }
};
   


class ChatWindow extends Component {
    
    constructor() {
        super();

        this.state = {
            messages: [],
            username: null,
            channel: null
        }
    }

    componentDidMount() {
        this.getToken()
            .then(this.createChatClient)
            .then(this.joinGeneralChannel)
            .then(this.configureChannelEvents)
            .catch((err) => {
                this.addMessage({ body: "Error: ${error.message}"})
            })
    }

    handleNewMessage = text => {
        if(this.state.channel) {
            this.state.channel.sendMessage(text)
        }
    }

    configureChannelEvents = (channel) => {
        channel.on("messageAdded", ({author, body}) => {
            this.addMessage({author, body});
        })

        channel.on("memberJoined", (member) => {
            this.addMessage({ body: "${member.identity} has joined the channel."})
        })

        channel.on("memberLeft", (member) => {
            this.addMessage({ body: "${member.identity} has left the channel."})
        })
    }

    joinGeneralChannel = chatClient => {
        return new Promise((resolve, reject) => {
            chatClient.getSubscribedChannels().then(() => {
                chatClient.getChannelByUniqueName("general").then((channel) => {
                    this.addMessage({ body: "Joining general channel..."})
                    this.setState({ channel });

                    channel.join().then(() => {
                        this.addMessage({ body: "Joined general channel as ${this.state.username}" })
                        window.addEventListener("beforeunload", () => channel.leave())
                    }).catch(() => reject(Error("Could not join general channel.")))

                    resolve(channel)
                }).catch(() => reject(Error("Could not find general channel")))
            }).catch(() => reject(Error("Could not get channel list.")))
        })
    }

    createGeneralChannel = chatClient => {
        return new Promise((resolve, reject) => {
            this.addMessage({ body: "Creating general channel..."})
            chatClient
                .createChannel({ uniqueName: "general", friendlyName: "General Chat"})
                .then(() => this.joinGeneralChannel(chatClient))
                .catch(() => reject(Error("Could not create general channel.")))
        })
    }

    addMessage = message => {
        const messageData = { ...message, me: message.author === this.state.username };
        this.setState({
            messages: [...this.state.messages, messageData]
        });
    }

    createChatClient = token => {
        return new Promise((resolve, reject) => {
            resolve(new TwilioChat(token.jwt))
        });
    }

    getToken() {
        return new Promise((resolve, reject) => {

            this.setState({
                messages: [...this.state.messages, {body: "Connecting..." }]
            });
            axios
            .get("/videochat/chatToken")
            .then(res => {
                this.setState({
                    username: res.identity
                });
                resolve(res);
                
            })
            .catch(err => reject(Error("Failed to connect")))
        })
        
    }

    render() {
        return(
            <div>
                <AppBar position="fixed"  className={styles.appBar}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu 
                        id="menu-bar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <MenuItem>
                            <MessageList messages={this.state.messages} />
                            <MessageForm onMessageSend={this.handleNewMessage}/>
                        </MenuItem>
                    </Menu>
                </AppBar>
                 
                 

            </div>
        );
    }
}

ChatWindow.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(withRouter(ChatWindow));