


var linguahack = angular.module('linguahack');

linguahack.factory('getImage', ['$http', '$q', getImage]);

function getImage($http, $q) {
  return function(url) {
    return $q(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function (e) {
        resolve(window.URL.createObjectURL(this.response));
      };
      xhr.send();
    });
  };
}