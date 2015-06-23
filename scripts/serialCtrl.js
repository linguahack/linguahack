

var linguahack = angular.module('linguahack');

linguahack.factory('fsParse', ['$http', fsParse]);

function fsParse($http) {
  return function(serial, file, episodeNumber) {
    return $http.get(
      'http://fs.to/video/serials/view_iframe/' + serial.fsto.id,
      {
        play: 1,
        file: file.file_id
      }
    )
    .then(function(body) {
      var elem = $(body.data);

      var files = [];
      
      $('.b-aplayer__popup-series-episodes > ul > li > a', elem).each(function(i, elem) {
        var episode = JSON.parse($(elem).attr('data-file'));
        if (+episode.fsData.file_series === episodeNumber + 1) {
          files.push({
            number: +episode.fsData.file_series,
            quality: episode.fsData.file_quality,
            file_id: +episode.fsData.file_id,
            link: episode.url
          });
        }
      });

      return files[0];
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
    $scope.season = $scope.serial.seasons[number];
    $scope.select_episode(0);
  };
  $scope.select_episode = function(number) {
    return fsParse($scope.serial, $scope.season.episodes[number].fsto.files[0], number)
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