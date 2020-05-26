const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
			// Create user in db
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'bankApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server. I am from authRoute');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
      debug(req.body);
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
			successRedirect: '/auth/profile',
			failureRedirect: '/',
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        // next();
        res.render('profile', {
          nav,
          title: `Welcome ${req.user.username}.`
        });        
      } else {
        // debug("I'm not the user: "+ req.user);
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user)
		});		

  authRouter.route('/logout')
    .get((req, res) => {
      res.render('home', {
        nav,
        title: 'Sign In'
      });
    });

  return authRouter;
}


module.exports = router;
