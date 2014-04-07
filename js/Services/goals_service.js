MoleskinApp.factory('GoalsService', function($http, $rootScope) {
    
    var GoalsService = {

       goals: [
           { todo_id: 1, title: "walk dog", pushed: true, complete: 1 },
           { todo_id: 2, title: "eat food", pushed: false, completed: 0 },
           { todo_id: 3, title: "adfas a", pushed: false, completed: 0 }
       ],

        addGoal: function( goal ) {
            GoalsService.goals.push( goal );
            $rootScope.$emit( 'goals.update' );
        } 
    };

    return GoalsService;
});