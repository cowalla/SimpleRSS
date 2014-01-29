class User < ActiveRecord::Base
  attr_accessible :username, :session_token
  has_many :user_feeds
end
