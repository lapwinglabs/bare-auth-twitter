/**
 * Module Dependencies
 */

var Twitter = require('twitter-oauth-agent');
var passthrough = function (v) { return v };

/**
 * Export `twitter`
 */

module.exports = twitter;

/**
 * Twitter authentication middleware
 *
 * @param {Object} options
 */

function twitter(options) {
  return function (req, res, next) {
    if (req.path != '/auth/twitter' || (req.method != 'POST' && req.method != 'GET')) {
      return next();
    }

    var sign = options.sign || passthrough;
    var query = req.query;
    var body = req.body;

    // Step 1: request token
    if (req.method == 'GET') {
      Twitter({
        consumer_key: options.consumer_key,
        consumer_secret: options.consumer_secret,
        callback: query.callback || options.callback
      }, function(err, token) {
        if (err) return res.status(500).send({ error: err.message });
        res.send(token);
      })
    }

    // Step 2: get profile
    if (req.method == 'POST') {
      Twitter({
        consumer_secret: options.consumer_secret,
        oauth_verifier: body.oauth_verifier,
        consumer_key: options.consumer_key,
        oauth_token: body.oauth_token
      }, function(err, profile) {
        if (err) return res.status(500).send({ error: err.message });
        res.send(sign(profile));
      })
    }

  }
}
