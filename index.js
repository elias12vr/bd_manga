const express = require('express')
const app = express();
require('./config/db')

app.use(express.static(__dirname + '/public/'))
app.listen('3000', function(){
    console.log('Servidor funcionando en el puerto 3000')
});
