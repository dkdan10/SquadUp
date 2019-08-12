class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @current_user = current_user
    stream_for @current_user
  end

  def speak(data)
    channel = current_user.channels.find(data['channelId']) if data['channelId']
    if (channel && data['newChannel'] === "true" && data['channelId'])
        channelObj = {channel: {}, users: {}}
        channelObj[:channel][channel.id] = {
            id: channel.id,
            member_ids: channel.member_ids
        }
        broadcastTo = []
        channel.member_ids.each do |user_id| 
            nextUser = User.find(user_id)
            broadcastTo.push(nextUser) if (nextUser.id != @current_user.id) || data['modalCreated']
            channelObj[:users][nextUser.id] = {
                id: nextUser.id,
                username: nextUser.username
            }
        end
        socket = { channelData: channelObj, type: 'channel' }
        broadcastTo.each do |user|
            ChannelsChannel.broadcast_to(user, socket)
        end
    end
  end

  def load
    channels = current_user.channels
    channelData = {users: {}, channels: {}}
    channels.each do |el| 
        channelData[:channels][el.id] = {
            id: el.id,
            member_ids: el.member_ids
        }
        el.member_ids.each do |user_id| 
            if user_id != current_user.id
                nextUser = User.find(user_id)
                channelData[:users][nextUser.id] = {
                    id: nextUser.id,
                    username: nextUser.username
                }
            end
        end
    end
    socket = { channelData: channelData, type: 'channels' }
    ChannelsChannel.broadcast_to(@current_user, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

end
