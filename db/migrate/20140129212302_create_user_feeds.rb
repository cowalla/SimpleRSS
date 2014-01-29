class CreateUserFeeds < ActiveRecord::Migration
  def change
    create_table :user_feeds do |t|
      t.string :user_id, :null => false
      t.string :feed_id, :null => false
      t.timestamps
    end
  end
end
