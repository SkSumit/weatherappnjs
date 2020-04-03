const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geoLoc = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app= express()
const port = process.env.PORT || 3000

const publicFolder = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicFolder))

app.get('/weather',(req,res)=>{
     if(!req.query.search){
         return res.send({
             error:"ERROR"
         })
    }
    res.locals= req.query.search;
    
    geoLoc(req.query.search,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:"Cannot Find Given Address"
            })
        }
    forecast(latitude, longitude, (error, dataForecast) => {
            if(error){
                return res.send({
                    error:"Cannot Find Given Address"
                })
            }
            res.send({
                Location :location,
                Forecast : dataForecast
               
             }) 
           
            })
    })
   
})

app.get('',(req,res)=>{
    res.render('index',{
        //title:locationNameForIndex,
        name:"Sumit Kolpekwar hehe"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"PAGE NOT FOUND!",
        name:"Sumit Kolpekwar hehe"
    })
    
})



app.listen(port,()=>{
    console.log('Running Server at' + port)
})
