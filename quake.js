'use strict'

var EventEmitter = require('events')
var request = require('request')
var quakeUrl = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson'
var freq = 10000
var data = {}

class QuakeEmitter extends EventEmitter {

  constructor () {
    super()
    this.interval = setInterval(() => { this.fetch() }, freq)
    setImmediate(() => { this.fetch() })
  }

  fetch () {
    request.get({url: quakeUrl, json: true}, (err, res, body) => {
      if (!body.features) return this.emit('error', 'No features found on response', body)
      body.features.reduce((data, item) => {
        if (data[item.id]) return data
        data[item.id] = item
        this.emit('quake', item)
        return data
      }, data)
    })
  }

}

module.exports = QuakeEmitter
