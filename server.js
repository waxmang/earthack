//Import package into JS
var express = require('express');
var app =express();
var bodyParser=require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var passport=require('passport');
var session=require('express-session');
var flash = require('connect-flash');

//App configuration
//get: request information
//post: submit information
//put: update info
//delete
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configure app for CORS request
app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
    next();
});

//log all requests to console/terminal
app.use(morgan('dev'));

//connect to our database
//mongoose.connect(config.database);

//set static files location; where to look for angular files (index.html)
//used for requests that our front end will make
app.use(express.static(__dirname+'/public'));
app.set('views',path.join(__dirname,'/public/app/views'));

//required for passport
//app.use(session({secret:'ilovescotchscotchyscotchscotch'}));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(flash());

//require('./passport')(passport);

//routes are api
var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api',apiRoutes);
//require('./app/routes/passportRoutes')(app,passport);

//main catchall route
//send users to frontend
//has to be reigstered after api routes
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

//start the server
var port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log("App.is running on port " +port);
});