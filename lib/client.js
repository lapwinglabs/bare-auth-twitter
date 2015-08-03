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
  redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
  url: ''
};

/**
 * Twitter
 */

function twitter(options) {
  return function _twitter(fn) {
    options = assign(defaults, options);

    // Fetch the request token
    superagent.get(options.url + '/auth/twitter')
      .query({ callback: options.redirect_uri })
      .end(function(err, res) {
        if (err) return fn(err);

        // Get the oauth token
        Twitter(res.body, function(err, code) {
          if (err) return fn(err);

          var obj = {
            oauth_token: code.oauth_token,
            oauth_verifier: code.oauth_verifier
          };

          // exchange the token for a profile
          superagent.post(options.url + '/auth/twitter')
            .send(obj)
            .end(function(err, res) {
              if (err) return fn(err);
              return fn(null, res.body || res.text);
            });
        })
      })
  }
}
