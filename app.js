const express = require('express');
const debug = require('debug')('app');
const path = require("path");
const chalk = require('chalk');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});
app.get('/user', (req, res) => {
	res.render('user', { title: 'Profile', userProfile: { nickname: "Mansion" } });
});

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/css/styles.css')));
app.use('/images', express.static(path.join(__dirname, '/images/food.jpg')));
app.use('/images', express.static(path.join(__dirname, '/images/faveicon.ico')));

app.set('views', path.join(__dirname, "/src/views"));
app.set('view engine', 'pug');

app.listen(port, () => console.log(`Banks listening at port: ${chalk.yellow(port)}`));