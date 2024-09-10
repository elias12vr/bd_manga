const express = require('express');
const app = express();
require('./config/db');
const mangaController = require('./controllers/mangaController');

app.use('/', mangaController);
//
//app.use(express.static(__dirname + '/public/'))
app.listen('3000',function(){
    console.log(' 3000')
});


