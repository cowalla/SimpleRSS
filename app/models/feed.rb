class Feed < ActiveRecord::Base
  attr_accessible :title, :url

  has_many :entries, :dependent => :destroy
  has_many :user_feeds
  has_many :users, :through => :user_feeds

  def has_favorited?(user_id)
    !users.find_by_id(user_id).nil?
  end

  def self.find_or_create_by_url(url)
    feed = Feed.find_by_url(url)
    return feed if feed
    
    begin
      feed_data = SimpleRSS.parse(open(url))
      feed = Feed.create!(title: feed_data.title, url: url)
      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue SimpleRSSError
      return nil
    end

    feed
  end


  def reload
    # reloads entries
    begin
      feed_data = SimpleRSS.parse(open(url))
      self.title = feed_data.title
      self.updated_at = Time.now
      save!

      existing_entry_guids = Entry.pluck(:guid).sort
      feed_data.entries.each do |entry_data|
        unless existing_entry_guids.include?(entry_data.guid)
          Entry.create_from_json!(entry_data, self)
        end
      end

      self
    rescue SimpleRSSError
      return false
    end
  end
end