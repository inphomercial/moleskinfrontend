MoleskinApp.factory('DatesService', function($http, $location) {
    
    var DatesService = {

        current_position: null, 
        current_position_fancy: null,    

        incrementDatePosition: function() {

            var m = moment(DatesService.current_position).add('days', 1);

            DatesService.current_position = m.format("YYYY-MM-DD");            
        },

        decrementDatePosition: function() {

            var m = moment(DatesService.current_position).add('days',-1);

            DatesService.current_position = m.format("YYYY-MM-DD");            
        },
        
        getToday: function() {

            if(DatesService.current_position == null)
            {
                var y = moment().get('year');
                var m = moment().get('month')+1;
                //var d = moment().get('date')-1;
                var d = moment().get('date');

                var date = y + "-" + m + "-" + d;

                DatesService.current_position = moment(date).format("YYYY-MM-DD");                
            }

            return DatesService.current_position;
        },

        getTodayFancy: function() {

            var m = moment(DatesService.getToday()).format("MMM Do dddd");

            return m;
        },

        getTomorrow: function() {
            
            var m = moment(DatesService.current_position).add('days', 1);
            
            return moment(m).format("YYYY-MM-DD");           
        }
    };

    return DatesService;

});