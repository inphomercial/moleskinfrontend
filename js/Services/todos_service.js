MoleskinApp.factory('TodosService', function($http, $rootScope) {
    
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

            console.log(huk);
        },
      
        addTodo: function( todo ) {
          TodosService.todos.push(todo);
          $rootScope.$emit( 'todos.update' );
        } 

    };

    return TodosService;
});