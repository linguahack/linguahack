

var linguahack = angular.module('linguahack');

linguahack.controller('SerialCtrl', function($scope, $stateParams, Api, getImage) {
  var serialUrl = $stateParams.url;

  var handle_serial = function(serial) {
    $scope.serial = serial;
    getImage("http://image.tmdb.org/t/p/original" + serial.tmdb.backdrop_path)
    .then(function (image) {
      $scope.serial.background = image;
    });
    $scope.select_season(0);
    $scope.select_episode(0);
  };

  var video_element = document.getElementsByTagName('video')[0];
  // video_element.addEventListener('error', function(e) {
  //   Api.serialCheckFsto(serialUrl).success(function(data) {
  //     handle_serial(data);
  //     $scope.play_video();
  //   });
  // });

  $scope.select_season = function(number) {
    $scope.season = $scope.serial.seasons[number];
    $scope.select_episode(0);
  };
  $scope.select_episode = function(number) {
    $scope.episode = $scope.season.episodes[number];
  };
  $scope.play_video = function() {
    video_element.src = $scope.episode.best_link;
    video_element.load();
    video_element.play();
  };


  Api.serial(serialUrl).success(handle_serial);
});