MoleskinApp.controller('usersController', function ($scope, $http, $location, localStorageService, UsersService) {
	
	$scope.login = function() {

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$http.post(MoleskinApp.url + 'login', user)
			.success(function(data) 
			{	
				//console.log(data);
				UsersService.user_id      = data.user_id;							
				UsersService.email        = user.email;
				UsersService.is_logged_in = true;

				// Start fresh
    			localStorageService.clearAll();
    			localStorageService.add('user_id', data.user_id);
    			localStorageService.add('email', user.email);
							
				$location.path('/todos');
			})
			.error(function(status) 
			{			
				/*UsersService.email    = "";
				UsersService.isLogged = false;*/
			})		
	},

	$scope.logout = function() {

		$http.get(MoleskinApp.url + 'logout')
			.success(function(data) 
			{				
				// Start fresh
    			localStorageService.clearAll();

				$location.path('/login');	
			})
			.error(function(status) 
			{
				alert(status);
			})
	}

	/*$scope.basicAuthLogin = function() {
   		
		var user = {
					email: $scope.user.email,
					password: $scope.user.password
				};

		$http.defaults.headers.post.Authorization = 'Basic ' + Base64.encode(user.email + ':' + user.password);
		//$http.post(MoleskinApp.url + 'authlogin', user)
		//$http.post(MoleskinApp.url + 'authlogin')
			.success(function(data) 
			{	
				UsersService.user_id  = data.user_id;							
				UsersService.email    = user.email;
				UsersService.isLogged = true;

				console.log($http.defaults.headers);
							
				$location.path('/todos');
			})
			.error(function(status) 
			{			
				console.log($http.defaults.headers);
				/*UsersService.email    = "";
				UsersService.isLogged = false;*/
		/*	})		
	}
	*/
});