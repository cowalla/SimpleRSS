NewReader.Routers.Router = Backbone.Router.extend({

	initialize: function (feeds, $rootEl, $sidebar) {
		this.$rootEl = $rootEl;
		this.feeds = feeds;
	},

	routes: {
		"": "feedsIndex",
		"feeds/:id": "feedsShow",
		"feeds/:feed_id/entries/:id": "entryShow"
	},

	feedsIndex: function(){
		this.$rootEl.html('');
	},

	feedsShow: function(paramId) {
		var feedShowView = new NewReader.Views.FeedsShow({
			model: this.feeds.get(paramId)
		});
		
		this._swapView(feedShowView);
	},

	entryShow: function(inputFeedId, inputId) {
		var entry = this.feeds.get(inputFeedId).get('entries').get(inputId);
		var entryShowView = new NewReader.Views.EntryShow({
			model: entry
		});
		this._swapView(entryShowView);
	},

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});