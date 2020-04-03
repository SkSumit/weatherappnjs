const request = require('request')


const forecast= (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/085abccfe29724fcf4834c5d3ad7565a/' +longitude+','+latitude+'?units=si'
    request({url:url,json:true},(error,{body}) => {
        if (error) {
            callback("ERROR",undefined)
        } else if(body.error){
             callback("Unable to find location",undefined)
          }else {
                 callback(undefined,{
                    temperature: body.currently.temperature,
                    summary:body.hourly.summary 
                    
                 })   
             }
    })
}

module.exports = forecast
 