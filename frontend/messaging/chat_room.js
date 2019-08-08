import React from "react";
import MessageForm from "./message_form";

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        // GET FROM REDUX STORE IN THE FUTURE
        this.state = { messages: [] };
        this.bottom = React.createRef();
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
                speak: (data) => { return this.perform("speak", data) },
                load: () => { return this.perform("load") }
            }
        );
    }

    loadChat(e) {
        e.preventDefault();
        App.cable.subscriptions.subscriptions[0].load();
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
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
                <div className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }

}
