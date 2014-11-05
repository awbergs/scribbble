(function($){

	var _apiEndpoint = 'https://api.dribbble.com/v1';

	var _ = function(){

		var _get = function(opts){
			opts.url = _apiEndpoint + opts.url + '?access_token=' + this.token;
			opts.type = 'GET';

			var oldSuccess = opts.success || function(){};
			opts.success = function(a,b,c){
				console.log(arguments);
				oldSuccess.call(this, arguments);
			}
			return $.ajax(opts);
		}

		var _post = function(opts){
			opts.url = _apiEndpoint + opts.url;
			opts.type = opts.type || 'POST';

			var oldSuccess = opts.success || function(){};
			opts.success = function(a,b,c){
				console.log(arguments);
				oldSuccess.call(this, arguments);
			}

			opts.crossDomain = true;

			opts.beforeSend = function (request) {
                request.setRequestHeader("Authorization", this.token);
            }

			return $.ajax(opts);
		}

		this.setToken = function(token){
			this.token = token;
		}

		this.getShot = function(shotId){
			return _get.call(this, {
				url: '/shots/' + shotId
			});
		}

		this.getCurrentUser = function(){
			return _get.call(this, {
				url: '/user'
			})
		}

		this.doesCurrentUserLikeShot = function(shotId){
			var deferred = $.Deferred();

			_get.call(this, {
				url: '/shots/'+shotId+'/like',
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

		this.likeShot = function(shotId){
			return _post.call(this, {
				url: '/shots/'+shotId+'/like'
			});
		}

		this.unlikeShot = function(shotId){
			return _post.call(this, {
				url: '/shots/'+shotId+'/like',
				type: 'DELETE'
			});

		}

	}

	window.scribbble = _;

})(jQuery, window);