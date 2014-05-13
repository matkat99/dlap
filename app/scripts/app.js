'use strict';

angular.module('dlapApp', ['ui.router', 'ngRoute'])
  /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })*/
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        var home = {
                name: 'home',
                url: '/',
               // parent: 'index.html',
                templateUrl: 'views/main.html'
            },
           
            dlap = {
                name: 'dlap',
                url: '/dlap',
                //parent: 'index.html',
                templateUrl: 'views/dlap.html',
                controller: 'DlapCtrl'
            };
            $stateProvider.state(home);
            $stateProvider.state(dlap);
        
        
        
        }]);

