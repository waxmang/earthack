var bodyParser = require('body-parser');
var User = require('./../models/User');
var Entry = require('./../models/Entry');
var Item = require('./../models/Item');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var express=require('express');
var superSecret = config.secret;

//export api to server
module.exports =  function(app,express,passport){
    var apiRouter = express.Router();

    // Get all users
    apiRouter.get('/users', function(req, res) {
        User.find({}, function(err, data) {
            res.json(data);
        });
    });

    return apiRouter;
};
