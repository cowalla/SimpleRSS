class EntriesController < ApplicationController
  def index
    feed = Feed.find(params[:feed_id])
    if (Time.now - feed.updated_at) > 3.seconds
      feed.reload
    else
      puts "Refreshing too quickly (>3 seconds)"
    render :json => feed.entries
  end
end
