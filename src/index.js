const path = require('path');

const express = require('express');
const {geoCode,foreCast} = require('./lib/weather');

const app = express()
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')

// setup static express directory
app.use(express.static(publicDirPath))


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

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})