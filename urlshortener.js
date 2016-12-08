'use strict';
const google = require('googleapis');

module.exports = function (apiKey, url) {
  return new Promise(function (resolve, reject) {
    if (typeof apiKey !== 'string' || apiKey.length === 0) {
      return reject(new TypeError('apiKey is invalid'));
    }

    if (typeof url !== 'string' || url.length === 0) {
      return reject(new TypeError('url is invalid'));
    }

    const urlshortener = google.urlshortener({
      version: 'v1',
      auth: apiKey
    });

    urlshortener.url.insert({
        resource: { longUrl: url }
      },
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.id);
        }
    });
  });
}
