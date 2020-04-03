const request = require('request')


const geoLoc= (address,callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiemVuZWtzMjQiLCJhIjoiY2s4ZnlrMjZhMDloMDNtbnpvMzBkbjJpaCJ9.CPgnan1SiJ_sQS7fyzgGBw'
    request({url,json:true},(error,{body}) => {
        if (error) {
            callback("ERROR",undefined)
        } else if(body.features.length == 0){
             callback("Unable to find location",undefined)
          }else {
                 callback(undefined,{
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                 })   
             }
    })
}

module.exports = geoLoc
 