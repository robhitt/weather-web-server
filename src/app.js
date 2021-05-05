const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rob Hitt'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rob Hitt'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Welcome to the help page.  We\'re here to help',
    title: 'Help',
    name: 'Rob Hitt'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecast) => {
      if (error) return res.send({ error });

      res.send({
        location,
        forecast,
        address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });

  }

  console.log(req.query.search)

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help 404',
    errorMessage: 'help article not found',
    name: 'Rob Hitt'
  });
});

app.get('*', (req, res) => {
  console.log('hi');
  res.render('404', {
    title: '404',
    errorMessage: '404 File Not Found',
    name: 'Rob Hitt'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});