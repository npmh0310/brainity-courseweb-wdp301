
var express = require('express');
const oauth2Route = express.Router();
const { googleAuthenticate, googleAuthenticateCallback} = require('../../controllers/oauth2Controller');


oauth2Route.get('/google', googleAuthenticate)

oauth2Route.get('/google/callback', googleAuthenticateCallback);

module.exports = oauth2Route;
