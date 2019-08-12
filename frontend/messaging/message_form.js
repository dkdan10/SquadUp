import React from "react";

export default class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { body: "" };
    }

    update(field) {
        return e =>
            this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.body) {
            // REFRENCING CHAT ROOM SUBSCRIPTION>> MAYBE PASS AS A PROP FOR MULTIPLE ROOMS
            this.props.messagesSub.speak({ message: this.state.body, type: "message" });
            this.setState({ body: "" });
        }
    }

    render() {
        return (
            <div className="message-form-container">
                <form className="message-inputs" onSubmit={this.handleSubmit.bind(this)}>
                    <textarea
                        className="message-input-field"
                        type="text"
                        value={this.state.body}
                        onChange={this.update("body")}
                        placeholder="Say something nice..."
                    />
                    <button className="submit-message-btn" >Send</button>
                </form>
            </div>
        );
    }
}
