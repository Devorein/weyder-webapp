const path = require('path');

const express = require('express');
const hbs = require('hbs')

const {geoCode,foreCast} = require('./lib/weather');

const app = express()
const port = 3000

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static express directory
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        pageName: 'Home',
        creator: 'Devorein',
        showPageName: true
    })    
})

app.get('/home',(req,res)=>{
    res.render('index',{
        pageName: 'Home',
        creator: 'Devorein',
        showPageName: true
    })    
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    geoCode(req.query.address,function(err,data){
        if(err){
            return res.send({
                error: err
            })
        }
        foreCast(data,(info)=>{
            res.send(info)
        })
    })
}) 

app.get('/help',(req,res)=>{
    res.render('help',{
        pageName: 'help',
        creator: 'Devorein',
        showPageName: true
    })    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        pageName: 'about',
        creator: 'Devorein',
        showPageName: true
    })    
})

app.get('/weather/*',(req,res)=>{
    res.render('error',{
        redirectPage:'weather',
        showPageName: false
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        redirectPage:'help',
        showPageName: false
    })
})

app.get('/about/*',(req,res)=>{
    res.render('error',{
        redirectPage:'about',
        showPageName: false
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        redirectPage:'home',
        showPageName: false
    })
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})