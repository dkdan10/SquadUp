class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @channel = current_user.channels.find(params[:id])
    stream_for @channel
  end

  def speak(data)
    message = Message.new(body: data['message'])
    message.sender_id = current_user.id
    message.channel_id = @channel.id
    if message.save
      messageObj = {
        body: message.body,
        sender: message.sender
      }
      socket = { message: messageObj, type: 'message' }
      ChatChannel.broadcast_to(@channel, socket)
    end
  end

  def load
    messages = Message.all.where(channel_id: @channel.id)
    messagesData = messages.map do |el| 
      messageObj = {
        body: el.body,
        sender: el.sender
      }
      messageObj
    end
    socket = { messages: messagesData, type: 'messages' }
    ChatChannel.broadcast_to(@channel, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
