import React from "react";
import MessageForm from "./message_form";
import {connect} from "react-redux"
import { fetchChannels } from "../actions/messaging_actions";

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        // GET FROM REDUX STORE IN THE FUTURE
        this.state = { messages: [] };
        this.messageListContainer = React.createRef();
    }

    componentDidMount() {
        // REFACTOR TO IT'S OWN COMPONENT
        // REFACTOR MESSAGES TO DISPATCH RECIEVED MESSAGES INTO STORE
        App.cable.subscriptions.subscriptions = []
        this.props.fetchChannels().then(() => this.createConnection())
    }

    componentWillUnmount () {
        App.cable.disconnect()
    }

    loadChat() {
        App.cable.subscriptions.subscriptions[0].load();
    }

    componentDidUpdate(prevProps) {
        this.messageListContainer.current.scrollTop = this.messageListContainer.current.scrollHeight;

        if (this.props.match.params.chatId !== prevProps.match.params.chatId) {
            this.setState({messages: []})
            this.createConnection()
        }
    }

    createConnection () {
        const { chatId } = this.props.match.params
        if (App.messaging) {
            App.messaging.unsubscribe();
        }
        
        App.messaging = App.cable.subscriptions.create(
            { channel: "ChatChannel", id: chatId },
            {
                received: data => {
                    switch (data.type) {
                        case "message":
                            this.setState({
                                messages: this.state.messages.concat(data.message)
                            });
                            break;
                        case "messages":
                            this.setState({ messages: data.messages });
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
                load: function () { return this.perform("load") },
                connected: this.loadChat
            }
        )
    }

    changeChannel(channelId) {
        return e => {
            this.props.history.push(`/messages/${channelId}`)
        }
    }

    render() {
        let currentChatOtherUsername = "Username"
        let currentChannel = this.props.channels[this.props.match.params.chatId]
        
        const messageList = this.state.messages.map((message, idx) => {
            return (
                <li className="message-li" key={`message_number-${idx}`}>
                    <i className="user-image far fa-user-circle"></i>
                    <div className="message-content">
                        <span className="username">{message.sender.username}</span>
                        <span className="message-text">{message.body}</span>
                    </div>
                </li>
            );
        });

        const channelsLis = Object.values(this.props.channels).map((channel, idx) => {
            const otherUsername = this.props.users[channel.member_ids.filter(id => id !== this.props.currentUserId)[0]].username
            let isCurrentChannel = false 
            if (currentChannel)  {
                isCurrentChannel = channel.id === currentChannel.id
            }
            if (isCurrentChannel) currentChatOtherUsername = otherUsername
            return (
                <li onClick={this.changeChannel(channel.id)} className={`${isCurrentChannel ? "selected" : ""} chat-index-item`} key={`chat-room-${idx}`}>
                    <i className="user-image far fa-user-circle"></i>
                    <div className="info">
                        <span>{otherUsername}</span>
                    </div>
                </li>
            )
        })
        return (
            <div className="chatroom-container">

                <div className="left-chat-container">
                    <div className="left-chat-header">
                        <span className="inbox">Inbox</span>
                        <span><i className="fas fa-comment-medical"></i></span>
                    </div>
                    <div className="left-chat-index">
                        {channelsLis}
                    </div>
                </div>
                
                <div className="right-chat-container">
                    <h1>{currentChatOtherUsername}</h1>
                    
                    <div className="chat-messages-index">
                        <div ref={this.messageListContainer} className="message-list">{messageList}</div>
                        <MessageForm />
                    </div>
                </div>
                
            </div>
        );
    }

}


const msp = (state) => {
    return {
        channels: state.entities.channels,
        users: state.entities.users,
        currentUserId: state.session.currentUserId
    }
}

const mdp = (dispatch) => {
    return {
        fetchChannels: () => dispatch(fetchChannels())
    }
}

export default connect(msp, mdp)(ChatRoom)

