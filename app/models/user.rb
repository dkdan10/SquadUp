# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  location_id     :integer          not null
#


# USERNAME IS NOT UNIQUE BECAUSE EMAIL IS THE UNQUI DECIDER
# MAYBE ADD LOCATION IN THE NEAR FUTURE
# HAVE A USER PHOTO?
class User < ApplicationRecord
    validates :username, :password_digest, :location_id, presence: true
    validates :session_token, :email, uniqueness: true, presence: true
    validates :password, length: {minimum: 6}, allow_nil: true

    attr_reader :password

    after_initialize :ensure_session_token

    belongs_to :location

    has_many :owned_groups,
        class_name: :Group,
        foreign_key: :owner_id

    has_many :group_memberships,
        foreign_key: :member_id

    has_many :groups,
        through: :group_memberships

    has_many :organized_events,
        class_name: :Event,
        foreign_key: :organizer_id

    has_many :joined_group_events,
        through: :groups,
        source: :events

    has_many :event_rsvps,
        foreign_key: :user_id,
        class_name: :EventRsvp
        
    has_many :events,
        through: :event_rsvps,
        source: :event

    has_many :messages,
        foreign_key: :sender_id

    has_many :channel_members,
        foreign_key: :member_id

    has_many :channels,
        through: :channel_members,
        source: :channel


    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        return user
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.update!(session_token: SecureRandom.urlsafe_base64)
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end
