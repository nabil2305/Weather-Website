const request=require('request')
const forecast = (latitude,longitude,callback) => {
const url='https://api.darksky.net/forecast/f0fb87151277bd9ce67899fa226ae790/' + encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
request({url:url,json:true},(error,response)=> {
    if(error)
        callback('unable to connect',undefined)
    else if(response.body.code>0)
        callback('enter correct coordinates')
        else
        callback(undefined,{
            city:response.body.timezone,
            temperature:response.body.currently.temperature,
            summary: response.body.daily.summary
        })
}) 

}
module.exports=forecast