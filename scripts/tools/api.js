


class Api {
  constructor() {
    this.host = "http://91.219.30.35:3001";
  }

  getHost() {
    return this.host;
  }

  serials() {
    return fetch(this.host + '/serials')
    .then(function(result) {
      return result.json();
    });
  }

  serial(serialUrl) {
    return fetch(this.host + '/serial/' + serialUrl)
    .then(function(result) {
      return result.json();
    });
  }
}

export default (new Api());