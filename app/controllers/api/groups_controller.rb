class Api::GroupsController < ApplicationController
    before_action :ensure_logged_in, only: [:create, :update, :destroy, :create_member, :destroy_member]

    def index
        @groups = Group.includes(:members, :events, :location).all
        @groups = apply_search_filter(@groups)
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
        if @group.update(group_params)
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
    def apply_search_filter(groups)
        return groups unless params[:search].present?

        query = "%#{params[:search].downcase}%"
        groups.where("lower(groups.name) like :query OR lower(groups.description) like :query", query: query)
    end

    def group_params
        params.require(:group).permit(:name, :description, :location_id, :private)
    end
end
