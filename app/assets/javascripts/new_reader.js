window.NewReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
	var $rootEl = $('#content');
	var $sidebar = $('#sidebar');
	var feeds = new NewReader.Collections.Feeds();

	var feedsIndexView = new NewReader.Views.FeedsIndex({
		collection: feeds
	});
	$sidebar.html(feedsIndexView.render().$el);
	
	feeds.fetch({
		success: function () {
			new NewReader.Routers.Router(feeds, $rootEl);
			Backbone.history.start();
		},
		error: function (){
			console.log('failed to fetch');
		}
	});
  }
};

$(NewReader.initialize);

// new JournalApp.Routers.Posts({
//   "$rootEl": $("#content")
// });

