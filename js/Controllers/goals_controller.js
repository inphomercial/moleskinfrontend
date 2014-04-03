MoleskinApp.controller('goalsController', function ($scope, $http, UsersService, DatesService) {
	
	// First check if user is logged in
	//UsersService.isLoggedIn();

	// Create our goals container
	$scope.goals = {};

	// Get goals from API
	$http.get(MoleskinApp.url + 'goals')
		.success(function(goals) {
			$scope.goals = goals;
		})
		.error(function(status) {
			alert(status);
		});

	$scope.remaining = function() {
		var count = 0;

		angular.forEach($scope.goals, function(goal) {
			count += goal.completed ? 0 : 1;
		});

		return count;
	},

	$scope.addGoal = function() {
		var goal = { 		
			title: $scope.new_goal_title,
			due_date: $scope.new_goal_due_date,
			completed: false		
		};
		
		$http.post(MoleskinApp.url + 'goals', goal)
			.success(function(data) {

				// Need to update the goal with what the server returned
				// So I can give it the mysql id
				goal.id = data.id;

				addGoalToList(goal);
				$scope.new_goal_title = "";
				$scope.new_goal_due_date = "";
			})
			.error(function(status) {
				alert(status);				
			});	
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

		for(var i=0;i<$scope.goals.length;i++) 
		{
			if($scope.goals[i].id == goal.id) 
			{
				$scope.goals.current_goal = 1;
			}
		}
	}

	addGoalToList = function(goal) {		
		$scope.goals.push(goal);
	},

	$scope.checkTitle = function(data) {
		if( data == "" )
		{
			return "Title cannot be blank!";
		}		
	}

	$scope.checkDueDate = function(data) {	
		if( data == "" )
		{
			return false;
		}
	},

	$scope.completeGoal = function(goal) {
		
		goal.completed = goal.completed ? false : true;

		$scope.updateGoal(goal);
 	},

	$scope.updateGoal = function(goal) {
			
		$http.put(MoleskinApp.url + 'goals/' + goal.id, goal)
			.success(function(data) {
				console.log("goal updated");
			})
			.error(function(status) {
				alert(status);
			})
	},

	$scope.deleteGoal = function(goal, $index) {

		$http.delete(MoleskinApp.url + 'goals/' + goal.id)
			.success(function(data) {
				console.log("goal deleted");

				for(var i=0;i<$scope.goals.length;i++) {
					if($scope.goals[i].id == goal.id) {						
						$scope.goals.splice(i, 1);
					}
				}
			})
			.error(function(status) {
				alert(status);
			})
	}
	
});