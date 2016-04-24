var EarthquakeEmitter = require('earthquake-emitter')
var j5 = require('johnny-five')
var async = require('async')
var fmap = j5.Fn.fmap

j5.Board().on('ready', function () {
  var board = this

  var motorA = new j5.Motor({
    pins: {
      pwm: 5,
      dir: 7,
      cdir: 8,
      current: "A2"
    }
  })

  motorA.stop()

  function rumble (magnitude, done) {
    done = done || function () {}
    // map magnitude to motor speed.
    var speed = Math.floor(fmap(magnitude, 0, 10, 100, 255))
    console.log('rumble', magnitude, speed)
    motorA.reverse(speed)
    board.wait(3000, () => {
      console.log('rumble ends')
      motorA.stop()
    })
    board.wait(4000, () => {
      done()
    })
  }

  var queue = async.queue((data, done) => {
    console.log('\n' + data.properties.title)
    rumble(data.properties.mag, done)
  }, 1)

  // quake = new EarthquakeEmitter()
  // quake.on('earthquake', data => queue.push(data))

  this.repl.inject({
    motor: motorA,
    rumble: rumble
  })
})

