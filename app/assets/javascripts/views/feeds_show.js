NewReader.Views.FeedsShow = Backbone.View.extend({
	className: 'feed-show',
	events: {
		"click button.refresh": "refresh"
	},

	template: JST["feeds/show"],

  	initialize: function (attribute) {
		this.listenTo(this.model.get('entries'), 'add', this.render);
	},

	render: function () {

		var renderedContent = this.template({
			feed: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},

	refresh: function (){
		console.log("refreshing...");
		this.model.get('entries').fetch({
			error: function(){
				console.log('Unable to refresh (fetch error)');
			}
		});
	}
});