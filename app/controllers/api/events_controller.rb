class Api::EventsController < ApplicationController
    def index
        @events = Event.all
        render :index
    end

    def create
        @event = Event.new(event_params)
        @event[:organizer_id] = current_user.id
        
        if @event.save
            @event.users << current_user
            render :show
        else
            render json: @event.errors.full_messages, status: 422
        end
    end

    def update
        @event = Event.find(params[:id])
        if @event.update_attributes(event_params)
            render :show
        else
            render json: @event.errors.full_messages, status: 422
        end
    end

    def show
        @event = Event.find(params[:id])
        render :show
    end

    def destroy
        @event = Event.find(params[:id])
        @event.destroy
        render :show
    end

    # CUSTOM ROUTES
    def current_user_group_events
        @events = current_user.joined_group_events
        render :index
    end

    # CUSTOM RSVPS
    def add_rsvp
        @event = Event.find(params[:id])
        @event.users << current_user
        render :show
    end

    def remove_rsvp
        @event = Event.find(params[:id])
        @event.users.delete(current_user)
        render :show
    end

    private
    def event_params
        params.require(:event).permit(:name, :start_day, :start_time, :group_id, :description, :lat, :lng, :address)
    end
end