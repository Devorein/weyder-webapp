const convertObjToQS = function(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}

const MapBoxObject = {
    "domain":`https://api.mapbox.com/geocoding/v5`,
    'endPoint': `mapbox.places`,
    'urlComponent':{
        place: ''
    },
    'queryStringObj':{
        access_token: process.env.MAPBOX_ACCESS_TOKEN,
        limit: 1,
    },
    'buildURL':function(){
        return `${this.domain}/${this.endPoint}/${this.urlComponent.place}.json?${convertObjToQS(this.queryStringObj)}`
    }
}

const DarkSkyObject = {
    'domain': `https://api.darksky.net`,
    'endPoint': `forecast`,
    'urlComponent':{
        accessToken: process.env.DARKSKY_ACCESS_TOKEN,
        lat: 0,
        long: 0,
    },
    'queryStringObj':{
        'exclude': ['minutely','hourly','alerts'],
        'units': 'si'
    },
    'buildURL':function(){
        return `${this.domain}/${this.endPoint}/${this.urlComponent.accessToken}/${this.urlComponent.lat},${this.urlComponent.long}?${convertObjToQS(this.queryStringObj)}`
    }
}

const LocationIqObject = {
    'domain': `https://us1.locationiq.com`,
    'endPoint': `v1/search.php`,
    'queryStringObj':{
        key: process.env.LOCATIONIQ_ACCESS_TOKEN,
        q: '',
        format: `json`
    },
    'buildURL':function(){
        return `${this.domain}/${this.endPoint}?${convertObjToQS(this.queryStringObj)}`
    }
}
module.exports = {
    DarkSkyObject,
    MapBoxObject,
    LocationIqObject
}