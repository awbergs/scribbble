(function($){

	var _apiEndpoint = 'https://api.dribbble.com/v1';

	var _ = function(){

		var _call = function(opts){
			opts.url = _apiEndpoint + opts.url + '?access_token=' + this.token;
			opts.type = opts.type || 'GET';
			var oldSuccess = opts.success || function(){};
			opts.success = function(a,b,c){
				console.log(arguments);
				oldSuccess.call(this, arguments);
			}
			return $.ajax(opts);
		}

		this.setToken = function(token){
			this.token = token;
		}

		this.getShot = function(shotId){
			return _call.call(this, {
				url: '/shots/' + shotId
			});
		}

		this.getCurrentUser = function(){
			return _call.call(this, {
				url: '/user'
			})
		}

		this.doesCurrentUserLikeShot = function(shotId){
			var deferred = $.Deferred();

			_call.call(this, {
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
			return _call.call(this, {
				url: '/shots/'+shotId+'/like',
				type: 'POST'
			});
		}

		this.unlikeShot = function(shotId){
			return _call.call(this, {
				url: '/shots/'+shotId+'/like',
				type: 'DELETE'
			});

		}

	}

	window.scribbble = _;

})(jQuery, window);