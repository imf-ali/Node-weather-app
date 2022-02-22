const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define static folder path and views path
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        author: 'Fahad Ali, SDE'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{    
        title: 'About me',
        author: 'Fahad Ali, SDE'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        author: "Fahad Ali, SDE"
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,body) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                place : place,
                forecast : body.forecast,
                time: body.timezone
            })
        })
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: "Help",
        msg:'Help article not found',
        author: 'Fahad Ali, SDE'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title : '404',
        msg:'Page not found',
        author: 'Fahad Ali,SDE'
    })
})

app.listen(port, ()=>{
    console.log("Server running on port 3000....")
})