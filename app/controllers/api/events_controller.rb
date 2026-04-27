class Api::EventsController < ApplicationController
    before_action :ensure_logged_in, only: [:create, :update, :destroy, :current_user_group_events, :add_rsvp, :remove_rsvp]

    def index
        @events = Event.includes(:users, :group).all.order(:start_day).order(:start_time)
        @events = apply_search_filter(@events)

        render :index
    end

    def create
        group = current_user.owned_groups.find(event_params[:group_id])
        @event = group.events.new(event_params)
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
        current_user.owned_groups.find(@event.group_id)

        if event_params[:group_id] && event_params[:group_id].to_i != @event.group_id
            current_user.owned_groups.find(event_params[:group_id])
        end

        if @event.update(event_params)
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
        current_user.owned_groups.find(@event.group_id)
        @event.destroy
        render :show
    end

    # CUSTOM ROUTES
    def current_user_group_events
        @events = current_user.joined_group_events.includes(:users, :group).order(:start_day).order(:start_time)
        @events = apply_search_filter(@events)
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
    def apply_search_filter(events)
        return events unless params[:search].present?

        query = "%#{params[:search].downcase}%"
        events.where("lower(events.name) like :query OR lower(events.description) like :query", query: query)
    end

    def event_params
        params.require(:event).permit(:name, :start_day, :start_time, :group_id, :description, :lat, :lng, :address)
    end
end
