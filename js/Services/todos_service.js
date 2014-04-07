MoleskinApp.factory('TodosService', function($http, $rootScope, $q, DatesService) {
    
    var TodosService = {

        /*todos: [
            {title:"eat stuff", goal_id: 2, completed: 0},
            {title:"mouse", goal_id: 3, completed: 1}
        ],
*/
        todos: [],

        addTodo: function ( todo ) {

            TodosService.todos.push( todo );
            $rootScope.$emit( 'todo.add' );
        },

        getTodos: function( date ) {

            var url = MoleskinApp.url + 'todos/' + date;
            var deferred = $q.defer();
           
            console.log("url " + url);

            // Get todos from API
            $http.get(url)
                .success(function (data) {

                    q.resolve(data);
                    
                    /*TodosService.todos = todos;
                    
                    //TodosService.todos = todos;
                    //$rootScope.$emit('todos.get');

                    return TodosService.todos;*/
                })
                .error(function(status) {
                    alert(status);
                });

            return deferred.promise;
        } 
    };

    return TodosService;
});