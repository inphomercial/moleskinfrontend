MoleskinApp.controller('usersController', function ($scope, $http, $location, localStorageService, UsersService) {
	
	$scope.login = function() {

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$http.post(MoleskinApp.url + 'login', user)
			.success(function(data) 
			{	
				// Set servers returned user_id				
				UsersService.user_id      = data.user_id;							
				UsersService.email 		  = user.email;
				UsersService.is_logged_in = true;

				// Start fresh
    			localStorageService.clearAll();
    			localStorageService.add('user_id', data.user_id);
    			localStorageService.add('email', user.email);
							
				$location.path('/todos');		
			})
			.error(function(status) 
			{		
				alertify.error("Login Failed");
				console.log(status)	;				
			})		
	},

	$scope.logout = function() {

		$http.get(MoleskinApp.url + 'logout')
			.success(function(data) 
			{				
				// Start fresh
    			localStorageService.clearAll();

				$location.path('/login');	

				alertify.success("Logged Out");
			})
			.error(function(status) 
			{
				console.log(status);
			})
	},

	$scope.requestInvite = function() {

		alertify.prompt("Please provide a email address :", function(e, str){		
			console.log(str);		
		});

		
	}
});