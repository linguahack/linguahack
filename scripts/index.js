(function() {


  var linguahack = angular.module('linguahack');

  linguahack.controller('HomeCtrl', function($scope, Api) {
    Api.serials().success(function(data) {
      $scope.serials = data;
      $scope.serials.forEach(function(serial) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://image.tmdb.org/t/p/w342/" + serial.tmdb.poster_path);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            serial.poster = window.URL.createObjectURL(this.response);
            $scope.$apply();
        };
        xhr.send();
      })
    });
  });


  linguahack.controller('SerialCtrl', function($scope, $routeParams, Api) {
    var serialUrl = $routeParams.serial;

    var handle_serial = function(serial) {
      $scope.serial = serial;
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

}).call(this);
