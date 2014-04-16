MoleskinApp.config(['$routeProvider', function($routeProvider) 
{
    $routeProvider
      .when('/login', {        
        templateUrl: 'views/login.html'
      })    
      .when('/logout', {
        templateUrl: 'views/login.html'
      })
      .when('/goals', {
        templateUrl: 'views/goals.html'
      })
      .when('/todos', {
        templateUrl: 'views/todos.html'
      })
      .when('/changelog', {
        templateUrl: 'views/changelog.html'
      })
      .otherwise({
        templateUrl: 'views/login.html'
        /*redirectTo: 'views/login.html'*/
      });
  }]);