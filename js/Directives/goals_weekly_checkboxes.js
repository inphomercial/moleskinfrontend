MoleskinApp.module('MoleskinAppDirective', [])
  .directive('goalWeeklyCheckboxes', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        console.log("Recognized the fundoo-rating directive usage");
      }
    });