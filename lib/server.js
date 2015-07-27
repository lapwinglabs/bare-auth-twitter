/**
 * Module Dependencies
 */

var Twitter = require('twitter-oauth-agent');

/**
 * Export `twitter`
 */

module.exports = twitter;

/**
 * Twitter authentication middleware
 *
 * @param {Object} options
 * @return {Function}
 */

function twitter(options) {
  return function (req, res, next) {
    if (req.method != 'POST' || req.path != '/auth/twitter') {
      return next();
    }

    var body = req.body;
    var sign = options.sign;

    Twitter({
      code: body.code,
      client_id: body.client_id,
      client_secret: options.client_secret,
      redirect_uri: body.redirect_uri,
    }, function(err, profile) {
      if (err) return res.status(500).send({ error: err.message });
      sign ? res.send(sign(profile)) : res.send(profile);
    })
  }
}
