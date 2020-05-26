const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
let banks = [
	{
		id: 1,
		image: './images/firstbank.png',
		name: 'First Bank',
		founder: 'FB founder',
		locations: ['Ago', "Gbagada"],
		motto: 'Truly the first biko. Ama m nke bu eziokwu!',
		bankTweets: 'https://en.wikipedia.org/wiki/First_Bank_of_Nigeria'
	},
	{
		id: 2,
		image: './images/accessbank.png',
		name: 'Access Bank',
		founder: 'Access founder',
		locations: ['Surulere', "Coker"],
		motto: 'Access to money. Ama m nke bu eziokwu!',
		bankTweets: 'https://en.wikipedia.org/wiki/Access_Bank_plc'
	},
	{
		id: 3,
		image: './images/gtbank.jpeg',
		name: 'GT Bank',
		founder: 'GTB founder',
		locations: ['Ikeja', "Lekki"],
		motto: 'My bank and I, biko. Ama m nke bu eziokwu!',
		bankTweets: 'https://en.wikipedia.org/wiki/Guaranty_Trust_Bank'
	},
	{
		id: 4,
		image: './images/sterlingbank.png',
		name: 'Sterling Bank',
		founder: 'Sterling founder',
		locations: ['Maryland', "Victoria Island"],
		motto: 'One customer bank. Ama m nke bu eziokwu!',
		bankTweets: 'https://en.wikipedia.org/wiki/Sterling_Bank_(Nigeria)'
	}
];

function router(nav) {
	adminRouter.route('/')
		.get((req, res) => {
			const url = 'mongodb://localhost:27017';
			const dbName = 'bankApp';

			(async function mongo() {
				let client;
				try {
					client = await MongoClient.connect(url);
					debug('Connected correctly to server');

					const db = client.db(dbName);

					const response = await db.collection('banks').insertMany(banks);
					res.json(response);
				} catch (err) {
					debug(err.stack);
				}
				client.close();
			}());
			res.send('Inserting banks');
		});
	return adminRouter;
}

module.exports = router;
