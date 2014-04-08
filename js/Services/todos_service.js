MoleskinApp.factory('TodosService', function($http, $rootScope, GoalsService, DatesService) {
    
    var TodosService = {

       todos: [],
      
       // Get Todos from API
       getAllTodosByDate: function(date) {

        return $http.get(MoleskinApp.url + 'todos/' + date)
              .success(function(todos) {
                  TodosService.todos = todos;
              })
              .error(function(status) {
                  alert(status);
              });            
        },
      
        addTodo: function( todo ) {
            $http.post(MoleskinApp.url + 'todos', todo)
            .success(function(data) {
                                
                // Need to update the todo with what the server returned
                // So I can give it the mysql id
                todo.id = data.id;
                TodosService.todos.push(todo);                
            })
            .error(function(status) {
                alert(status);              
            }); 
          
          $rootScope.$emit( 'todos.update' );
        },

        deleteTodo: function( todo ) {

            $http.delete(MoleskinApp.url + 'todos/' + todo.id)
            .success(function(data) {                

                for(var i=0;i<TodosService.todos.length;i++) {
                    if(TodosService.todos[i].id == todo.id) {
                        TodosService.todos.splice(i, 1);
                    }
                }

                $rootScope.$emit( 'todos.update' );
            })
            .error(function(status) {
                alert(status);
            })
        },

        completeTodo: function( todo ) {

            for(var i=0;i<TodosService.todos.length;i++) 
            {
                if(TodosService.todos[i].id == todo.id) 
                {                                     
                    todo.completed = todo.completed ? 0 : 1;
                }
            }

            TodosService.updateTodo(todo);

            if(todo.completed == 1)
            {
                if(todo.goal_id)
                {
                    var goal = GoalsService.getPushedGoal(todo.goal_id);

                    // If the goal was deleted or completed before the todo was completed.
                     if(!goal)
                        return;

                    goal.actionable_completed++;

                    if(goal.actionable_completed >= goal.actionable_total)
                    {
                        goal.completed = 1;
                    }

                    GoalsService.updateGoal(goal);          
                }   
            }
            else
            {
                if(todo.goal_id)
                {
                    var goal = GoalsService.getPushedGoal(todo.goal_id);

                    // If the goal was deleted or completed before the todo was completed.
                    if(!goal)
                        return;

                    goal.actionable_completed--;

                    if(goal.actionable_completed < goal.actionable_total)
                    {
                        goal.completed = 0;
                    }

                    GoalsService.updateGoal(goal);          
                }   
            }

            $rootScope.$emit( 'todos.update' );
        },

        pushTodo: function( todo ) {

            todo.pushed_times += 1;
            todo.date = DatesService.getTomorrow();
        
            TodosService.updateTodo(todo);

            for(var i=0;i<TodosService.todos.length;i++) 
            {
                if(TodosService.todos[i].id == todo.id) 
                {                                     
                    TodosService.todos.splice(i, 1);
                }
            }

            $rootScope.$emit( 'todos.update' );            
        },

        updateTodo: function( todo ) {

            $http.put(MoleskinApp.url + 'todos/' + todo.id, todo)
                .success(function(data) {   
                    
                })
                .error(function(status) {
                    alert(status);
                })
        }

    };

    return TodosService;
});