class Location < ApplicationRecord
    validates :lat, :lng, :name, presence: true
end