let fs = require('fs');
	module.exports = {
		getCiudades : function(callback){
			fs.readFile(__dirname + "/data.json", 'utf8', function(error, data){
				if(error){
					callback(error);
				}else{
					var datos = JSON.parse(data);
					var ciudades = [];
					(datos || []).map(element => {
						if(ciudades.indexOf(element.Ciudad) < 0){
							ciudades.push(element.Ciudad);
						}
					});
					callback(null, ciudades);
				}
			});
		},
		getTipo : function(callback){
			fs.readFile(__dirname + "/data.json", 'utf8', function(error, data){
				if(error){
					callback(error);
				}else{
					var datos = JSON.parse(data);
					var tipos = [];
					(datos || []).map(element => {
						if(tipos.indexOf((element.Tipo || "")) < 0){
							tipos.push((element.Tipo || ""));
						}
					});
					callback(null, tipos);
				}
			});
		},

		buscador : function(filtro, callback){
			fs.readFile(__dirname + "/data.json", 'utf8', function(error, data){
				if(error){
					callback(error);
				}else{
					data = JSON.parse(data);
					var resultado = [];
					if(typeof filtro.rango != "undefined" && Object.keys(filtro.rango).length > 0){
						let from = Number(filtro.rango.from || 0);
						let to = Number(filtro.rango.to || 0);
						let filtroRango = function(element){
							return element.Precio >= from && element.Precio <= to;
						}
						for(var i = 0; i < data.length; i++){
							data[i].AuxPrecio = data[i].Precio;
							data[i].Precio = Number(String(data[i].Precio).replace(/\$/gi, "").replace(/\,/gi, ""));
						}
						data = data.filter(filtroRango);
					}

					if(typeof filtro.Ciudad != "undefined" && String(filtro.Ciudad).trim().length > 0){
						let filtroCiudad = function(element){
							return element.Ciudad == filtro.Ciudad;
						}
						data = data.filter(filtroCiudad);
					}

					if(typeof filtro.Tipo != "undefined" && String(filtro.Tipo).trim().length > 0){
						let filtroTipo = function(element){
							return element.Tipo == filtro.Tipo;
						}
						data = data.filter(filtroTipo);
					}
					callback(null, data);
				}
			})
		}
	};