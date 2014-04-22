MoleskinApp.controller('goalsPushedController', function ($scope, $http, UsersService, DatesService, TodosService, GoalsService) {
		
	// First check if user is logged in
	UsersService.isLoggedIn();

	// Create our goals_pushed container
	$scope.goals_pushed = [];

	$scope.$on('goals_pushed.update', function( event ) {
		$scope.goals_pushed = GoalsService.goals_pushed;
	});

	// Initilization 
	var r = GoalsService.getPushedGoals(DatesService.getToday());
	r.then(function (res) {
		$scope.goals_pushed = GoalsService.goals_pushed;	
	})

	$scope.createTodoFromGoal = function(goal) {
		
		var todo = {
			user_id: UsersService.getUserId(),
			goal_id: goal.id,
			title: goal.title,
			actionable_total: goal.actionable_total,			
			date: DatesService.getToday(),
			pushed_times: 0,
			completed: 0		
		};

		TodosService.addTodo( todo );
	}
});