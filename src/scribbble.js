(function($, _window){

	var _apiEndpoint = 'https://api.dribbble.com/v1';

	var _ = function(){

		this._currentUser = null;

		var _get = function(opts){
			opts.url = opts.url+ '?access_token=' + this.token;
			opts.type = 'GET';

			var oldSuccess = opts.success || function(){};
			opts.success = function(){
				oldSuccess.apply(this, arguments);
			}
			return $.ajax(opts);
		}

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
				success: function(user){
					_this._currentUser = user;
				}
			})
		}

		this.getCurrentUserLikes = function(user){
			if(this._currentUser){
				return _get.call(this, {
					url: this._currentUser.likes_url
				});	
			}
			else {
				var deferred = $.Deferred();

				var _this = this;

				$.when(this.getCurrentUser()).then(function(){
					$.when(_get.call(_this, {
						url: _this._currentUser.likes_url
					})).then(function(resp){
						deferred.resolve(resp);
					});
				});

				return deferred.promise();
			}
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
						deferred.resolve(false);
					}
				}
			});

			return deferred.promise();
		}

	}

	_window.scribbble = _;


})(jQuery, window);