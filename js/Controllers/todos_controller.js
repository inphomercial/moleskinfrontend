MoleskinApp.controller('todosController', function ($scope, $rootScope, $http, $location, UsersService, TodosService, DatesService) {

	// First check if user is logged in
	UsersService.isLoggedIn();

	// Create our todos container
	$scope.todos = [], 	
	$scope.current_position_fancy = DatesService.getTodayFancy();

	$rootScope.$on('todos.update', function( event ) {		
		$scope.todos = TodosService.todos;
	});

	// Initilization 
	var r = TodosService.getAllTodosByDate(DatesService.getToday());
	r.then(function (res) {
		$scope.todos = TodosService.todos;	
	})
	
	$scope.decrementDate = function() {

    	DatesService.decrementDatePosition();    	
    	$scope.current_position_fancy = DatesService.getTodayFancy();
    	$scope.getTodosBasedOnDate();
    },

    $scope.incrementDate = function() {

    	DatesService.incrementDatePosition();    	
    	$scope.current_position_fancy = DatesService.getTodayFancy();
    	$scope.getTodosBasedOnDate();
    },

	$scope.getTodosBasedOnDate = function() {

		var r = TodosService.getAllTodosByDate(DatesService.getToday());
		r.then(function (res) {
			$scope.todos = TodosService.todos;
		})
	},

	// Adding a new Todo from the New Todo field
	$scope.addTodo = function() {
		
		var todo = { 		
			user_id: UsersService.getUserId(),
			title: $scope.new_todo_title,
			date: DatesService.getToday(),			
			completed: 0,
			pushed_times: 0
		};

		$scope.new_todo_title = "";		

		TodosService.addTodo( todo );
	},

	$scope.completeTodo = function(todo) {	

		TodosService.completeTodo(todo);
 	},

 	// Pushes todo to next day
 	$scope.pushTodo = function(todo) {

 		TodosService.pushTodo(todo);
 	},

 	// Deletes current todo
 	$scope.deleteTodo = function(todo) {

 		TodosService.deleteTodo(todo);
	},

	$scope.updateTodo = function(todo) {

		TodosService.updateTodo(todo);
	},

	$scope.checkTitle = function(data) {
		if( data == "" )
		{
			return "Title cannot be blank!";
		}		
	}
});