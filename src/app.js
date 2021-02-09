const express=require('express')
const path = require('path')
const hbs=require('hbs')
const app=express()
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'));
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-app',
        author:'Nabil Mahtab'
    })
})
app.get('/help',(req,res)=>{
    res.render('index',{
        title:'Help',
        author:'Nabil Mahtab'
    })
})

app.get('/about',(req,res)=>{
    res.render('index',{
        title:'About me',
        author:'Nabil Mahtab'
    })
})



// app.get('/weather',(req,res)=>{
//     if(req.query.address)
//     geocode(req.query.address,(error,data)=>{
//         if(error)
//         return console.log('error')
//         else
//         forecast(data.latitude,data.longitude,(error,forecastdata)=>{
//             if(error)
//             return console.log("error")
//             else
//             res.send({
//                 location:req.query.address,
//                 data:forecastdata
//             })
//         })
//     })
//     else
//     res.send({
//         error:'Enter address'
//     })
     

// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log('forecastdata',forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'help',
        message:"help article not found",
        author:'Nabil'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:"page",
        message:"Page not found",
        author:'Nabil'
    })
})


app.listen(3000,()=>{
    console.log('server is running')
})