const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'banks' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/css/styles.css')));
app.use('/js', express.static(path.join(__dirname, '/js/main.js')));
app.use('/images', express.static(path.join(__dirname, '/images/food.jpg')));
app.use('/images', express.static(path.join(__dirname, '/images/favicon.ico')));

app.set('views', path.join(__dirname, "./src/views/"));
app.set('view engine', 'pug');

let optionSelect = [ {name: "--Select--"}, {name: "Ago"}, {name: "Surulere"}, {name: "Ikeja"}, {name: "Lekki"} ];

const nav = [
  { link: '/home', name: 'HOME', title: 'Banks' },
  { link: '/banks', name: 'BANKS', title: 'Banks' },
  { link: '/locations', name: 'LOCATIONS', title: 'Locations' },
  { link: '/logout', name: 'LOGOUT', title: 'Logout' }
];

const authRouter = require('./src/routes/authRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const bankRouter = require('./src/routes/bankRoutes')(nav);
const homeRouter = require('./src/routes/homeRoutes')(nav);
const locationRouter = require('./src/routes/locationRoutes')(nav, optionSelect);
const logoutRouter = require('./src/routes/logoutRoutes')(nav);

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/home', homeRouter);
app.use('/banks', bankRouter);
app.use('/locations', locationRouter);
app.use('/logout', logoutRouter);

app.get('/', (req, res) => {
  let optionSelect = [ {name: "--Select--"}, {name: "Ago"}, {name: "Surulere"}, {name: "Ikeja"}, {name: "Lekki"} ];

	res.render('signup', { 
    nav: [
      { link: '/home', name: 'HOME', title: 'List of Banks' },
      { link: '/banks', name: 'BANKS', title: 'Banks' },
      { link: '/locations', name: 'LOCATIONS', title: 'Locations' },
      { link: '/logout', name: 'LOGOUT', title: 'Logout' } ],
    optionSelect: optionSelect,
    title: 'Banks' });
});

app.listen(port, () => debug(`Banks listening at port: ${chalk.yellow(port)}`));
