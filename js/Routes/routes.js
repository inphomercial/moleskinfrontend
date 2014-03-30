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
      .otherwise({
        redirectTo: '/'
      });
  }]);