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

	/*$scope.add = function()
	{
		var goal = {
			todo_id: 4,
			completed: 0
		}

		GoalsService.addGoal(goal);
	},*/

	/*$scope.amICompleted = function(goal) {
		if(goal.actionable_completed >= goal.actionable_total)
		{
			return "Complete";
		}
	}*/

	$scope.createTodoFromGoal = function(goal) {

		console.log(DatesService.getToday());
		
		var todo = {
			user_id: UsersService.getUserId(),
			goal_id: goal.id,
			title: goal.title,
			actionable_total: goal.actionable_total,			
			date: DatesService.getToday(),
			pushed_times: 0,
			completed: 0		
		};

		$http.post(MoleskinApp.url + 'todos', todo)
			.success(function(data) {		
				todo.id = data.id;				
				TodosService.addTodo( todo );	
			})
			.error(function(status) {
				alert(status);				
			});	

		
	}

	/*$scope.pushToTodo = function(goal) {
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
*/
		/*for(var i=0;i<$scope.goals.length;i++) 
		{
			if($scope.goals[i].id == goal.id) 
			{
				$scope.goals.current_goal = 1;
			}
		}*/
	//}
});