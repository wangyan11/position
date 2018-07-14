function Index() {

}

$.extend(Index.prototype, {
	loadHeader : function() {
		new Header();
	}
});

new Index().loadHeader();