class UserFeed < ActiveRecord::Base
  attr_accessible :feed_id, :user_id
  validates :feed_id, :uniqueness => true, :scope => {:user_id}
  
  belongs_to :feed
  belongs_to :user
end
