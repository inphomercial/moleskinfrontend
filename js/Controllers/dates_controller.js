MoleskinApp.controller('datesController', function ($scope, DatesService) {
	
	/*$scope.today = DatesService.getToday();
	$scope.tomorrow = DatesService.getTomorrow();
	$scope.yesterday = DatesService.getYesterday();*/
	$scope.current_position = DatesService.getCurrentPosition();

    $scope.decrementDate = function() {
    	DatesService.decrementDatePosition();
    	$scope.updateAll();
    },

    $scope.incrementDate = function() {
    	DatesService.incrementDatePosition();
    	$scope.updateAll();
    },

    $scope.updateAll = function() {
    	/*$scope.today = DatesService.getToday();
		$scope.tomorrow = DatesService.getTomorrow();
		$scope.yesterday = DatesService.getYesterday();*/
		$scope.current_position = DatesService.getCurrentPosition();
    }
});