MoleskinApp.factory('UsersService', function($http, $location) {
    
    var UsersService = {

        email: '',
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
        }

    };

    return UsersService;


   /*     companies: [],

        getCompanyById: function(id) {
            var url = inventoryApp.url + "admin/" + id + "?key=admin";

            return $http.get(url)
                .success(function (response) {
                    return response;
                })
                .error(function (data, status) {
                    alert("Error" + status);
                });
        },

        getCompanies: function() {
            var url = inventoryApp.url + "admin?key=admin";

            return $http.get(url)
                .success(function (response) {
                    // it worked reset companies to stop duplication
                    CompanyService.companies = [];
                    for(var i=0; i < response.length; i++) {
                        CompanyService.companies.push(response[i]);
                    }
                    return CompanyService.companies;
                })
                .error(function (data, status) {
                    alert("Error" + status);
                });
        },

        deleteCompany: function(id)
        {
            var url = inventoryApp.url + "admin/" + id + "?key=admin";

            return $http.delete(url)
                .success(function (response) {
                    alertify.success("Company Deleted");
                    for(var i=0; i < CompanyService.companies.length; i++) {
                        if(CompanyService.companies[i].id == id) {
                            CompanyService.companies.splice(i, 1);
                        }
                    }
                    console.log(CompanyService.companies);
                    return CompanyService;
                })
                .error(function (data, status) {
                    alert("Error" + status);
                });
        },

        newCompany: function(newCompany) {

            var postUrl = inventoryApp.url + "admin?key=admin";

            return $http({method: 'POST', url: postUrl, data: newCompany })
                .success(function( data, status, headers, config )
                {
                    alertify.success("Company Created");
                    CompanyService.companies.push(data);
                })
                .error(function( data, status, headers, config) {
                    alert("Error" + status);
                });

        },

        updateCompany: function(selected_company) {

            var url = inventoryApp.url + "admin/" + selected_company.id + "?key=admin";

            return $http.put(url, selected_company)
                .success(function (response)
                {
                    alertify.success("Company Updated");

                    // it worked
                    for(var i=0; i < CompanyService.companies.length; i++)
                    {
                        if(CompanyService.companies[i].id == selected_company.id)
                        {
                            CompanyService.companies[i]['name'] = selected_company.name;
                            CompanyService.companies[i]['enabled'] = selected_company.enabled;
                        }
                    }

                    return CompanyService;
                })
                .error(function (data, status) {
                    alert("Error" + status);
                });
        }*/
});