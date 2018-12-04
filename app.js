const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      project = require('./models/projectModel'),
      db = mongoose.connect('mongodb://localhost/projects', {useNewUrlParser: true})


const app = express()

app.options("/api", function(req, res, next){
//    res.header('Access-Control-Allow-Origin', 'http://www.jgdeveloper.nl');
    res.header('Allow', 'GET,POST,OPTIONS');
//    res.header('Access-Control-Request-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.set('Accept', 'application/json')
    res.set('Content-Type', 'application/json')
    res.sendStatus(200);
  });
app.options("/api/:itemId", function(req,res,next){
//      res.header('Access-Control-Allow-Origin', 'http://jgdeveloper.nl')
        res.header('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS')
//      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS')
        res.set({'Content-Type': 'applicationo/x-www-form-urlencoded'})
        res.set({'Accept': 'application/json'})
        res.sendStatus(200)
        })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let projectRouter = require('./Routes/projectRoutes')(project)
app.use(function(req,res,next){
        if(req.accepts('json')){
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With')
                next()
                return
        }
        res.sendStatus(404);
})
app.use('/api', projectRouter)

app.get('/', function(req, res){
    res.send('welcome to my api!');
});

app.listen(8000, function(){
    console.log('hello World!');
});












