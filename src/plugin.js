(function($){

	var _apiEndpoint = 'https://api.dribbble.com/v1/';

	var _ = function(){

		var _call = function(opts){
			opts.url = _apiEndpoint + opts.url + '?access_token=' + this.token;
			return $.ajax(opts);
		}

		this.setToken = function(token){
			this.token = token;
		}

		this.getShot = function(shotId){
			return _call.call(this, {
				url: '/shots/' + shotId,
				type: 'GET',
				success: function(resp){
					console.log(resp);
				},
				error: function(e){
					console.log(e);
				}
			});
		}

	}

	window.scribbble = _;

})(jQuery, window);