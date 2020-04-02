const path=require('path')
const express=require('express')
const hbs= require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()


// Define paths for Express Config
const PublicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(PublicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather Application',
        name: 'Nabil Mahtab'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error:'you must provide location'
        })
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({error})

        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Ypu must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[req.query.search]
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Nabil'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message:'This is the help page',
        result:'Help',
        title:'Help!',
        name:'Nabil'

    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        name:'Nabil',
        message: 'Help article not found',
        title:'error'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        name: 'luffy',
        message: '404 not found',
        title: 'error'
    })
})




app.listen(3000, () => {
    console.log('sever is running')
})