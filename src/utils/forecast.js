const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=68ded0b1d0a297929533df22d7976b3a&query=${latitude},${longitude}&units=f`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current)
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const windDir = body.current.wind_dir
            const windMph = body.current.wind_speed
            callback(undefined, `${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out. Wind is coming from the ${windDir} at ${windMph} mph.`)
        }
    })
}

module.exports = forecast