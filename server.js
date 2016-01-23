/*
 * Skeleton for server.js (Express 4.0)
 * By Wilson Qin
 */

"use strict";

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var errorHandler   = require('errorhandler');
var app            = express();

// mongodb connection with mongoose ORM
var mongoose = require('mongoose');
// TODO: factor these things out into a configuration
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // connection to mongodb successful
  console.log("server successfully connected to mongodb");
});

/* MONGOOSE MODELS */
var userSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String
});

// validate password STUB
userSchema.methods.checkPassword = function(password){
  var hash = password;
  return hash === this.password;
};

var User = mongoose.model('User', userSchema);

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
   // configure stuff here
   console.log('server running in', env, 'mode');
}

// call the public Router for open web
// where we serve up angular and public resources
var publicRouter = express.Router();

  publicRouter.get('/', function(req, res){

  });

  publicRouter.post('/', function(req, res){
    
  });

app.use('/', publicRouter);

/* API Router 
 * The Json goodies to support Angular
 */
var apiRouter = express.Router();
  apiRouter.get('/', function(req,res){

  });
  apiRouter.post('/', function(req,res){

  });

app.use('/api', apiRouter);
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    // parse application/json
app.use(cookieParser);
app.use(methodOverride());                  // simulate DELETE and PUT

// TODO Factor this out in config too
app.listen(8080);   
console.log('Magic happens on port 8080');          // shoutout to the user