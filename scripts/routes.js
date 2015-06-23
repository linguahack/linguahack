

(function() {

  var linguahack = angular.module('linguahack', ['ngRoute']);

  linguahack.config(['$routeProvider', '$locationProvider', router]);

  function router($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/about', {
      templateUrl: '/views/about.html'
    })
    .when('/serials/:serial', {
      templateUrl: '/views/serial.html',
      controller: 'SerialCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
})();