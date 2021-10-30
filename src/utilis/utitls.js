const request = require('postman-request')
//const chalk = require('chalk')

const geocode = (adress,callback)=>{
    const geocodeURl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoicGluZGVyc2luZ2giLCJhIjoiY2t1NWljNzQyNTBpaDJvbXAyMWpzeDNtMiJ9.FxjVSsTslqoE72fRb4lCRA&limit=1'
    
    request({url:geocodeURl,json:true},(error,{body}={})=>{
        
        if(error){
            callback('unable to connect to location services!',undefined)
        }else if (body.features.length===0){
            callback('unable to find the location',undefined)
        }else{
            callback(undefined,
            {location: body.features[0].place_name})
        }
             

        
    })
}
const forecast = (adress,callback)=>{
    const forecastURL = 'http://api.weatherstack.com/current?access_key=c6ecb8dc2f107c7ae508dd663a084837&query='+adress
    request({url:forecastURL,json:true},(error,{body}={})=>{
        if (error){
             callback('unable to connect to weather services!',undefined)
         }else if(body.error){
             callback('not able to find the location',undefined)
         }else{callback(undefined,body.current.weather_descriptions + '\ncurrently there is '+body.current.temperature+' degree celcius out, but it feels like '+body.current.feelslike+' degree celcius' +'\nthe humidity is '+body.current.humidity+'%.')}
         
     })
        

}

module.exports={
    geocode,
    forecast
}