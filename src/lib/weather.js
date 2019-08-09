const request = require('request');

const {DarkSkyObject,LocationIqObject} = require('./builder.js')

const geoCode = (address) => {
    return new Promise((resolve,reject)=>{
        LocationIqObject.queryStringObj.q = address
        request({'url':LocationIqObject.buildURL()},(err,response)=>{
            let data = JSON.parse(response.body)
            if(err){
                reject(err)
            }else if(data.error){
                reject(`Sorry couldn't find anything of name ${address}`)
            }else{
                let {lat:latitude,lon:longitude,display_name:place_name} = data[0]
                const geoCodeInfo = {
                    longitude,
                    latitude,
                    place_name
                }
                resolve(geoCodeInfo)
            }
        })
    })
}

const foreCast = ({latitude,longitude,place_name:place})=>{
    DarkSkyObject.urlComponent.lat = latitude
    DarkSkyObject.urlComponent.long = longitude
    return new Promise((resolve,reject)=>{
        request({'url':DarkSkyObject.buildURL(), 'json': true},(err, {body:res_body})=>{
            if(err){
                reject(`Error Found!\n${err}`);
            }else if(res_body.error){
                reject(`Server responded with ${res_body.code} ${res_body.error}`);
            }else{
                let {summary,temperature,precipProbability:rainChance} = res_body.currently
                let forecastInfo = {
                    summary,
                    place,
                    temperature:temperature+'°C',
                    rainChance: (rainChance*100).toFixed(2)+'%'
                }
                resolve(forecastInfo)
            }
        })
    })
}

module.exports = {
    geoCode,
    foreCast
};