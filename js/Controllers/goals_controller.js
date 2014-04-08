MoleskinApp.controller('goalsController', function ($scope, $rootScope, $http, GoalsService) {
	
	// First check if user is logged in
	//UsersService.isLoggedIn();

	// Create our goals container
	$scope.goals = [];

	$rootScope.$on('goals.update', function( event ) {		
		$scope.goals = GoalsService.goals;
	});

	// Get all goals, builds out GoalsService.goals array 
	var r = GoalsService.getAllGoals();
	r.then(function (res) {
		$scope.goals = GoalsService.goals;	
	})

	$scope.remaining = function() {
		var count = 0;

		angular.forEach($scope.goals, function(goal) {
			count += goal.completed ? 0 : 1;
		});

		return count;
	},

	$scope.createGoal = function() {

		var goal = { 		
			title: $scope.new_goal_title,
			actionable_total: $scope.new_goal_actionable_total,
			actionable_completed: 0,
			due_date: $scope.new_goal_due_date,
			pushed: 0,
			completed: 0
		};

		$scope.new_goal_title = "";
		$scope.new_goal_actionable_total = "";
		$scope.new_goal_due_date = "";
		
		GoalsService.createGoal(goal);		
	},

	$scope.pushGoal = function(goal) {

		goal.pushed = goal.pushed ? 0 : 1;
		GoalsService.updateGoal(goal);		
	},

	$scope.checkTitle = function(data) {
		if( data == "" )
		{
			return "Title cannot be blank!";
		}		
	},

	$scope.checkActionableCompleted = function(data) {
		if( data == "" )
		{
			return "Cannot be blank!";
		}
	},

	$scope.checkActionableTotal = function(data) {
		if( data == "" )
		{
			return "Cannot be blank or 0!";
		}
	},

	$scope.checkDueDate = function(data) {	
		if( data == "" )
		{
			return false;
		}
	},

	$scope.updateGoal = function(goal) {

		GoalsService.updateGoal(goal);
	},

	$scope.deleteGoal = function(goal) {

		GoalsService.deleteGoal(goal);
		/*$http.delete(MoleskinApp.url + 'goals/' + goal.id)
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
			})*/
	}
	
});