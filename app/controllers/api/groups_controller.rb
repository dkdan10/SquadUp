class Api::GroupsController < ApplicationController
    def index
        @groups = Group.all.includes(:location)
        render :index
    end

    def create 
        @group = Group.new(group_params)
        @group[:owner_id] = current_user.id
        if @group.save 
            render :show
        else
            render json: @group.errors.full_messages, status: 422
        end
    end

    def edit
        @group = Group.find(params[:id])
        if @group.update_attributes(group_params)
            render :show
        else
            render json: @group.errors.full_messages, status: 422
        end
    end

    def show
        @group = Group.find(params[:id])
        render :show
    end

    private
    def group_params
        params.require(:group).permit(:name, :description, :location_id, :private)
    end
end