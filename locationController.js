const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:locationController');
import select from '../views/locations.pug';

const selectedLocation = 'Surulere';
console.log("I'm ",select);

function locationController(nav) {
  function getByLocationName(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'bankApp';
    let optionSelect = [ {name: "--Select--"}, {name: "Ago"}, {name: "Surulere"}, {name: "Ikeja"}, {name: "Lekki"} ];
    
    // document.addEventListener("DOMContentLoaded", function(e) {
    //   const select = document.getElementById('SelectLocation');
    //   console.log(select);
    // });

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server!');

        const db = client.db(dbName);
        const col = await db.collection('banks');
        const locations = await col.find({ locations: selectedLocation }, { projection: { _id: 0, name: 1 } }).toArray();
  
        res.render(
          'locations',
          {
            nav,
            optionSelect: optionSelect,
            title: `The list of banks in ${selectedLocation} are: `,
            locations
          },
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }())
  };

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
    getByLocationName,
    getById,
    middleware
  };
}

module.exports = locationController;

