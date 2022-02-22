const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=fa52c2637a91a3bc07132404f745ec52&query='+latitude+','+longitude+'&units=m'
    request({url , json: true},(error,{body}) => {
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }else if(body.error){
            callback("Unable to find location!",undefined)
        }else{
            callback(undefined,{
                forecast: body.current.weather_descriptions[0] + ". It is currently "  + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees.',
                timezone: "Current date and time of the is " + body.location.localtime
            })
        }
    })
}

module.exports = forecast