MoleskinApp.controller('todosController', function ($scope, $http, $location, UsersService, TodosService, GoalsService, DatesService) {

	// Create our todos container
	$scope.todos = [], 
	$scope.current_position = DatesService.getToday();
	$scope.current_position_fancy = DatesService.getTodayFancy();

	$scope.$on('todos.update', function( event ) {
		$scope.todos = TodosService.todos;
	});

	// Initilization 
	var r = TodosService.getAllTodosByDate(DatesService.getToday());
	r.then(function (res) {
		$scope.todos = TodosService.todos;	
	})


	// First check if user is logged in
	//UsersService.isLoggedIn();

	
	/*// Get first set of todos
	getTodos(DatesService.getToday());

	function getTodos(date) {			
			$scope.todos = TodosService.getTodos(date);		
		//$scope.todos = TodosService.getTodos(date);

            var url = MoleskinApp.url + 'todos/' + date;
            
            console.log("url " + url);

            // Get todos from API
            $http.get(url)
                .success(function (data, status) {
        
                    $scope.todos = data;
                                        
                    //return TodosService.todos;
                })
                .error(function(status) {
                    alert(status);
                });        
	}
	/**/
	/*$scope.current_position = DatesService.getToday();
	$scope.current_position_fancy = DatesService.getTodayFancy();*/

	/*// Get todos from API
	$http.get(MoleskinApp.url + 'todos/' + DatesService.getToday())
		.success(function(todos) {
			$scope.todos = todos;
		})
		.error(function(status) {
			alert(status);
		});*/
/*
	$scope.todos = TodosService.getTodos()
		.then(function(result) {
			console.log(result);
		});

	console.log($scope.todos);*/
/*
	$scope.$on('todos.add', function( event ) {
		$scope.todos = TodosService.todos;
	});

	$scope.todos = TodosService.todos;*/

	/*$scope.add = function()
	{
		var todo = {
			title: "AYYYYY",
			goal_id: 4,
			completed: 0
		}

		TodosService.addTodo(todo);
	},*/

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
			user_id: UsersService.getUserId(),
			title: $scope.new_todo_title,
			date: DatesService.getToday(),			
			completed: 0,
			pushed_times: 0
		};
		
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

		if(todo.completed == 1)
		{
			if(todo.goal_id)
			{
				var goal = GoalsService.getPushedGoal(todo.goal_id);

				goal.actionable_completed++;

				GoalsService.updateGoal(goal);			
			}	
		}
		else
		{
			if(todo.goal_id)
			{
				var goal = GoalsService.getPushedGoal(todo.goal_id);

				goal.actionable_completed--;

				GoalsService.updateGoal(goal);			
			}	
		}
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

		console.log(todo);

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
});