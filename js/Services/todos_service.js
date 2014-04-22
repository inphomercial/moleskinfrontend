MoleskinApp.factory('TodosService', function($http, $rootScope, GoalsService, DatesService) {
    
    var TodosService = {

       todos: [],
      
       // Get Todos from API
       getAllTodosByDate: function(date) {

        return $http.get(MoleskinApp.url + 'todos/' + date)
              .success(function(todos) {
                  TodosService.todos = todos;                  
              })
              .error(function(data) {
                  alertify.error("Problem getting todos by date : " + data.message);
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
            .error(function(data) {
                alertify.error("Problem adding todo : " + data.message);         
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
            .error(function(data) {
               alertify.error("Problem deleting todo : " + data.message);
            })
        },

        completeTodo: function( todo ) {

            for(var i=0;i<TodosService.todos.length;i++) 
            {
                if(TodosService.todos[i].id == todo.id) 
                {                   
                    console.log("found todo");

                    // Why doesnt todo.completed ? 0 : 1; work online??
                    todo.completed = (todo.completed == 1) ? 0 : 1;                    
                }
            }

            TodosService.updateTodo(todo);
            $rootScope.$emit( 'todos.update' );

            if(todo.completed == 1)
            {
                if(todo.goal_id)
                {                    
                    GoalsService.incrementCompleted(todo.goal_id);
                }   
            }
            else
            {                
                if(todo.goal_id)
                {
                    GoalsService.decrementCompleted(todo.goal_id);            
                }   
            }                   
        },

        pushTodo: function( todo ) {

            // Why doesnt ++ or += work online?
            todo.pushed_times = todo.pushed_times + 1;
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
                .error(function(data) {
                    alertify.error("Problem updating todo : " + data.message);
                })
        }

    };

    return TodosService;
});