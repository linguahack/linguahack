
(function() {

  var linguahack = angular.module('linguahack');

  linguahack.factory('Api', Api);

  Api.inject = ['$http'];

  function Api($http) {
    var host = "http://91.219.30.35:3001";

    return {
      serials: function() {
        return $http.get(host + '/serials');
      },

      serial: function(serialUrl) {
        return $http.get(host + '/serial/' + serialUrl);
      },

      serialCheckFsto: function(serialUrl) {
        return $http.get(host + '/serial/' + serialUrl + '/check_fsto');
      }

    }
  }


})();