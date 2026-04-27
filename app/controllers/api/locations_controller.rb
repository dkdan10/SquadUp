class Api::LocationsController < ApplicationController
    def index
        @locations = Location.all
        render :index
    end

    def show
        @location = Location.find(params[:id])
        render :show
    end
end