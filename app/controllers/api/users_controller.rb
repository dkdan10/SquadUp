class Api::UsersController < ApplicationController
    before_action :ensure_logged_in, only: [:index, :show, :send_current_user]

    def index
        @users = User.all
        render :index
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def send_current_user
        @user = current_user
        render :show
    end

    private
    def user_params
        params.require(:user).permit(:email, :username, :password, :location_id)
    end
end
