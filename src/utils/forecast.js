const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=263b3f7d4fe0e371e4f96ff3aa0dd5eb&query=${latitude},${longitude}&units=f`;
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const {temperature, feelslike, weather_descriptions} = body.current;
      const currentWeather = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      callback(undefined, currentWeather);
    }
  });
};

module.exports = {
  forecast
};

