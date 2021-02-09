const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFiaWwtMjMiLCJhIjoiY2toYWVxM2NiMDA4YTJycDFiNnhlNGI2byJ9.2txRJF6anjPfrXkCQMPRCA&limit=1"
    request({url:url,json:true},(error,response)=>{
        if(error)
        callback('unable to connect to location service',undefined)
        else if(response.body.message)
        callback('unable to find location,try another search',undefined)
        else
        {
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name

            })
        }
    })
}
module.exports=geocode