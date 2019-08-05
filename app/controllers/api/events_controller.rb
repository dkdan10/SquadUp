class Api::EventsController < ApplicationController
    def index
        @events = Event.all.where(group_id: params[:group_id])
        render :index
    end

    def create 
        @event = Event.new(group_params)
        @event[:organizer_id] = current_user.id
        @event[:group_id] = params[:group_id]
        if @event.save 
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

    private
    def event_params
        params.require(:event).permit(:name, :description, :lat, :lng, :address)
    end
end