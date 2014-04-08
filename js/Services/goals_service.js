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
      },

       getPushedGoals: function() {

        return $http.get(MoleskinApp.url + 'goals/pushed')
              .success(function(goals_pushed) {
                  GoalsService.goals_pushed = goals_pushed;
              })
              .error(function(status) {
                  alert(status);
              });
      },

      updateGoal: function( goal ) {

        $http.put(MoleskinApp.url + 'goals/' + goal.id, goal)
          .success(function(data) {
            console.log("goal updated");
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

      deleteGoal: function( goal ) {

        $http.delete(MoleskinApp.url + 'goals/' + goal.id)
          .success(function(data) {
            for(var i=0;i<GoalsService.goals.length;i++) 
            {
              if(GoalsService.goals[i].id == goal.id)
              {           
                GoalsService.goals.splice(i, 1);
                $rootScope.$emit( 'goals.update' );
              }
            }
          })
          .error(function(status) {
            alert(status);
          })

          /*$rootScope.$emit( 'goals.update' );*/
      },

      createGoal: function( goal ) {
        $http.post(MoleskinApp.url + 'goals', goal)
          .success(function(data) {

            // Need to update the goal with what the server returned
            // So I can give it the mysql id
            goal.id = data.id;
            GoalsService.goals.push(goal);      
            $rootScope.$emit( 'goals.update' );
          })
          .error(function(status) {
            alert(status);        
          }); 
          
          /*$rootScope.$emit( 'goals.update' );*/
      } 

    };

    return GoalsService;
});