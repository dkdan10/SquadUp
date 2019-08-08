import React from "react";
import MessageForm from "./message_form";

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        // GET FROM REDUX STORE IN THE FUTURE
        this.state = { messages: [] };
        this.messageListContainer = React.createRef();
    }

    componentDidMount() {
        // REFACTOR TO IT'S OWN COMPONENT
        // REFACTOR MESSAGES TO DISPATCH RECIEVED MESSAGES INTO STORE
        App.cable.subscriptions.create(
            { channel: "ChatChannel" },
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
                load: function () { return this.perform("load") }
            }
        );
    }

    loadChat(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].load();
    }

    componentDidUpdate() {
        this.messageListContainer.current.scrollTop = this.messageListContainer.current.scrollHeight;
    }

    render() {
        const messageList = this.state.messages.map((message, idx) => {
            return (
                <li className="message-li" key={`message_number-${idx}`}>
                    <i className="user-image far fa-user-circle"></i>
                    <div className="message-content">
                        <span className="username">Username</span>
                        <span className="message-text">{message}</span>
                    </div>
                </li>
            );
        });

        const chats = [{ name: "All Users", lastMessage: messageList[messageList.length - 1]}]
        const chatsLis = chats.map((chat, idx) => {
            return (
                <li className="chat-index-item" key={`chat-room-${idx}`}>
                    <i className="user-image far fa-user-circle"></i>
                    <div className="info">
                        <span>{chat.name}</span>
                    </div>
                </li>
            )
        })
        return (
            <>
                <button className="load-button"
                    onClick={this.loadChat.bind(this)}>
                    Load Chat History
                </button>
            <div className="chatroom-container">

                <div className="left-chat-container">
                    <div className="left-chat-header">
                        <span className="inbox">Inbox</span>
                        <span><i className="fas fa-comment-medical"></i></span>
                    </div>
                    <div className="left-chat-index">
                        {chatsLis}
                    </div>
                </div>
                
                <div className="right-chat-container">
                    <h1>All Users</h1>
                    
                    <div className="chat-messages-index">
                        <div ref={this.messageListContainer} className="message-list">{messageList}</div>
                        <MessageForm />
                    </div>
                </div>
                
            </div>
            </>
        );
    }

}
