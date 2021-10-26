const express = require('express');
const { dirname } = require('path');
const path = require('path');
const hbs = require('hbs');
const utilis = require('./utilis/utitls');
const {geocode,forecast} = utilis

const publicDirPath = path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')

const app = express()

app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'pinder singh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'pinder singh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'pinder singh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error: 'please provide an address'})
    } 
     geocode(req.query.address,(error,{location}={})=>{
         if(error){return res.send({error})}
         forecast(req.query.address,(error,forecastData)=>{
             if(error){return res.send(error)}
             res.send({
                 location:location,
                 forecastData:forecastData
             })
         })
     })


   
   
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:"help article not found",
        name:'pinder singh'
        
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:"page not found",
        name:'pinder singh'
        
    })
})


app.listen(3000,()=>{
    console.log('server is up at port 3000')
})