MoleskinApp.controller('usersController', function ($scope, $http, $location, UsersService) {
	
	$scope.login = function() {

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$http.post(MoleskinApp.url + 'login', user)
			.success(function(data) 
			{				
				UsersService.email    = user.email;
				UsersService.isLogged = true;
							
				$location.path('/goals');
			})
			.error(function(status) 
			{			
				UsersService.email    = "";
				UsersService.isLogged = false;
			})		
	},

	$scope.logout = function() {

		$http.get(MoleskinApp.url + 'logout')
			.success(function(data) 
			{				
				$location.path('/login');	
			})
			.error(function(status) 
			{
				alert(status);
			})
	}
	
});