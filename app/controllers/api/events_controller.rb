class Api::EventsController < ApplicationController
    def index
        @events = Event.all.order(:start_day).order(:start_time)
        if params[:search]
            @events = @events.where("lower(events.name) like '%#{params[:search].downcase}%' OR lower(events.description) like '%#{params[:search].downcase}%'a ")
        end

        render :index
    end

    def create
        # Check if event organizer is group_id owner. 
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
        @event = current_user.organized_events.find(params[:id])
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
        @event = current_user.organized_events.find(params[:id])
        @event.destroy
        render :show
    end

    # CUSTOM ROUTES
    def current_user_group_events
        @events = current_user.joined_group_events.order(:start_day).order(:start_time)
        if params[:search]
            @events = @events.where("lower(events.name) like '%#{params[:search].downcase}%' OR lower(events.description) like '%#{params[:search].downcase}%' ")
        end
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