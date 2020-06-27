const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


  const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

const app = express();
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

 app.use(express.static(publicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'satyendra singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'satyendra singh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'visit to help',
        name:'Satyendra singh',
        headerName:'Current Weather forecast Info'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide an address'
        })
    }
    
        geocode(req.query.address,(error,{lon,lat,location}={})=>{
            if (error)
            {
              return res.send({error})
            }
        
        forecast(lon,lat,(error,forecastData)=>{
            if (error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
               address:req.query.address,
            })
              
            })
        
        })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    })
})

  app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorM:'help article is not found',
        title:'Error',
        name:'satyendra singh'
    })
 })

 app.get('*',(req,res)=>{
    res.render('404',{
        errorM:'error 404',
        title:'Error',
        name:'satyendra singh'
    })
 })

 
//  app.get('/help',(req,res)=>{
//     res.send({
//         name:'satyendra singh',
//         age:21
//     })
//  })
 




app.listen(3000,()=>{
    console.log('server is up running on port 3000')
})
