var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var express=require('express');
var superSecret = config.secret;

//export api to server
module.exports =  function(app,express,passport){
    var apiRouter = express.Router();

    apiRouter.get('/test', function(req, res) {
        res.json('fuck  youbitch');
    });

    return apiRouter;
};