var EarthquakeEmitter = require('earthquake-emitter')
var quakes = new EarthquakeEmitter()

quakes.on('earthquake', data => {
  console.log('Earthquake!', data.properties.title)
})
