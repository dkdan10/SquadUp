class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @current_user = current_user
    stream_for @current_user
  end

  def speak(data)
    channel = current_user.channels.find(data['channelId']) if data['channelId']
    otherUser = User.find(data['otherUserId']) if data['otherUserId']
    if (channel && otherUser && data['newChannel'] === "true" && data['channelId'])
        channelObj = {}
        channelObj[channel.id] = {
            id: channel.id,
            member_ids: channel.member_ids
        }
        socket = { channel: channelObj, type: 'channel' }
        ChannelsChannel.broadcast_to(@current_user, socket)
        ChannelsChannel.broadcast_to(otherUser, socket)
    end
  end

  def load
    channels = current_user.channels
    channelData = {}
    channels.each do |el| 
        channelData[el.id] = {
            id: el.id,
            member_ids: el.member_ids
        }
    end
    socket = { channels: channelData, type: 'channels' }
    ChannelsChannel.broadcast_to(@current_user, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
