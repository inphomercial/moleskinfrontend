MoleskinApp.factory('DatesService', function($http, $location) {
    
    var DatesService = {

        current_position: '',
        today: '',
        tomorrow: '',
        yesterday: '',

        incrementDatePosition: function() {

            var m = moment(DatesService.current_position).add('days', 1);

            DatesService.current_position = m.format("YYYY-MM-DD");
        },

        decrementDatePosition: function() {

            var m = moment(DatesService.current_position).add('days',-1);

            DatesService.current_position = m.format("YYYY-MM-DD");
        },

        getCurrentPosition: function() {

            if(DatesService.current_position == '')
            {
                var y = moment().get('year');
                var m = moment().get('month')+1;
                var d = moment().get('day')-1;

                var date = y + "-" + m + "-" + d;

                DatesService.current_position = moment(date).format("YYYY-MM-DD");
            }

            return DatesService.current_position;
        },

        getToday: function() {

            var y = moment().get('year');
            var m = moment().get('month')+1;
            var d = moment().get('day')-1;

            var date = y + "-" + m + "-" + d;

             return DatesService.today = moment(date).format("YYYY-MM-DD");
        },

        getYesterday: function() {

            var y = moment().get('year');
            var m = moment().get('month')+1;
            var d = moment().get('day')-2;

            var date = y + "-" + m + "-" + d;

            return DatesService.yesterday = moment(date).format("YYYY-MM-DD");
        },

        getTomorrow: function() {
        
            var y = moment().get('year');
            var m = moment().get('month')+1;
            var d = moment().get('day');

            var date = y + "-" + m + "-" + d;

            return DatesService.tomorrow = moment(date).format("YYYY-MM-DD");
        }
    };

    return DatesService;

});