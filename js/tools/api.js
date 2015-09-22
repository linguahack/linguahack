
import _getSubs from './getSubs';
import { api_server  } from '../config';

function graphql(query, variables) {
  return fetch(api_server + '/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(variables ? { query, variables: JSON.stringify(variables) } : { query }),
  }).then(response => response.json());
}


export function serials() {
  const query = `{
    serials {
      name
      url
      tmdb {
        id
        poster_path
      }
    }
  }`
  return graphql(query).then((res) => res.data.serials);
}

export function serial(serialUrl) {
  const query = `query Q($url: String!){
    serial(url: $url) {
      url
      name
      imdb {
        id
        rating
        description
      }
      tmdb {
        backdrop_path
      }
      fsto {
        id
      }
      seasons {
        number
        episodes {
          name
          number
          opensubtitles {
            SubFileName
            SubDownloadLink
          }
          fsto {
            files {
              file_id    
            }
          }
        }
      }
    }
  }`;
  return graphql(query, {url: serialUrl}).then((res) => res.data.serial);
}


export const getSubs = (trackLink) => _getSubs(trackLink, api_server)