var j5 = require('johnny-five')
var async = require('async')
var EarthquakeEmitter = require('earthquake-emitter')

var pattern = ['red','white','yellow','white', 'red']
var freq = 200

j5.Board().on('ready', function () {
  var led = new j5.Led.RGB({pins:[ 9, 10, 11 ], isAnode: true})
  led.off()

  var queue = async.queue((data, done) => {
    console.log('quake', data.properties.mag, data.properties.place)
    led.on()
    pattern.map((c, i) => {
      this.wait(i * freq, () => {
        led.color(c)
      })
    })
    this.wait(freq * pattern.length, () => led.off() )
    this.wait((freq * pattern.length) + (3000 * Math.random()), () => {
      done()
    } )
  }, 1)

  this.repl.inject({
    l: led
  })

  var quakes = new EarthquakeEmitter()
  quakes.on('earthquake', data => queue.push(data))
})
