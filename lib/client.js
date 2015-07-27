/**
 * Module Dependencies
 */

var Twitter = require('twitter-oauth-agent');
var superagent = require('superagent');
var assign = require('object-assign');

/**
 * Export `twitter`
 */

module.exports = twitter;

/**
 * Defaults
 */

var defaults = {
  redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host
};

/**
 * Twitter
 */

function twitter(options) {
  return function _twitter(fn) {
    options = assign(defaults, options);
    Twitter(options, function(err, code) {
      if (err) return fn(err);

      var obj = assign({
        code: code,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri
      })

      superagent.post(options.url + '/auth/twitter')
        .send(obj)
        .end(function(err, res) {
          if (err) return fn(err);
          return fn(null, res.body || res.text);
        });
    })
  }
}
