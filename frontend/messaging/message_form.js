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
        // REFRENCING CHAT ROOM SUBSCRIPTION>> MAYBE PASS AS A PROP FOR MULTIPLE ROOMS
        App.cable.subscriptions.subscriptions[0].speak({ message: this.state.body });
        this.setState({ body: "" });
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
