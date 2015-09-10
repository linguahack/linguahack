
export default function(fstoId, fileId, episodeNumber) {
  return fetch(`http://fs.to/video/serials/view_iframe/${fstoId}?play=1&file=${fileId}`)
  .then(function(response) {
    return response.text();
  })
  .then(function(response) {
    var elem = $(response);

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
