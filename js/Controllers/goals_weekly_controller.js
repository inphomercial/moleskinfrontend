MoleskinApp.controller('goalsWeeklyController', function ($scope, $http, UsersService, DatesService, GoalsService) {

	// First check if user is logged in
	UsersService.isLoggedIn();

	$scope.$on('goals.update', function( event ) {
		$scope.goals = GoalsService.goals;
	});

	// Initilization 
	$scope.goals = GoalsService.goals;

	$scope.add = function()
	{
		var goal = {
			todo_id: 4,
			completed: 0
		}

		GoalsService.addGoal(goal);
	},

	$scope.pushToTodo = function(goal) {
		var todo = {
			title: goal.title,
			user_id: UsersService.getUserId(),
			date: DatesService.getToday(),
			completed: 0			
		};

		console.log(todo);

		$http.post(MoleskinApp.url + 'todos', todo)
			.success(function(data) {
				console.log("moved goal to todo!");	
			})
			.error(function(status) {
				alert(status);				
			});	

		/*for(var i=0;i<$scope.goals.length;i++) 
		{
			if($scope.goals[i].id == goal.id) 
			{
				$scope.goals.current_goal = 1;
			}
		}*/
	}
});