

const HOST = "http://127.0.0.1:3001";

export function getHost() {
  return HOST;
}

export function serials() {
  return fetch(HOST + '/serials')
  .then((res) => res.json());
}

export function serial(serialUrl) {
  return fetch(HOST + '/serial/id/' + serialUrl)
  .then(function(result) {
    return result.json();
  });
}
