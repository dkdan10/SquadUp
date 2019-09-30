import React from "react";
import MessageForm from "./message_form";
import {connect} from "react-redux"
import { fetchChannels } from "../actions/messaging_actions";
import { openModal } from '../actions/modal_actions';


class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        // GET FROM REDUX STORE IN THE FUTURE
        this.state = { messages: [], channels: {}, users: {} };
        this.messageListContainer = React.createRef();
        this.messagesSubs = null
        this.channelSubs = null
        this.loadChat = this.loadChat.bind(this)
        this.loadChannels = this.loadChannels.bind(this)
    }

    componentDidMount() {
        // REFACTOR TO IT'S OWN COMPONENT
        // REFACTOR MESSAGES TO DISPATCH RECIEVED MESSAGES INTO STORE
        App.cable.subscriptions.subscriptions = []
        this.createChannelConnection()
    }

    componentWillUnmount () {
        App.cable.disconnect()
    }

    loadChat() {
        this.messagesSubs.load();
        const newChannel = (this.props.history.location.newChannel) ? "true" : ""
        this.channelSubs.speak({ channelId: this.props.match.params.chatId, newChannel: newChannel, modalCreated: this.props.history.location.modalCreated, type: "channel" })
    }
    loadChannels() {
        this.channelSubs.load();
        this.createConnection()
    }

    componentDidUpdate(prevProps) {
        if (this.messageListContainer.current) {
            this.messageListContainer.current.scrollTop = this.messageListContainer.current.scrollHeight;
        }

        if (this.props.match.params.chatId !== prevProps.match.params.chatId) {
            this.setState({messages: []})
            // this.channelSubs.speak({ channelId: this.props.match.params.chatId,  type: "channel"})
            this.createConnection()
        }
    }

    createConnection () {
        const { chatId } = this.props.match.params
        if (this.messagesSubs) {
            this.messagesSubs.unsubscribe();
        }
        if (!chatId) return
        this.messagesSubs = App.cable.subscriptions.create(
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

    createChannelConnection () {
        if (this.channelSubs) {
            this.channelSubs.unsubscribe();
        }

        this.channelSubs = App.cable.subscriptions.create(
            { channel: "ChannelsChannel" },
            {
                received: data => {
                    switch (data.type) {
                        case "channel":
                            this.setState({
                                channels: Object.assign({}, this.state.channels, data.channelData.channel),
                                users: Object.assign({}, this.state.users, data.channelData.users)
                            });
                            break;
                        case "channels":
                            this.setState({ 
                                channels: data.channelData.channels,
                                users: data.channelData.users
                            });
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
                load: function () { return this.perform("load") },
                connected: this.loadChannels
            }
        )
    }

    changeChannel(channelId) {
        return e => {
            this.props.history.push(`/messages/${channelId}`)
        }
    }

    openNewChatModal (e) {
        this.props.openModal({ type: 'new-chat' }); 
    }

    render() {
        if (Object.entries(this.state.channels).length === 0 && this.state.channels.constructor === Object) return  null
        let currentChatOtherUsername = "No Chat"
        let currentChannel = this.state.channels[this.props.match.params.chatId]
        
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

        const channelsLis = Object.values(this.state.channels).map((channel, idx) => {
            const otherUsername = this.state.users[channel.member_ids.filter(id => id !== this.props.currentUserId)[0]].username
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
                        <span><i onClick={this.openNewChatModal} className="new-chat-btn fas fa-comment-medical"></i></span>
                    </div>
                    <div className="left-chat-index">
                        {channelsLis}
                    </div>
                </div>
                
                <div className="right-chat-container">
                    <h1>{currentChatOtherUsername}</h1>
                    
                    <div className="chat-messages-index">
                        <div ref={this.messageListContainer} className="message-list">{messageList}</div>
                        <MessageForm messagesSub={this.messagesSubs} />
                    </div>
                </div>
                
            </div>
        );
    }

}


const msp = (state) => {
    return {
        // channels: state.entities.channels,
        // users: state.entities.users,
        currentUserId: state.session.currentUserId
    }
}

const mdp = (dispatch) => {
    return {
        openModal: (modalAction) => dispatch(openModal(modalAction))
    }
}

export default connect(msp, mdp)(ChatRoom)

