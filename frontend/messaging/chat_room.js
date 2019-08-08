import React from "react";
import MessageForm from "./message_form";

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        // GET FROM REDUX STORE IN THE FUTURE
        this.state = { messages: [] };
        this.bottom = React.createRef();
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
        // this.bottom.current.scrollIntoView();
        // debugger
        this.messageListContainer.current.scrollTop = this.messageListContainer.current.scrollHeight;
    }

    render() {
        const messageList = this.state.messages.map((message, idx) => {
            return (
                <li key={`message_number-${idx}`}>
                    {message}
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="chatroom-container">
                <div>ChatRoom</div>
                <button className="load-button"
                    onClick={this.loadChat.bind(this)}>
                    Load Chat History
                </button>
                <div ref={this.messageListContainer} className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }

}
