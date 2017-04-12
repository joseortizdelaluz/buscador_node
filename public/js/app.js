//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch();


$(document).ready(function(){
  document.getElementById("contenedor_filtros_busqueda").style.position = 'fixed';
  document.getElementById("contenedor_filtros_busqueda").style.width = '400px';
  //Cargamos las ciudades
  $.ajax({
    url : "/buscador/getciudades",
    success : function(data){
      (data || []).map(ciudad => {
        $("#ciudad").append("<option value='"+ciudad+"'>"+ciudad+"</option>");
      });
      $('select').material_select();
    },
    error : function(error){
      console.log('Ha ocurrido un error al cargar las ciudades.');
    }
  });

  //Cargamos los tipos
  $.ajax({
    url : "/buscador/gettipos",
    success : function(data){
      (data || []).map(tipo => {
        $("#tipo").append("<option value='"+tipo+"'>"+tipo+"</option>");
      });
      $('select').material_select();
    },
    error : function(error){
      console.log('Ha ocurrido un error');
    }
  });


  $("#buscar").off().unbind().on('click', function(event){

    var filtro  = {};
    if(document.getElementById("checkPersonalizada").checked === true){
      var tipo = $("#tipo option:selected").val() || undefined;
      var ciudad = $("#ciudad option:selected").val() || undefined;
      var rango = $("#rangoPrecio").data("ionRangeSlider");

      if(tipo != undefined){
        filtro.Tipo = tipo;
      }
      if(ciudad != undefined){
        filtro.Ciudad = ciudad;
      }
      if(rango.result && rango.result.from && rango.result.to){
        filtro.rango = {
          from : rango.result.from,
          to : rango.result.to
        };
      }
    }
    $.ajax({
      url : "/buscador/buscar",
      data : filtro,
      dataType : "json",
      success : function(data){
        var html = '';
        for(var i = 0; i < data.length; i++){
          html += `<div class="card horizontal">
          <div class="card-image">
            <img src="img/home.jpg">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <div>
                <b>Direccion: </b>${data[i].Direccion}<p></p>
              </div>
              <div>
                <b>Ciudad: </b><p>${data[i].Ciudad}</p>
              </div>
              <div>
                <b>Telefono: </b><p>${data[i].Telefono}</p>
              </div>
              <div>
                <b>Código postal: </b><p>${data[i].Codigo_Postal}</p>
              </div>
              <div>
                <b>Precio: </b><p>${data[i].AuxPrecio}</p>
              </div>
              <div>
                <b>Tipo: </b><p>${data[i].Tipo}</p>
              </div>
            </div>
            <div class="card-action right-align">
              <a href="#">Ver más</a>
            </div>
          </div>
        </div>`;
        }
        $("#contenedor_busqueda").html(html);
      },
      error : function(error){

      }
    });
  }); 
});