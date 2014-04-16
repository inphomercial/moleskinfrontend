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
              .error(function(data) {
                  alertify.error("Problem getting all goals : " + data.message);
              });
      },

       getPushedGoals: function() {

        return $http.get(MoleskinApp.url + 'goals/pushed')
              .success(function(goals_pushed) {
                  GoalsService.goals_pushed = goals_pushed;
              })
              .error(function(data) {
                  alertify.error("Problem getting pushed goals : " + data.message);
              });
      },

      incrementCompleted: function( goal_id )
      {
          var goal = GoalsService.getPushedGoal(goal_id);

          // If the goal was deleted or completed before the todo was completed.
          if(!goal)
          {
              return;
          }

          goal.actionable_completed++;

          if(goal.actionable_completed >= goal.actionable_total)
          {
              goal.completed = 1;

              // To prevent dupes from over completing goals
              goal.actionable_completed = goal.actionable_total;
          }

          GoalsService.updateGoal(goal);          
      },

      decrementCompleted: function( goal_id )
      {
          var goal = GoalsService.getPushedGoal(goal_id);

          // If the goal was deleted or completed before the todo was completed.
          if(!goal)
          {            
              return;
          }

          goal.actionable_completed--;

          if(goal.actionable_completed < goal.actionable_total)
          { 
              // To prevent Negative numbers
              if(goal.actionable_completed < 0)
              {
                goal.actionable_completed = 0;
              }

              goal.completed = 0;
          }

          GoalsService.updateGoal(goal);          
      },

      updateGoal: function( goal ) {

        $http.put(MoleskinApp.url + 'goals/' + goal.id, goal)
          .success(function(data) {
            console.log("goal updated");
          })
          .error(function(data) {
              alertify.error("Problem updating goal : " + data.message);
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
          .error(function(data) {
              alertify.error("Problem deleting goal : " + data.message);
          })
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
          .error(function(data) {
            alertify.error("Problem creating goal : " + data.message);
          }); 
      } 

    };

    return GoalsService;
});