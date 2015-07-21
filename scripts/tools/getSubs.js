
var linguahack = angular.module('linguahack');

linguahack.factory('getSubs', ['$http', '$q', getSubs]);

function getSubs($http, $q) {
  return function(opensubtitlesGzUrl, apiHost) {
    return $q(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', apiHost + '/subtitles/convert?url=' + opensubtitlesGzUrl);
      // xhr.responseType = 'blob';
      xhr.onload = function (e) {
        resolve(getVttCues(this.response));
      };
      xhr.send();
    });
  };
}

function getVttCues(subtitles) {
  var linesArray = subtitles.split('\r\n');
  var index = 3;
  var result = [];
  var parsedCue;
  while (index < linesArray.length - 1) {
    parsedCue = parseCue(linesArray, index);
    if(parsedCue.cue) {
      result.push(parsedCue.cue);
    }
    index = parsedCue.index + 2;
  }
  return result;
}

function timeToSeconds(time) {
  var units = time.split(':');
  return units[0] * 3600 + units[1] * 60 + parseFloat(units[2]);
}

function parseCue(linesArray, index) {
  if (index == 1506) {
    1;
  }
  var rangeRegex = /^(\d+:\d{2}:\d{2}\.\d{3}) --> (\d+:\d{2}:\d{2}\.\d{3})/;
  var range = rangeRegex.exec(linesArray[index]);
  var message = [];
  var nextLine;
  for( ++index; linesArray[index]; ++index) {
    message.push(linesArray[index]);
  }
  if(!range) {
    return {index: index};
  }
  return {
    cue: new VTTCue(timeToSeconds(range[1]), timeToSeconds(range[2]), message.join('\n')),
    index: index
  };
}