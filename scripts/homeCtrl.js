

var linguahack = angular.module('linguahack');

linguahack.controller('HomeCtrl', function($scope, Api, getImage) {
  Api.serials().success(function(data) {
    $scope.serials = data;
    $scope.serials.forEach(function(serial) {
      getImage("http://image.tmdb.org/t/p/w342/" + serial.tmdb.poster_path)
      .then(function (image) {
          serial.poster = image;
      });
    })
  });
});
