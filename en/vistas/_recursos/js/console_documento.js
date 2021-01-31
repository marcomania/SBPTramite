function listar_documento_vista(valor,pagina){
	var pagina = Number(pagina);
	$.ajax({
		url:'../controlador/documento/controlador_ListarBuscar_documento.php',
		type: 'POST',
		data:'valor='+valor+'&pagina='+pagina+'&boton=buscar',
		beforeSend: function(){
			$("#loading_almacen").addClass("fa fa-refresh fa-spin fa-3x fa-fw");
		},
	    complete: function(){
	      $("#loading_almacen").removeClass("fa fa-refresh fa-spin fa-3x fa-fw");
	    },
		success: function(resp){
			var datos = resp.split("*"); 
			var valores = eval(datos[0]); 
			if(valores.length>0){
				var cadena = "";
				cadena += "<table border='0' class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center;width: 80px;word-wrap: break-word;'>ID</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>SUBJETC</th>";
				cadena += "<th style = 'text-align: center;width: 150px;word-wrap: break-word;'>RECEPTION DATE</th>";
				cadena += "<th style = 'text-align: center;width: 150px;word-wrap: break-word;'>ASSIGNED AREA</th>"
				cadena += "<th style = 'text-align: center;width: 120px;word-wrap: break-word;''>DOCUMENT TYPE</th>";
				cadena += "<th style = 'text-align: center;width: 30px;word-wrap: break-word;'>SENDER</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>ARCHIVE</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>STATE</th>";
				cadena += "<th style = 'text-align: center;width: 10px;word-wrap: break-word;''>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				for(var i = 0 ; i<valores.length; i++){
					cadena += "<tr>";			
					cadena += "<td  style = 'width: 80px;word-wrap: break-word;color:#9B0000; text-align:center;font-weight: bold;'>"+valores[i][0]+"</td>";
					cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'><button name='"+valores[i][0]+"*"+valores[i][1]+"' class='btn btn-info' title='Vista previa del asunto' style='background-color: #ffffff ; border-color: #ffffff' onclick='AbrirModalAsuntoDocumento(this)'><span class='fa fa-eye' style='color: #000000'></span>";
					cadena += "&nbsp;</button> </td>";
					cadena += "<td style = 'text-align: center;width: 150px;word-wrap: break-word;'>"+valores[i][2]+"</td>";
					cadena += "<td style = 'text-align: center;width: 150px;word-wrap: break-word;'>"+valores[i][4]+"</td>";
					cadena += "<td style = 'text-align: center;width: 120px;word-wrap: break-word;'>"+valores[i][3]+"</td>";
					cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'><button name='"+valores[i][0]+"*"+valores[i][1]+"*"+valores[i][6]+"' class='btn btn-info' title='Vista previa de los Datos del remitente' style='background-color: #ffffff ; border-color: #ffffff' onclick='AbrirModalVerRemitente(this)'><span class='fa fa-eye' style='color: #000000'></span>";
					cadena += "&nbsp;</button> </td>";
					cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'><button name='"+valores[i][9]+"' class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#fff' title='Ver documento Cargado' onclick='AbrirModalArchivo_documento(this)'><i class='fa  fa-folder-open' style='color:orange;'></i></button></td>";
					if (valores[i][5]=="INACTIVO") {
						cadena += "<tdstyle = 'text-align: center;width: 20px;word-wrap: break-word;'> <span class='badge bg-danger' style='color:White;'>"+valores[i][5]+"</span> </td>";
					}else if (valores[i][5]=="PENDIENTE") {
						cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'> <span class='badge bg-warning' style='color:White;'>"+valores[i][5]+"</span> </td>";
					}else
					{
						cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'> <span class='badge bg-success' style='color:White;'>"+valores[i][5]+"</span> </td>";
					}
					cadena += "<td style = 'text-align: center;width: 10px;word-wrap: break-word;'><button name='"+valores[i][0]+"*"+valores[i][1]+"*"+valores[i][2]+"*"+valores[i][3]+"' class='btn btn-primary' onclick='AbrirModalDocumento(this)'><span class='glyphicon glyphicon-pencil'></span>";
					cadena += "</button></td> ";
					cadena += "</tr>";
				}
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_documento_tabla").html(cadena);
				var totaldatos = datos[1];
				var numero_paginas = Math.ceil(totaldatos/5); 
				var paginar = "<ul class='pagination'>";
				if(pagina>1){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_documento_vista("+'"'+valor+'","'+1+'"'+")'>&laquo;</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_documento_vista("+'"'+valor+'","'+(pagina-1)+'"'+")'>Previous</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&laquo;</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Previous</a></li>";
				}
				limite = 10;
				div = Math.ceil(limite/2);
				pagina_inicio = (pagina > div) ? (pagina - div):1;
				if(numero_paginas > div){
					pagina_restante = numero_paginas - pagina;
					pagina_fin = (pagina_restante > div) ? (pagina + div) : numero_paginas;
				}
				else{
					pagina_fin = numero_paginas;
				}
				for(i = pagina_inicio;i<=pagina_fin;i++){
					if(i==pagina){
						paginar +="<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>";
					}
					else{
						paginar += "<li><a href='javascript:void(0)' onclick='listar_documento_vista("+'"'+valor+'","'+i+'"'+")'>"+i+"</a></li>";
					}
				}
				if(pagina < numero_paginas){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_documento_vista("+'"'+valor+'","'+(pagina+1)+'"'+")'>Next</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_documento_vista("+'"'+valor+'","'+numero_paginas+'"'+")'>&raquo;</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Next</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&raquo;</a></li>";
				}
				paginar += "</ul>";
				$("#paginador_documento_tabla").html(paginar);
			}else{
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center;width: 80px;word-wrap: break-word;'>ID</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>SUBJETC</th>";
				cadena += "<th style = 'text-align: center;width: 150px;word-wrap: break-word;'>RECEPTION DATE</th>";
				cadena += "<th style = 'text-align: center;width: 150px;word-wrap: break-word;'>ASSIGNED AREA</th>"
				cadena += "<th style = 'text-align: center;width: 120px;word-wrap: break-word;''>DOCUMENT TYPE</th>";
				cadena += "<th style = 'text-align: center;width: 30px;word-wrap: break-word;'>SENDER</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>ARCHIVE</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>STATE</th>";
				cadena += "<th style = 'text-align: center;width: 10px;word-wrap: break-word;''>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				cadena +="<tr style = 'text-align: center'><td colspan='8'><strong>No records found</strong></td></tr>";
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_documento_tabla").html(cadena);
				$("#paginador_documento_tabla").html("");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown, jqXHR){
			alert("THERE WAS AN ERROR");
		}
	});
}
function AbrirModalArchivo_documento(control){

	$('#modal_archivo_documento').modal({backdrop: 'static', keyboard: false})
	$("#modal_archivo_documento").modal('show');
	var datos = control.name;
	var datos_split = datos.split("*");
		if (datos_split[0]!="" ) {
		var cadena =  '<object data="../controlador/documento/'+datos_split[0]+'"#zoom=100" type="application/pdf" style="width: 100%; height: 100%; min-height: 480px;">';
		$("#id_archivodocumento").html(cadena);
		}else{
		var cadena =  '<br><br><label>NO FILE EXIST</label><br><br><br>';
		$("#id_archivodocumento").html(cadena);
		}
}
function AbrirModalAsuntoDocumento(control){
	var datos = control.name;
	var datos_split = datos.split("*");
	$('#modal_asunto_documento_modal').modal({backdrop: 'static', keyboard: false})
	$('#modal_asunto_documento_modal').modal('show');
	$('#txtiddocumento_modal').html(datos_split[0]);
	$('#txtasunto_documento_modal').val(datos_split[1]);
	$('#cmb_estado').val(datos_split[3]).trigger("change");	
}
function AbrirModalDocumento(control){
	var datos = control.name;
	var datos_split = datos.split("*");
	$('#modal_editar_institucion').modal({backdrop: 'static', keyboard: false})
	$('#modal_editar_institucion').modal('show');
	$('#txtidinstitucion').val(datos_split[0]);
	$('#txtinstitucion_modal').val(datos_split[1]);
	$('#txttipoinstitucion_modal').val(datos_split[2]);
	$('#cmb_estado').val(datos_split[3]).trigger("change");	
}
function AbrirModalVerRemitente(control){
	var datos = control.name;
	var datos_split = datos.split("*");
	$('#txtiddocumento1_modal').html(datos_split[0]);
	$('#txtiddocumento2_modal').html(datos_split[0]);
	if (datos_split[2]=="C") {
		BuscarRemitenteCiudadano(datos_split[0]);
	}	
	if (datos_split[2]=="I") {
		BuscarRemitenteInstitucion(datos_split[0]);
	}	
}
function BuscarRemitenteCiudadano(control) {
	$.ajax({
		url:'../controlador/documento/controlador_documento_traeremitenteciudadano.php',
		type:'POST',
		data:{
			codigo:control
		}
	})
	.done(function(resp) {
		var data = JSON.parse(resp);
		if (data.length > 0) {
				$('#modal_datos_remitente_documento_modal').modal({backdrop: 'static', keyboard: false})
				$('#modal_datos_remitente_documento_modal').modal('show');
			var cadena="";
			for (var i = 0; i < data.length; i++) {
				$('#txtdatosremitente').val(data[i][0]);
				$('#txtdniremitente').val(data[i][1]);
				$('#txttelefonoremitente').val(data[i][2]);	
			}			
		}else{
			swal("Document without sender","","info");
		}
	})
}
function BuscarRemitenteInstitucion(control) {
	$.ajax({
		url:'../controlador/documento/controlador_documento_traeremitenteinstitucion.php',
		type:'POST',
		data:{
			codigo:control
		}
	})
	.done(function(resp) {
		var data = JSON.parse(resp);
		if (data.length > 0) {
				$('#modal_datos_remitenteinstitucion_documento_modal').modal({backdrop: 'static', keyboard: false})
				$('#modal_datos_remitenteinstitucion_documento_modal').modal('show');
			var cadena="";
			for (var i = 0; i < data.length; i++) {
				$('#txtdatosremitenteinstitucion').val(data[i][0]);
				$('#txttipoinstitucion').val(data[i][1]);
			}			
		}else{
			swal("Document without sender","","info");
		}
	})
}
function Listar_tipodocumento_combo() {
	$.ajax({
		url:'../controlador/tipo_documento/controlador_combolistar_tipodocumento.php',
		type:'POST'
	})
	.done(function(resp) {
		var data = JSON.parse(resp);
		if (data.length > 0) {
			var cadena = "";
				cadena += "<option value='otro'>"+"SELECT DOCUMENT TYPE"+"</option>";
			for (var i = 0; i < data.length; i++) {
				cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
			}
			$("#combo_tipodocumento").html(cadena);	
		}
		else{
			var cadena = "<option value='otro'>no type of documents were found available</option>";
			$("#combo_tipodocumento").html(cadena);
		}
	})
}
function Listar_areas_combo() {
	$.ajax({
		url:'../controlador/area/controlador_combolistar_area.php',
		type:'POST'
	})
	.done(function(resp) {
		var data = JSON.parse(resp);
		if (data.length > 0) {
			var cadena = "";
				cadena += "<option value='otro'>"+"SELECT AREA"+"</option>";
			for (var i = 0; i < data.length; i++) {
				cadena += "<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
			}
			$("#combo_area").html(cadena);	
		}
		else{
			var cadena = "<option value='otro'>no available areas found</option>";
			$("#combo_area").html(cadena);
		}
	})
}
function AbrirModalRemitente(){
	$('#modal_remitente').modal({backdrop: 'static', keyboard: false})
	$("#modal_remitente").modal("show");
	listar_ciudadanoremitente_vista('','1');
	listar_institucionremitente_vista('','1');
}
function listar_ciudadanoremitente_vista(valor,pagina){
	var pagina = Number(pagina);
	$.ajax({
		url:'../controlador/ciudadano/controlador_ListarBuscar_ciudadano_remitente_modal.php',
		type: 'POST',
		data:'valor='+valor+'&pagina='+pagina+'&boton=buscar',
		beforeSend: function(){
			$("#loading_almacen").addClass("fa fa-refresh fa-spin fa-3x fa-fw");
		},
	    complete: function(){
	      $("#loading_almacen").removeClass("fa fa-refresh fa-spin fa-3x fa-fw");
	    },
		success: function(resp){
			var datos = resp.split("*"); 
			var valores = eval(datos[0]); 
			if(valores.length>0){
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center' hidden='true' >ID</th>";
				cadena += "<th style = 'text-align: center'>NAME AND SURNAME</th>";
				cadena += "<th style = 'text-align: center'>DNI</th>";
				cadena += "<th style = 'text-align: center'>BIRTH DATE</th>";
				cadena += "<th style = 'text-align: center'>STATE</th>";
				cadena += "<th>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				for(var i = 0 ; i<valores.length; i++){
					var datoscompletos;
					datoscompletos = valores[i][1]+" "+valores[i][2]+" "+valores[i][3];
					cadena += "<tr>";			
					cadena += "<td align='center' hidden>"+valores[i][0]+"</td>";
					cadena += "<td>"+valores[i][1]+" "+valores[i][2]+" "+valores[i][3]+"</td>";
					cadena += "<td align='center'>"+valores[i][4]+"</td>";
					cadena += "<td align='center'>"+valores[i][6]+"</td>";
					if (valores[i][12]=="INACTIVO") {
						cadena += "<td style = 'text-align: center'> <span class='badge bg-danger' style='color:White;'>"+valores[i][12]+"</span> </td>";
					}else{
						cadena += "<td  style = 'text-align: center'> <span class='badge bg-success' style='color:White;'>"+valores[i][12]+"</span> </td>";
					}
					cadena += "<td><button name='"+valores[i][0]+"*"+datoscompletos+"*"+"C"+"' class='btn btn-primary' onclick='EnviarDatosRemitente(this)'><span class='glyphicon glyphicon-pencil'></span>";
					cadena += "</button></td> ";
					cadena += "</tr>";
				}
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_ciudadanosdisponibles_remitente").html(cadena);
				var totaldatos = datos[1];
				var numero_paginas = Math.ceil(totaldatos/5); 
				var paginar = "<ul class='pagination'>";
				if(pagina>1){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_ciudadanoremitente_vista("+'"'+valor+'","'+1+'"'+")'>&laquo;</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_ciudadanoremitente_vista("+'"'+valor+'","'+(pagina-1)+'"'+")'>Previous</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&laquo;</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Previous</a></li>";
				}
				limite = 10;
				div = Math.ceil(limite/2);
				pagina_inicio = (pagina > div) ? (pagina - div):1;
				if(numero_paginas > div){
					pagina_restante = numero_paginas - pagina;
					pagina_fin = (pagina_restante > div) ? (pagina + div) : numero_paginas;
				}
				else{
					pagina_fin = numero_paginas;
				}
				for(i = pagina_inicio;i<=pagina_fin;i++){
					if(i==pagina){
						paginar +="<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>";
					}
					else{
						paginar += "<li><a href='javascript:void(0)' onclick='listar_ciudadanoremitente_vista("+'"'+valor+'","'+i+'"'+")'>"+i+"</a></li>";
					}
				}
				if(pagina < numero_paginas){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_ciudadanoremitente_vista("+'"'+valor+'","'+(pagina+1)+'"'+")'>Next</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_ciudadanoremitente_vista("+'"'+valor+'","'+numero_paginas+'"'+")'>&raquo;</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Next</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&raquo;</a></li>";
				}
				paginar += "</ul>";
				$("#paginador_ciudadanosdisponibles_remitente").html(paginar);
			}else{
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center' hidden='true' >ID</th>";
				cadena += "<th style = 'text-align: center'>NAME AND SURNAME</th>";
				cadena += "<th style = 'text-align: center'>DNI</th>";
				cadena += "<th style = 'text-align: center'>BIRTH DATE</th>";
				cadena += "<th style = 'text-align: center'>STATE</th>";
				cadena += "<th>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				cadena +="<tr style = 'text-align: center'><td colspan='7'><strong>No records found</strong></td></tr>";
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_ciudadanosdisponibles_remitente").html(cadena);
				$("#paginador_ciudadanosdisponibles_remitente").html("");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown, jqXHR){
			alert("THERE WAS AN ERROR");
		}
	});
}
function listar_institucionremitente_vista(valor,pagina){
	var pagina = Number(pagina);
	$.ajax({
		url:'../controlador/institucion/controlador_ListarBuscar_institucionremitente_modal.php',
		type: 'POST',
		data:'valor='+valor+'&pagina='+pagina+'&boton=buscar',
		beforeSend: function(){
			$("#loading_almacen").addClass("fa fa-refresh fa-spin fa-3x fa-fw");
		},
	    complete: function(){
	      $("#loading_almacen").removeClass("fa fa-refresh fa-spin fa-3x fa-fw");
	    },
		success: function(resp){
			var datos = resp.split("*"); 
			var valores = eval(datos[0]); 
			if(valores.length>0){
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center' hidden='true' >ID</th>";
				cadena += "<th style = 'text-align: center'>INSTITUTION</th>";
				cadena += "<th style = 'text-align: center'>INSTITUTION TYPE</th>";
				cadena += "<th style = 'text-align: center'>STATE</th>";
				cadena += "<th style = 'text-align: center'>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				for(var i = 0 ; i<valores.length; i++){
					cadena += "<tr>";			
					cadena += "<td align='center' hidden>"+valores[i][0]+"</td>";
					cadena += "<td>"+valores[i][1]+"</td>";
					cadena += "<td align='center'>"+valores[i][2]+"</td>";
					if (valores[i][3]=="INACTIVO") {
						cadena += "<td style = 'text-align: center'> <span class='badge bg-danger' style='color:White;'>"+valores[i][3]+"</span> </td>";
					}else{
						cadena += "<td style = 'text-align: center'> <span class='badge bg-success' style='color:White;'>"+valores[i][3]+"</span> </td>";
					}
					cadena += "<td style = 'text-align: center'><button name='"+valores[i][0]+"*"+valores[i][1]+"*"+"I"+"' class='btn btn-primary' onclick='EnviarDatosRemitente(this)'><span class='glyphicon glyphicon-pencil'></span>";
					cadena += "</button></td> ";
					cadena += "</tr>";
				}
				cadena += "</tbody>";
				cadena += "</table>";
				$("#div_listar_instituciondisponible_remitente").html(cadena);
				var totaldatos = datos[1];
				var numero_paginas = Math.ceil(totaldatos/5); 
				var paginar = "<ul class='pagination'>";
				if(pagina>1){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_institucionremitente_vista("+'"'+valor+'","'+1+'"'+")'>&laquo;</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_institucionremitente_vista("+'"'+valor+'","'+(pagina-1)+'"'+")'>Previous</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&laquo;</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Previous</a></li>";
				}
				limite = 10;
				div = Math.ceil(limite/2);
				pagina_inicio = (pagina > div) ? (pagina - div):1;
				if(numero_paginas > div){
					pagina_restante = numero_paginas - pagina;
					pagina_fin = (pagina_restante > div) ? (pagina + div) : numero_paginas;
				}
				else{
					pagina_fin = numero_paginas;
				}
				for(i = pagina_inicio;i<=pagina_fin;i++){
					if(i==pagina){
						paginar +="<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>";
					}
					else{
						paginar += "<li><a href='javascript:void(0)' onclick='listar_institucionremitente_vista("+'"'+valor+'","'+i+'"'+")'>"+i+"</a></li>";
					}
				}
				if(pagina < numero_paginas){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_institucionremitente_vista("+'"'+valor+'","'+(pagina+1)+'"'+")'>Next</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_institucionremitente_vista("+'"'+valor+'","'+numero_paginas+'"'+")'>&raquo;</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Next</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&raquo;</a></li>";
				}
				paginar += "</ul>";
				$("#paginador_instituciondisponible_remitente").html(paginar);
			}else{
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center' hidden='true' >ID</th>";
				cadena += "<th style = 'text-align: center'>INSTITUTION</th>";
				cadena += "<th style = 'text-align: center'>INSTITUTION TYPE</th>";
				cadena += "<th style = 'text-align: center'>STATE</th>";
				cadena += "<th style = 'text-align: center'>ACTION</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				cadena +="<tr style = 'text-align: center'><td colspan='4'><strong>No records found</strong></td></tr>";
				cadena += "</tbody>";
				cadena += "</table>";
				$("#div_listar_instituciondisponible_remitente").html(cadena);
				$("#paginador_instituciondisponible_remitente").html("");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown, jqXHR){
			alert("THERE WAS AN ERROR");
		}
	});
}
function EnviarDatosRemitente(control){
	var datos = control.name;
	var datos_split = datos.split("*");
	$("#txtidremitente").val(datos_split[0]);
	$("#txtdatosremitente").val(datos_split[1]);
	$("#txttipo").val(datos_split[2]);
	$("#modal_remitente").modal("hide");
}
function TraerCodigoDocumento(){
	$.ajax({
		url:'../controlador/documento/controlador_codigodocumento_listar.php',
		type:'POST'
	})
	.done(function(resp){
		var data = JSON.parse(resp);
		if (data.length > 0) {
			var cant=data[0][0];
			if (cant<9) {
			    $("#txtiddocumento").val("DOC-00000"+(parseInt(cant)+1));
			};
			if (cant>=9 && cant<=98) {
				$("#txtiddocumento").val("DOC-0000"+(parseInt(cant)+1));
			};
			if (cant>=99 && cant<=998) {
				$("#txtiddocumento").val("DOC-000"+(parseInt(cant)+1));
			};
			if (cant>=999 && cant<=9998) {
				$("#txtiddocumento").val("DOC-00"+(parseInt(cant)+1));
			};
			if (cant>=9999 && cant<99999) {
				$("#txtiddocumento").val("DOC-0"+(parseInt(cant)+1));
			};
			if (cant>=99999) {
				$("#txtiddocumento").val("DOC-"+(parseInt(cant)+1));
			};		
		}
		else{
			$("#txtiddocumento").val("DOC-000001");
		}
	})
}
function Registrar_documento(){
	var iddocumento = $("#txtiddocumento").val();
	var idremitente = $("#txtidremitente").val();
	var opcion      = $("#txttipo").val();
	var idtipodocu  = $("#combo_tipodocumento").val();
	var idarea      = $("#combo_area").val();
	var asunto      = $("#txtasunto_documento").val();
	var idusuario   = $("#txtnombre_codigo_usuario").val();
	if (idarea=='asunto' ) {
		return swal("It remains to select the subject of the document","","error");
	}
	if (idarea=='otro' && idtipodocu=='otro') {
		return swal("It remains to select the destination area and the Document Type","","error");
	}
	if (idarea=='otro' ) {
		return swal("Falta seleccionar el area de destino","","error");
	}
	if (idtipodocu=='otro') {
		return swal("It remains to select the destination area","","error");
	}
	if (idremitente.length==0) {
		return swal("It remains to select the type of document","","error");
	}	
	//return alert(iddocumento+" - "+ asunto +" - "+ idtipodocu +" - "+idarea +" - "+ idremitente +" - "+ idusuario +" - "+opcion);
	$.ajax({
		url:'../controlador/documento/controlador_registrar_documento.php',
		type:'POST',
		data:{
			iddocumento:iddocumento,
			asunto:asunto,
			idtipodocu:idtipodocu,
			idarea:idarea,
			idremitente:idremitente,
			idusuario:idusuario,
			opcion:opcion
		}
	})
	.done(function(resp){
		if (resp > 0) {
			swal("Registered Document!", "", "success")
			.then ( ( value ) =>  { 
				  $("#main-content").load("Documento/vista_documento_listar.php"); 
			});
			
		}
		else{
			swal("!Sorry the document was not Registered!", "", "error");	
		}
	})
	.fail(function( jqXHR, textStatus, errorThrown){
		if (jqXHR.status === 0) {

	    alert('Not connect: Verify Network.');

	  } else if (jqXHR.status == 404) {

	    alert('Requested page not found [404]');

	  } else if (jqXHR.status == 500) {

	    alert('Internal Server Error [500].');

	  } else if (textStatus === 'parsererror') {

	    alert('Requested JSON parse failed.');

	  } else if (textStatus === 'timeout') {

	    alert('Time out error.');

	  } else if (textStatus === 'abort') {

	    alert('Ajax request aborted.');

	  } else {

	    alert('Uncaught Error: ' + jqXHR.responseText);

	  }
	})			
}
function Registrar_documento_post(){
	$(document).on('submit', '#create-form-documento', function() { 
      var data = $(this).serialize(); 
      $.ajax({  
        type : 'POST',
        mimeType: "multipart/form-data",
        url:'../controlador/documento/controlador_registrar_documento.php',
        data:  new FormData(this),
        contentType: false,
        cache: false,
        processData:false,
        success:function(resp) {
          if(resp>0){
          	document.getElementById("create-form-documento").reset();
            swal("Registered Document!", "", "success")
			.then ( ( value ) =>  { 
				  $("#main-content").load("Documento/vista_documento_listar.php"); 
			});
          }else{
            var iddocumento = $("#txtiddocumento").val();
			var idremitente = $("#txtidremitente").val();
			var opcion      = $("#txttipo").val();
			var idtipodocu  = $("#combo_tipodocumento").val();
			var idarea      = $("#combo_area").val();
			var asunto      = $("#txtasunto_documento").val();
			var idusuario   = $("#txtnombre_codigo_usuario").val();
			if (asunto.length==0 ) {
				return swal("It remains to select the subject of the document","","error");
			}
			if (idarea=='otro' && idtipodocu=='otro') {
				return swal("It remains to select the destination area and the Document Type","","error");
			}
			if (idarea=='otro' ) {
				return swal("It remains to select the destination area","","error");
			}
			if (idtipodocu=='otro') {
				return swal("It remains to select the type of document","","error");
			}
			if (idremitente.length==0) {
				return swal("It remains to select the type of document","","error");
			}
          }
          traer_administrador();
        }  
      });
      return false;
    }); 
}
//=============================================================================================================================
//=============================================================================================================================
//===================================================VERIFICAR DOCUMENTO PENDIENTE=============================================
//=============================================================================================================================
//=============================================================================================================================
function listar_verificardocumento_vista(valor,pagina){
	var pagina = Number(pagina);
	$.ajax({
		url:'../controlador/documento/controlador_ListarBuscar_documentopendiente.php',
		type: 'POST',
		data:'valor='+valor+'&pagina='+pagina+'&boton=buscar',
		beforeSend: function(){
			$("#loading_almacen").addClass("fa fa-refresh fa-spin fa-3x fa-fw");
		},
	    complete: function(){
	      $("#loading_almacen").removeClass("fa fa-refresh fa-spin fa-3x fa-fw");
	    },
		success: function(resp){
			var datos = resp.split("*"); 
			var valores = eval(datos[0]); 
			if(valores.length>0){
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center;width: 80px;word-wrap: break-word;'>ID</th>";
				cadena += "<th style = 'text-align: center;width: 50px;word-wrap: break-word;'>SUBJECT</th>";
				cadena += "<th style = 'text-align: center;width: 130px;word-wrap: break-word;'>RECEPTION DATE</th>";
				cadena += "<th style = 'text-align: center;width: 100px;word-wrap: break-word;'>ASSIGNED AREA</th>"
				cadena += "<th style = 'text-align: center;width: 100px;word-wrap: break-word;''>DOCUMENT TYPE</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>SENDER</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>ARCHIVE</th>";
				cadena += "<th style = 'text-align: center;width: 200px;word-wrap: break-word;'>STATE</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				for(var i = 0 ; i<valores.length; i++){
					cadena += "<tr>";			
					cadena += "<td  style = 'width: 80px;word-wrap: break-word;color:#9B0000; text-align:center;font-weight: bold;'>"+valores[i][0]+"</td>";
					cadena += "<td style = 'text-align: center;width: 50px;word-wrap: break-word;'><button name='"+valores[i][0]+"*"+valores[i][1]+"' class='btn btn-info' title='Vista previa del asunto' style='background-color: #ffffff ; border-color: #ffffff' onclick='AbrirModalAsuntoDocumento(this)'><span class='fa fa-eye' style='color: #000000'></span>";
					cadena += "&nbsp;</button> </td>";
					cadena += "<td style = 'text-align: center;width: 130px;word-wrap: break-word;'>"+valores[i][2]+"</td>";
					cadena += "<td style = 'text-align: center;width: 100px;word-wrap: break-word;'>"+valores[i][4]+"</td>";
					cadena += "<td style = 'text-align: center;width: 100px;word-wrap: break-word;'>"+valores[i][3]+"</td>";
					cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'><button name='"+valores[i][0]+"*"+valores[i][1]+"*"+valores[i][6]+"' class='btn btn-info' title='Vista previa de los Datos del remitente' style='background-color: #ffffff ; border-color: #ffffff' onclick='AbrirModalVerRemitente(this)'><span class='fa fa-eye' style='color: #000000'></span>";
					cadena += "&nbsp;</button> </td>";
					cadena += "<td style = 'text-align: center;width: 20px;word-wrap: break-word;'><button name='"+valores[i][9]+"' class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#fff' title='Ver documento Cargado' onclick='AbrirModalArchivo_documento(this)'><i class='fa  fa-folder-open' style='color:orange;'></i></button></td>";
					if (valores[i][5]=="RECHAZADO") {
						cadena += "<td style = 'text-align: center;width: 80px;word-wrap: break-word;'><button disabled class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#000;color:#000 !important;'  title='Aceptar Documento' onclick='AbrirfuncionAceptarSolicitud(this)'><i class='fa fa-check' style='color:green;'></i>";
						cadena += "<b> Procesado</b></button></td>";
					}else if (valores[i][5]=="ACEPTADO") {
						cadena += "<td style = 'text-align: center;width: 80px;word-wrap: break-word;'><button disabled class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#000;color:#000 !important;'  title='Aceptar Documento' onclick='AbrirfuncionAceptarSolicitud(this)'><i class='fa fa-check' style='color:green;'></i>";
						cadena += "<b> Procesado</b></button></td>";
					}else
					{
						cadena += "<td style = 'text-align: center;width: 200px;word-wrap: break-word;'><button  name='"+valores[i][0]+"'  class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#000;color:#000 !important;'  title='Aceptar Documento' onclick='AbrirfuncionAceptarSolicitud(this)'><i class='fa fa-check' style='color:green;'></i>";
						cadena += "<b> Aceptar</b></button>&nbsp;<button  name='"+valores[i][0]+"'  class='btn btn-primary btn-sx' style='background-color:#fff;border-color:#000;color:#000 !important;'  title='Rechazar Documento' onclick='AbrirfuncionRechazarSolicitud(this)'><i class='fa fa-close' style='color:red;'></i>";
						cadena += "<b> Rechazar</b></button></td>";
					}
					cadena += "</tr>";
				}
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_documentopendiente_tabla").html(cadena);
				var totaldatos = datos[1];
				var numero_paginas = Math.ceil(totaldatos/5); 
				var paginar = "<ul class='pagination'>";
				if(pagina>1){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_verificardocumento_vista("+'"'+valor+'","'+1+'"'+")'>&laquo;</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_verificardocumento_vista("+'"'+valor+'","'+(pagina-1)+'"'+")'>Previous</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&laquo;</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Previous</a></li>";
				}
				limite = 10;
				div = Math.ceil(limite/2);
				pagina_inicio = (pagina > div) ? (pagina - div):1;
				if(numero_paginas > div){
					pagina_restante = numero_paginas - pagina;
					pagina_fin = (pagina_restante > div) ? (pagina + div) : numero_paginas;
				}
				else{
					pagina_fin = numero_paginas;
				}
				for(i = pagina_inicio;i<=pagina_fin;i++){
					if(i==pagina){
						paginar +="<li class='active'><a href='javascript:void(0)'>"+i+"</a></li>";
					}
					else{
						paginar += "<li><a href='javascript:void(0)' onclick='listar_verificardocumento_vista("+'"'+valor+'","'+i+'"'+")'>"+i+"</a></li>";
					}
				}
				if(pagina < numero_paginas){
					paginar += "<li><a href='javascript:void(0)' onclick='listar_verificardocumento_vista("+'"'+valor+'","'+(pagina+1)+'"'+")'>Next</a></li>";
					paginar += "<li><a href='javascript:void(0)' onclick='listar_verificardocumento_vista("+'"'+valor+'","'+numero_paginas+'"'+")'>&raquo;</a></li>";
				}
				else{
					paginar += "<li class='disabled'><a href='javascript:void(0)'>Next</a></li>";
					paginar += "<li class='disabled'><a href='javascript:void(0)'>&raquo;</a></li>";
				}
				paginar += "</ul>";
				$("#paginador_documentopendiente_tabla").html(paginar);
			}else{
				var cadena = "";
				cadena += "<table  class='table table-condensed jambo_table'>";
				cadena += "<thead  class=''>";
				cadena += "<tr >";
				cadena += "<th style = 'text-align: center;width: 80px;word-wrap: break-word;'>ID</th>";
				cadena += "<th style = 'text-align: center;width: 50px;word-wrap: break-word;'>SUBJECT</th>";
				cadena += "<th style = 'text-align: center;width: 130px;word-wrap: break-word;'>RECEPTION DATE</th>";
				cadena += "<th style = 'text-align: center;width: 100px;word-wrap: break-word;'>ASSIGNED AREA</th>"
				cadena += "<th style = 'text-align: center;width: 100px;word-wrap: break-word;''>DOCUMENT TYPE</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>SENDER</th>";
				cadena += "<th style = 'text-align: center;width: 20px;word-wrap: break-word;'>ARCHIVE</th>";
				cadena += "<th style = 'text-align: center;width: 200px;word-wrap: break-word;'>STATE</th>";
				cadena += "</tr>";
				cadena += "</thead>";
				cadena += "<tbody>";
				cadena +="<tr style = 'text-align: center'><td colspan='8'><strong>No records found</strong></td></tr>";
				cadena += "</tbody>";
				cadena += "</table>";
				$("#listar_documentopendiente_tabla").html(cadena);
				$("#paginador_documentopendiente_tabla").html("");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown, jqXHR){
			alert("THERE WAS AN ERROR");
		}
	});
}
function AbrirfuncionAceptarSolicitud(control){
	var datos       = control.name;
	var datos_split = datos.split("*");
	swal({
	  title: "Are you sure you want to Accept the Document?",
	  icon: "success",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	  	$.ajax({
	  		url:'../controlador/documento/controlador_documento_aceptado.php',
	  		type:'POST',
	  		data:{
	  			codigo:datos_split[0]
	  		}
	  	})
	  	.done(function(resp){
	  		 listar_verificardocumento_vista('PENDIENTE','1');
	  		if (resp>0) {
	  			 swal("Request accepted","", {
				      icon: "success",
				    });
	  		}else{
	  			swal("The request could not be accepted","","error");
	  		}
	  	})
	   
	  } else {
	    swal("Process Canceled","","warning");
	  }
	});
}
function AbrirfuncionRechazarSolicitud(control){
	var datos       = control.name;
	var datos_split = datos.split("*");
	swal({
	  title: "Are you sure you want to Reject the Document?",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	     	$.ajax({
		  		url:'../controlador/documento/controlador_documento_rechazado.php',
		  		type:'POST',
		  		data:{
		  			codigo:datos_split[0]
		  		}
		  	})
		  	.done(function(resp){alert(resp);
		  		 listar_verificardocumento_vista('PENDIENTE','1');
		  		if (resp>0) {
		  			 swal("Rejected request","", {
					      icon: "success",
					    });
		  		}else{
		  			swal("The request could not be rejected","","error");
		  		}
		  	})
	  } else {
	   swal("Process Canceled","","warning");
	  }
	});
}