function VerificarUsuario(){
	var u = $("#txt_usuario").val();
	var p = $("#txt_pass").val();
	if (u.length == 0 || p.length == 0) {
		swal("Incomplete fields!!","");
	}else{
		$.ajax({
			url:'../controlador/usuario/controlador_usuario_validar.php',
			type:'POST',
			data:{
				user:u,
				pass:p,
			}
		})
		.done(function(resp){
			if (resp==0) {
				Limpiar_post_usuario();
				var resultado="";
				resultado = 'User and / or password not valid';
			    swal(resultado,"","warning");
			}else{
				 var data = JSON.parse(resp);
				$.ajax({
				url:'../controlador/usuario/controlador_iniciar_sesion.php',
				type:'POST',
				data:{
					user:data[0][0],
					pass:data[0][1],
					nom:data[0][2],
					img:data[0][4],
					usuario:data[0][6],
					codigo_personal:data[0][5],
					idusuario:data[0][7]
				}
				})
				.done(function(resp){
					swal({
					  title: "Welcome",
					  text: "Correct data.",
					  timer: 1000,
					  showConfirmButton: false
					});
					location.reload(true);
				})
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
}
function Limpiar_post_usuario(){
	$("#txt_usuario").val("");
	$("#txt_pass").val("");
} 
function abrirmodaladministrativo(){
	traer_administrador();
	$('#modal_editar_adminsitrador').modal({backdrop: 'static', keyboard: false})
	$("#modal_editar_adminsitrador").modal("show");
}
function traer_administrador(){
	var codigo_personal = $("#txtcodigo_principal_usuario").val();
	$.ajax({
		url:'../controlador/usuario/controlador_administrador_buscar.php',
		type:'POST',
		data:{
			buscar:codigo_personal
		}
	})
	.done(function(resp){
		var data = JSON.parse(resp);
		if (data.length > 0) {
			$("#txtoriginal").val(data[0][8]);
			$("#txtnombre_usuario").html(data[0][0]+" "+data[0][1]+" "+data[0][2]);
			$("#txtnombre_usuario1").html(data[0][0]+" "+data[0][1]+" "+data[0][2]);
			$("#txtnombre_usuario2").html(data[0][0]+" "+data[0][1]+" "+data[0][2]);
			$("#nombres_personal").val(data[0][0]);
			$("#apePate_personal").val(data[0][1]);
			$("#apeMate_personal").val(data[0][2]);
			$("#email_personal").val(data[0][5]);
			$("#telefono_personal").val(data[0][6]);
			$("#movil_personal").val(data[0][7]);
			$("#direccion_personal").val(data[0][9]);
			if (data[0][10]!="0000-00-00") {
				$("#fechanacimiento_personal").val(data[0][10]);	
			}			
			$("#dni_personal").val(data[0][11]);
			$("#txtimagen").html('<img style="width: auto; height: 100px;" src="../controlador/usuario/'+ data[0][3]+'"> ');
			$("#txtimagen2").html('<img style="width: auto; height: 100px;" src="../controlador/usuario/'+ data[0][3]+'" class="img-full">');
			$("#txtimagen1").html('<img class="user-image" src="../controlador/usuario/'+ data[0][3]+'" alt="...">');
			$("#txtimagen3").html('<img  class="img-circle" style="width: 50px;height: 50px;" src="../controlador/usuario/'+ data[0][3]+'" alt="...">');
			if (data[0][3]!="") {
				var cadena = '<img src="../controlador/usuario/'+data[0][3]+'" class="kv-preview-data file-preview-image file-zoom-detail" style="width: 41%;">';
				$("#id_imagen").html(cadena);
			}else{
				var cadena =  '<br><br><label>NO IMAGE EXIST</label><br><br><br>';
				$("#id_imagen").html(cadena);
			}
		}
	})
}
function abrirModalusuario(){
	$('#modal_cuenta').modal({backdrop: 'static', keyboard: false})
	$("#modal_cuenta").modal("show");
}
function Editar_cuenta(){
	var usuario = $("#txtusuario").val();
	var actual  = $("#txtactual").val();
	var nueva   = $("#txtnueva").val();
	var repetir = $("#txtrepetir").val();
	var original= $("#txtoriginal").val();
	if (original!=actual) {
			return swal("Password does not match current","Incorrect password","error");
	}
	if (nueva!=repetir) {
		return swal("You must enter the same password twice to confirm","","warning");
	}
	$.ajax({
		type:'POST',
		url:'../controlador/usuario/controlador_cuenta_actualizar.php',
		data:{
			_usuario:usuario,
			_actual:actual,
			_nueva:nueva
		}
	})
	.done(function(resp){
		Limpiar_POST_cuenta();
		$("#modal_cuenta").modal("hide");
		if (resp>0) {
			swal("Your account was Successfully Updated!!","","success");
		}else{
			swal("Could not Update your Account!!!","","error");
		}
	})
}
function Limpiar_POST_cuenta(){
	$("#txtactual").val("");
	$("#txtnueva").val("");
	$("#txtrepetir").val("");
	traer_administrador();
}