MoleskinApp.controller('goalsController', function ($scope, $rootScope, $http, $filter, DatesService, UsersService, GoalsService) {
	
	// First check if user is logged in
	UsersService.isLoggedIn();

	// Create our goals container
	$scope.goals = [];

	// Date format for the datepicker
	$scope.format = 'yyyy-MM-dd';

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
			count += (goal.completed == 1) ? 0 : 1;
		});

		return count;
	},

	$scope.createGoal = function() {

		if($scope.new_goal_due_date)
		{
			var date_filter = $filter('date');
			formattedDate   = date_filter($scope.new_goal_due_date, 'yyyy-MM-dd');	
		}
		else
		{
			formattedDate = null;
		}		

		var goal = { 		
			title: $scope.new_goal_title,
			actionable_total: $scope.new_goal_actionable_total,
			actionable_completed: 0,
			due_date: formattedDate,
			pushed: 0,
			completed: 0
		};

		$scope.new_goal_title = "";
		$scope.new_goal_actionable_total = "";
		$scope.new_goal_due_date = "";
		
		GoalsService.createGoal(goal);		
	},

	$scope.pushGoal = function(goal) {

		goal.pushed = (goal.pushed == 1) ? 0 : 1;
		goal.date = DatesService.getToday();
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

	$scope.statusIsCompleted = function(goal) {
		if( goal.completed == 1)
		{
			return true;
		}

		return false;
	},

	$scope.statusIsNotCompletedAndNotPushed = function(goal) {
		if( goal.completed == 0 && goal.pushed == 0)
		{
			return true;
		}

		return false;
	}

	$scope.statusIsNotCompletedAndPushed = function(goal) {
		if( goal.completed == 0 && goal.pushed == 1)
		{
			return true;
		}

		return false;
	},



	$scope.updateGoal = function(goal) {

		GoalsService.updateGoal(goal);
	},

	$scope.deleteGoal = function(goal) {

		GoalsService.deleteGoal(goal);		
	}
	
});