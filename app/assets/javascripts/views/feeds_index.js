NewReader.Views.FeedsIndex = Backbone.View.extend({
	tagName: 'ul',
	events: {
		'click .add-button': 'add'
		},
	template: JST["feeds/index"],

	initialize: function () {
		this.listenTo(this.collection, "add remove", this.render)
	},

	render: function () {
		var that = this;
		var renderedContent = this.template({
			feeds: that.collection
		});

		this.$el.html(renderedContent);
		return this;
	},

	add: function (event) {
		var newUrl = $('input[name=feed\\[url\\]]').val();
		this.collection.create({
			url: newUrl
		}, {
			wait: true
		});
	}
});