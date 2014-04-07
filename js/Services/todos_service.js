MoleskinApp.factory('TodosService', function($http, $rootScope, $q, DatesService) {
    
    var TodosService = {

        /*todos: [
            {title:"eat stuff", goal_id: 2, completed: 0},
            {title:"mouse", goal_id: 3, completed: 1}
        ],
*/
        todos: [],

        var addTodo: function ( todo ) {

            TodosService.todos.push( todo );
            $rootScope.$emit( 'todo.add' );
        },

        var getTodos: function( date ) {

            var url = MoleskinApp.url + 'todos/' + date;
            
            console.log("url " + url);

            // Get todos from API
            $http.get(url)
                .success(function (data, status) {
        
                    TodosService.todos = data;
                                        
                    return TodosService.todos;
                })
                .error(function(status) {
                    alert(status);
                });        
        } 
    };

    return TodosService;
});