
# bare-auth-twitter

  Twitter authentication with [Bare Auth](https://github.com/lapwinglabs/bare-auth).

## Usage

**client.js:**

```js
var Twitter = require('twitter-bare-auth');
var twitter = Twitter()

twitter(function(err, profile) {
  if (err) throw err;
  console.log(profile);
});
```

**server.js (using express):**

```js
var Twitter = require('twitter-bare-auth');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

var app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

app.use(Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  // optionally include a 'sign' function to add support for JWT
}));

app.listen(5000);
```

## License

MIT

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
