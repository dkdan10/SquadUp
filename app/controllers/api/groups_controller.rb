class Api::GroupsController < ApplicationController
    def index
        @groups = Group.includes(:members, :events, :location).all
         if params[:search]
            @groups = @groups.where("lower(groups.name) like '%#{params[:search].downcase}%' OR lower(groups.description) like '%#{params[:search].downcase}%' ")
        end
        render :index
    end

    def create 
        @group = Group.new(group_params)
        @group[:owner_id] = current_user.id
        if @group.save 
            @group.members << current_user
            render :show
        else
            render json: @group.errors.full_messages, status: 422
        end
    end

    def update
        @group = current_user.owned_groups.find(params[:id])
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

    def destroy
        @group = current_user.owned_groups.find(params[:id])
        @group.destroy
        render :show
    end


    # CUSTOM CREATE ROUTES
    def create_member
        @group = Group.find(params[:id])
        @group.members << current_user
        render :show
    end

    def destroy_member
        @group = Group.find(params[:id])
        @group.members.delete(current_user)
        render :show
    end

    private
    def group_params
        params.require(:group).permit(:name, :description, :location_id, :private)
    end
end