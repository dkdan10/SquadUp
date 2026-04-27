class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    def current_user 
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def ensure_logged_in
        return if logged_in?

        render json: ["Must be logged in"], status: 401
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def logout!
        current_user&.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    private
    def render_not_found
        render json: ["Not found"], status: 404
    end

end
