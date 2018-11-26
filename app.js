const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      project = require('./models/projectModel'),
      db = mongoose.connect('mongodb://localhost/projects', {useNewUrlParser: true})


const app = express()

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let projectRouter = require('./Routes/projectRoutes')(project)

app.use('/api', projectRouter)

app.get('/', function(req, res){
    res.send('welcome to my api!');
});

app.listen(3000, function(){
    console.log('hello World!');
});