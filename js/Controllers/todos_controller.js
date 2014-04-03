MoleskinApp.controller('todosController', function ($scope, $http, $location, UsersService, DatesService) {
	
	// First check if user is logged in
	//UsersService.isLoggedIn();

	// Create our todos container
	$scope.todos = {},
	$scope.current_position = DatesService.getToday();
	$scope.current_position_fancy = DatesService.getTodayFancy();

	// Get todos from API
	$http.get(MoleskinApp.url + 'todos/' + DatesService.getToday())
		.success(function(todos) {
			$scope.todos = todos;
			console.log(todos);
		})
		.error(function(status) {
			alert(status);
		});

    $scope.decrementDate = function() {

    	DatesService.decrementDatePosition();
    	$scope.current_position = DatesService.getToday();
    	$scope.current_position_fancy = DatesService.getTodayFancy();
    	$scope.getTodosBasedOnDate();
    },

    $scope.incrementDate = function() {

    	DatesService.incrementDatePosition();
    	$scope.current_position = DatesService.getToday();
    	$scope.current_position_fancy = DatesService.getTodayFancy();
    	$scope.getTodosBasedOnDate();
    },

	$scope.getTodosBasedOnDate = function() {

		// Get todos from API
		$http.get(MoleskinApp.url + 'todos/' + DatesService.getToday())
			.success(function(todos) {
				$scope.todos = todos;
			})
			.error(function(status) {
				alert(status);
			});
	},

	$scope.addTodo = function() {
		
		var todo = { 		
			title: $scope.new_todo_title,
			date: DatesService.current_position,
			user_id: UsersService.getUserId(),
			completed: 0,
			pushed_times: 0
		};

		console.log(todo);
		
		$http.post(MoleskinApp.url + 'todos', todo)
			.success(function(data) {

				console.log(data);
				
				// Need to update the todo with what the server returned
				// So I can give it the mysql id
				todo.id = data.id;

				addTodoToList(todo);
				$scope.new_todo_title = "";						
			})
			.error(function(status) {
				alert(status);				
			});	
	},

	addTodoToList = function(todo) {		
		$scope.todos.push(todo);
	}

	$scope.completeTodo = function(todo) {				
		todo.completed = todo.completed ? 0 : 1;
		$scope.updateTodo(todo);
 	},

 	$scope.pushTodo = function(todo) {

 		todo.pushed_times += 1;
 		todo.date = DatesService.getTomorrow();
 	
 		$scope.updateTodo(todo);

 		for(var i=0;i<$scope.todos.length;i++) 
		{
			if($scope.todos[i].id == todo.id) 
			{						
				$scope.todos.splice(i, 1);
			}
		}
 	},

 	$scope.deleteTodo = function(goal) {

		$http.delete(MoleskinApp.url + 'todos/' + goal.id)
			.success(function(data) {
				console.log("goal deleted");

				for(var i=0;i<$scope.todos.length;i++) {
					if($scope.todos[i].id == goal.id) {
						$scope.todos.splice(i, 1);
					}
				}
			})
			.error(function(status) {
				alert(status);
			})
	}

	$scope.updateTodo = function(todo) {
		$http.put(MoleskinApp.url + 'todos/' + todo.id, todo)
			.success(function(data) {	
				//return true;			
			})
			.error(function(status) {
				alert(status);
			})
	},

	$scope.checkTitle = function(data) {
		if( data == "" )
		{
			return "Title cannot be blank!";
		}		
	}

/*	$scope.checkDueDate = function(data) {	
		if( data == "" )
		{
			return false;
		}
	},

/*	$scope.completeTodo = function(todo) {
		
		goal.completed = goal.completed ? false : true;

		$scope.updateGoal(goal);
 	},*/
/*
	$scope.updateTodo = function(goal) {
			
		$http.put(MoleskinApp.url + 'todos/' + goal.id, goal)
			.success(function(data) {
				console.log("goal updated");
			})
			.error(function(status) {
				alert(status);
			})
	},*/
	
});