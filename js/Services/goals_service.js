MoleskinApp.factory('GoalsService', function($http, $rootScope) {
    
    var GoalsService = {

      goals: [],
      goals_pushed: [],

       // Get goals from API
      getAllGoals: function() {

        return $http.get(MoleskinApp.url + 'goals')
              .success(function(goals) {
                  GoalsService.goals = goals;
              })
              .error(function(status) {
                  alert(status);
              });

            console.log(huk);
      },

       getPushedGoals: function() {

        return $http.get(MoleskinApp.url + 'goals/pushed')
              .success(function(goals_pushed) {
                  GoalsService.goals_pushed = goals_pushed;
              })
              .error(function(status) {
                  alert(status);
              });

            console.log(huk);
      },

      updateGoal: function( goal ) {
        
        console.log(goal);

        $http.put(MoleskinApp.url + 'goals/' + goal.id, goal)
            .success(function(data) { 
              //return true;      
            })
            .error(function(status) {
              alert(status);
            })
      },

      getPushedGoal: function( goal_id )
      {        
        for(var i=0; i<GoalsService.goals_pushed.length; i++)
        {
          if(GoalsService.goals_pushed[i].id == goal_id)
          {            
            return GoalsService.goals_pushed[i];
          }
        }
      },

      addGoal: function( goal ) {
          GoalsService.goals_pushed.push( goal );
          $rootScope.$emit( 'goals.update' );
      } 

    };

    return GoalsService;
});