const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:homeController');

function homeController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'bankApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = await db.collection('banks');
        const banks = await col.find().toArray();

        res.render(
          'home',
          {
            nav,
            title: 'Banks',
            banks
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
 
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'bankApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = await db.collection('banks');

        const bank = await col.findOne({ _id: new ObjectID(id) });
        debug(bank);

        // bank.details = await bankService.getBankById(bank.bankId);
        res.render(
          'bankView',
          {
            nav,
            title: 'Banks',
            bank
          },
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,    
    middleware
  };
}

module.exports = homeController;

