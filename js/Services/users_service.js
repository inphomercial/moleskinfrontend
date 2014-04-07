MoleskinApp.factory('UsersService', function($http, $location) {
    
    var UsersService = {

        email: null,
        user_id: null,
        isLogged: false,

        isLoggedIn: function() {

            if(UsersService.isLogged)
            {
                return true;            
            }
            else
            {
                $location.path('/login');
            }
        },

        getUserId: function() {
            return UsersService.user_id;
        },

        getUserEmail: function() {
            return UsersService.email;
        }

    };

    return UsersService;
});