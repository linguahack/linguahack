

(function() {

  var linguahack = angular.module('linguahack', ['ui.router']);

  linguahack.config(['$stateProvider', '$locationProvider', router]);

  function router($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

    $stateProvider
    .state('home', {
      url: "",
      templateUrl: '/views/home.html',
      controller: 'HomeCtrl'
    })
    .state('about', {
      templateUrl: '/views/about.html'
    })
    .state('serial', {
      url: '/serial/:url',
      templateUrl: '/views/serial.html',
      controller: 'SerialCtrl'
    });
  }
})();