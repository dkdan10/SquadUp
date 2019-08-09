class Api::ChannelsController < ApplicationController 

    def create
        other_user = User.find(params[:otherUserId].to_i)
        @channel = find_channel(params[:otherUserId].to_i) || Channel.new
        if @channel.persisted? 
            render :show
        elsif @channel.save
            @channel.members << current_user
            @channel.members << other_user
            render :show
        else
            render json: @channel.errors.full_messages
        end
    end

    def index
        @channels = current_user.channels.includes(:members)
        render :index
    end

    def show
        @channel = Channel.find(params[:id])
        render :show
    end

    private
    def find_channel(userId)
        current_user.channels.each do |channel|
            return channel if channel.member_ids.include?(userId)
        end
        nil
    end

end