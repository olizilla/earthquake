var QuakeEmitter = require('./quake')
var quakes = new QuakeEmitter()

quakes.on('quake', data => {
  console.log('Quake!', data.properties.mag, data.properties.place)
})
