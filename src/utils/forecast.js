const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=f3449cd1c067a167a82c9ffe84126ef4&query="+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)
    console.log(url);
    request({url:url,json:true},(error,response)=>{
        if(error)
        callback('cannot connect to service',undefined)
        else if(response.body.error)
        callback('invalid location',undefined)
        else
        {
            callback(undefined,{
                description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}
module.exports=forecast