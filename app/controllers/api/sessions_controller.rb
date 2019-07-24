class API::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(user_params)
        if @user
            login!(@user)
            render json: @user
        else
            render json: ["Invalid Credentials"], status: 422
        end
    end

    def destroy
        logout!
    end

    private
    def user_params
        params.require(:user).permit(:email, :password)
    end
end