(function($, _window){

	var _apiEndpoint = 'https://api.dribbble.com/v1';

	var _ = function(){

		this._currentUser = null;

		var _get = function(opts){
			opts.url = opts.url+ '?access_token=' + this.token;
			opts.type = 'GET';

			var oldSuccess = opts.success || function(){};
			opts.success = function(a,b,c){
				console.log(arguments);
				oldSuccess.apply(this, arguments);
			}
			return $.ajax(opts);
		}

		// var _post = function(opts){
		// 	opts.url = _apiEndpoint + opts.url + "?callback=jsonpcallback";
		// 	opts.type = opts.type || 'POST';

		// 	var oldSuccess = opts.success || function(){};
		// 	opts.success = function(a,b,c){
		// 		console.log(arguments);
		// 		oldSuccess.call(this, arguments);
		// 	}

		// 	opts.crossDomain = true;
		// 	opts.dataType = "jsonp";
		// 	opts.jsonp = true;

		// 	opts.beforeSend = function (request) {
  //               request.setRequestHeader("Authorization", this.token);
  //           }

		// 	return $.ajax(opts);
		// }

		this.setToken = function(token){
			this.token = token;
		}

		this.getShot = function(shotId){
			return _get.call(this, {
				url: _apiEndpoint + '/shots/' + shotId
			});
		}

		this.getCurrentUser = function(){
			var _this = this;
			return _get.call(this, {
				url: _apiEndpoint + '/user',
				success: function(a,b,c){
					_this._currentUser = a;
				}
			})
		}

		this.getCurrentUserLikes = function(user){
			return _get.call(this, {
				url: this._currentUser.likes_url
			});
		}

		this.doesCurrentUserLikeShot = function(shotId){
			var deferred = $.Deferred();

			_get.call(this, {
				url: _apiEndpoint + '/shots/'+shotId+'/like',
				success: function(){

					deferred.resolve(true);
				},
				error: function(resp){
					if(resp.status === 404){
						deferred.resolve(false)

					}
				}
			});

			return deferred.promise();
		}

		// this.likeShot = function(shotId){
		// 	return _post.call(this, {
		// 		url: '/shots/'+shotId+'/like'
		// 	});
		// }

		// this.unlikeShot = function(shotId){
		// 	return _post.call(this, {
		// 		url: '/shots/'+shotId+'/like',
		// 		type: 'DELETE'
		// 	});

		// }

	}

	_window.scribbble = _;


})(jQuery, window);