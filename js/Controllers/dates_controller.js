MoleskinApp.controller('datesController', function ($scope, $http, $location, UsersService) {
	
	// First check if user is logged in
	//UsersService.isLoggedIn();

	getNextDatePositionInFormat = function() {

		var m = moment($scope.current_date_position).add('days', 1);

		$scope.current_date_position = m.format("YYYY-MM-DD");
	},

	getPreviousDatePositionInFormat = function() {

		var m = moment($scope.current_date_position).add('days',-1);

		$scope.current_date_position = m.format("YYYY-MM-DD");
	},

	getTodaysDateInFormat = function() {

		var y = moment().get('year');
		var m = moment().get('month')+1;
		var d = moment().get('day')-1;

		var date = y + "-" + m + "-" + d;

		var date_timezone = moment(date).format("YYYY-MM-DD");

		return date_timezone;
	},

	getYesterdaysDateInFormat = function() {

		var y = moment().get('year');
		var m = moment().get('month')+1;
		var d = moment().get('day')-2;

		var date = y + "-" + m + "-" + d;

		var date_timezone = moment(date).format("YYYY-MM-DD");

		return date_timezone;
	},


	getTommorowsDateInFormat = function() {
		
		var y = moment().get('year');
		var m = moment().get('month')+1;
		var d = moment().get('day');

		var date = y + "-" + m + "-" + d;

		var date_timezone = moment(date).format("YYYY-MM-DD");

		return date_timezone;
	}

	// Current date postion
	$scope.current_date_position = getTodaysDateInFormat();

	// Todays date
	$scope.today = getTodaysDateInFormat();

	// Tomorrows date
	$scope.tomorrow = getTommorowsDateInFormat();

	// Yesterdays date
	$scope.yesterday = getYesterdaysDateInFormat();

	console.log("today =" + $scope.today);
	console.log("tomorrow =" + $scope.tomorrow);
	console.log("yesterday = " + $scope.yesterday);
	console.log("current pos = " + $scope.current_date_position);

	getNextDatePositionInFormat();
	getNextDatePositionInFormat();
	getNextDatePositionInFormat();
	getPreviousDatePositionInFormat();

	console.log("current pos = " + $scope.current_date_position);


	/*$scope.addTodo = function() {
		var todo = { 		
			title: $scope.new_todo_title
		};
		
		$http.post(MoleskinApp.url + 'todos', todo)
			.success(function(data) {

				// Need to update the todo with what the server returned
				// So I can give it the mysql id
				todo.id = data.id;

				addTodoToList(todo);
				$scope.new_todo_title = "";				
			})
			.error(function(status) {
				alert(status);				
			});	
	}*/
	
});