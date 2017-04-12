const express = require('express'),
	  app  	  = express(),
	  http 	  = require('http'),
	  Router  = require('./Router.js');

const PORT = 3000;
app.use('/buscador/', Router);
app.use(express.static('public'))

const Server = http.createServer(app);

Server.listen(PORT, () => console.log('Servidor, iniciado correctamente y escuchando en el puerto: ' + PORT));