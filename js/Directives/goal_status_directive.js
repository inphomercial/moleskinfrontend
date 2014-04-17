MoleskinApp.directive('goalStatus', function () {
    
    goalStatus = {
    	
        restrict: 'E',
        replace: 'true',
        /*scope: {
        	goal: '='  = mean it's the same name, =Attr means it's a differant name
        },*/

        //transclue: true Makes the contents of directive have acccees to the scope OUTSIDE of directive

        /*element.css({
        	position: 'relative'
        })*/

		/*element.on('mousedown', function(event) {

		});*/

        // scope = angular scope object
        // element = the jqLite-wrapped element that this directive matches
        // attrs = hash object with key-value pair of attribute names and their values
        link: function(scope, element, attr) { 

        	/*var css_classes = {
        		completed: 'fa-check',
        		not_complete_not_pushed: 'fa-chevron-right',
        		not_completed_pushed: 'fa-chevron-left'        		
        	}, */

			if(goal.completed)
			{
				 temp = '<button type="button" class="btn btn-success" disabled="disabled">' +
					   '<i class="fa fa-check"></i>' +
					   '</button>'
			}     
			else if(!goal.completed && goal.pushed)
			{
				 temp = '<button type="button" class="btn btn-success" ng-click="pushGoal(goal)">' +
					   '<i class="fa fa-chevron-left"></i>' +
					   '</button>'
			} 	
			else
			{
				 temp = '<button type="button" class="btn btn-success" ng-click="pushGoal(goal)">' +
					   '<i class="fa fa-chevron-right"></i>' +
					   '</button>'
			}
        	
        },        
        template: temp
    }

    return goalStatus;
});