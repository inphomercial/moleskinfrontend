MoleskinApp.factory('UsersService', function($http, $location, localStorageService) {
    
    var UsersService = {

        email: null,
        user_id: null,
        is_logged_in: false,

        setUserDataFromStorage: function() {

            UsersService.email = localStorageService.get('email');
            UsersService.user_id = localStorageService.get('user_id');

            console.log(UsersService.email);
            console.log(UsersService.user_id);

            if(UsersService.email && UsersService.user_id)
            {
                UsersService.is_logged_in = true;
            }
            else
            {
                UsersService.is_logged_in = false;
            }
        },

        isLoggedIn: function() {

            UsersService.setUserDataFromStorage();

            if(UsersService.is_logged_in)
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