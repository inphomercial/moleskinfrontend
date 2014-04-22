var MoleskinApp = angular.module('MoleskinApp', ['ngRoute', 'xeditable', 'LocalStorageModule', 'ui.bootstrap']);

// Used to theme the editable fields
MoleskinApp.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
});

MoleskinApp.url = "http://localhost/moleskin/public/index.php/";
//MoleskinApp.url = "http://inphomercial.com/moleskinbackend/";