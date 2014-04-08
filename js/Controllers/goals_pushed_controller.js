MoleskinApp.controller('goalsPushedController', function ($scope, $http, UsersService, DatesService, TodosService, GoalsService) {
	
	$scope.$on('goals_pushed.update', function( event ) {
		$scope.goals_pushed = GoalsService.goals_pushed;
	});

	// Initilization 
	var r = GoalsService.getPushedGoals();
	r.then(function (res) {
		$scope.goals_pushed = GoalsService.goals_pushed;	
	})

	console.log($scope.goals_pushed);

	/*$scope.amICompleted = function(goal) {
		if(goal.actionable_completed >= goal.actionable_total)
		{
			return "Complete";
		}
	}*/

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