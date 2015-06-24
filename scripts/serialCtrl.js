

var linguahack = angular.module('linguahack');

linguahack.factory('fsParse', ['$http', fsParse]);

function fsParse($http) {
  return function(serial, file, episodeNumber) {
    return $http({
      method: "GET",
      url: 'http://fs.to/video/serials/view_iframe/' + serial.fsto.id,
      params: {
        play: 1,
        file: file.file_id
      }
    })
    .then(function(body) {
      var elem = $(body.data);

      var file;
      
      $('.b-aplayer__popup-series-episodes > ul > li > a', elem).each(function(i, elem) {
        if (file) return;
        var episode = JSON.parse($(elem).attr('data-file'));
        if (+episode.fsData.file_series === +episodeNumber) {
          file = {
            number: +episode.fsData.file_series,
            quality: episode.fsData.file_quality,
            file_id: +episode.fsData.file_id,
            link: episode.url
          };
        }
      });

      return file;
    });
  };
}

linguahack.controller('SerialCtrl', function($scope, $stateParams, Api, getImage, fsParse) {
  var serialUrl = $stateParams.url;

  var handle_serial = function(serial) {
    $scope.serial = serial;
    getImage("http://image.tmdb.org/t/p/original" + serial.tmdb.backdrop_path)
    .then(function (image) {
      $scope.serial.background = image;
    });
    $scope.select_season(0);
  };

  var video_element = document.getElementsByTagName('video')[0];


  $scope.select_season = function(number) {
    $scope.serial.seasons[number].episodes.sort(function(first, second) {
      return first.number - second.number;
    });
    $scope.season = $scope.serial.seasons[number];
    $scope.select_episode(0);
  };
  $scope.select_episode = function(number) {
    return fsParse($scope.serial, $scope.season.episodes[number].fsto.files[0], $scope.season.episodes[number].number)
    .then(function(result) {
      console.log(result);
      $scope.season.episodes[number].link = 'http://fs.to' + result.link;
      $scope.episode = $scope.season.episodes[number];
    })
  };
  $scope.play_video = function() {
    video_element.src = $scope.episode.link;
    video_element.load();
    video_element.play();
  };


  Api.serial(serialUrl).success(handle_serial);
});