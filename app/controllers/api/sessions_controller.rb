class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(user_params[:email], user_params[:password])
        if @user
            login!(@user)
            render 'api/users/show'
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