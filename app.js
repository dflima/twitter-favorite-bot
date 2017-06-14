var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search params
var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above parameters
T.get('search/tweets', params, function(err, data, response) {
  console.log(data);
  // If there is no error, proceed
  if (!err) {
    // Loop through the returned tweets
    for (let i = 0; i < data.statuses.length; i++) {
      // Get the tweet id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to favorite the selected tweet
      T.post('favorites/create', id, function(err, response) {
        // If the favorite fails, log the error message
        if (err) {
          console.log(err[0].message);
        } else {
          let username = response.user.screen_name;
          let tweet_id = response.id_str;

          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweet_id}`);
        }
      });
    }
  } else {
    console.log(err);
  }
});
