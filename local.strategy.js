const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'bankApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);

          debug('Connected correctly to server...from local strategy');

          const db = client.db(dbName);
          const col = db.collection('users');

          // Find the user associated with the login details
          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    }
  ));
};
