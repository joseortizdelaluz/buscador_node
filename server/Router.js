let express = require('express'),
	Router  = express.Router(),
	Lector  = require('./data/Lector.js');

	Router.get('/', (request, response) => {
		response.send({a : "Saludo, Hola como estas?"});
	});

	Router.get('/buscar', (request, response) => {
		var filtro = request.query;
		Lector.buscador(filtro, function(error, data){
			if(error){
				response.send([]);
			}else{
				response.send(data);
			}
		});
	});

	Router.get('/getciudades', (request, response) =>{
		Lector.getCiudades(function(error, ciudades){
			if(error){
				response.send([]);
			}else{
				response.send(ciudades);
			}
		});
	});

	Router.get('/gettipos', function(request, response){
		Lector.getTipo(function(error, tipos){
			if(error){
				response.send([]);
			}else{
				response.send(tipos);
			}
		});
	});

	module.exports = Router;