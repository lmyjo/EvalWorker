const url = require('url');

module.exports = {
  getURI: function getURI (composed) {
    var urlObject = {
      protocol: process.env.UTILITY_PROTOCOL,
      host: process.env.UTILITY_HOST + ':' + process.env.UTILITY_PORT + composed,
    }
    return url.format(urlObject);
  }
}
