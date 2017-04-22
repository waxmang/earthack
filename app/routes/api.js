var bodyParser = require('body-parser');
var rUser = require('./../models/rUser');
var npUser = require('./../models/npUser');
var Entry = require('./../models/Entry'); 
var Item = require('./../models/Item');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var express=require('express');
var superSecret = config.secret; 

//export api to server
module.exports =  function(app,express,passport){
    var apiRouter = express.Router();

    apiRouter.get('/restaurantUsers', function(req, res) {
        res.json('fuck  youbitch');
    });

    return apiRouter;
};