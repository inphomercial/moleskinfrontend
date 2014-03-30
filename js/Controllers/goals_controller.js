MoleskinApp.controller('goalsController', function ($scope, $http, UsersService) {
	
	// First check if user is logged in
	UsersService.isLoggedIn();

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

				$scope.addGoalToList(goal);
				$scope.new_goal_title = "";
				$scope.new_goal_due_date = "";
			})
			.error(function(status) {
				alert(status);				
			});	
	},

	$scope.completeGoal = function(goal, $index) {
		
		goal.completed = goal.completed ? false : true;

		$http.put(MoleskinApp.url + 'goals/' + goal.id, goal)
			.success(function() {
				
			})
			.error(function(status) {
				alert(status);
			})

 	},

 	$scope.editGoal = function(goal, $index) {
 		console.log('editing goal');
 	},

	$scope.addGoalToList = function(goal) {		
		$scope.goals.push(goal);
	}
	
});