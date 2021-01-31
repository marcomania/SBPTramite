<script type="text/javascript" src="_recursos/js/consola_ciudadano.js"></script>
<link type="text/css" rel="stylesheet" href="_recursos/input-file/css/diseño_input_2.css">
<script src="_recursos/input-file/js/bootstrap-uploader/file-upload.js"></script>
<div class="contendor_kn">
  <div class="panel panel-default">
    <div class="panel-heading">
        <h2><b>REGISTERED SENDER</b></h2>            
    </div>
    <div class="panel-body">
	    <br>
	    <div class="col-md-10"> 
	        <div class=" input-group">
	          	<input type="text" class="form-control" placeholder="Enter the national identity document" id="txtbuscar_ciudadano"  onkeypress="return soloNumeros(event)"  >
	          	<span class="input-group-addon"><i class="fa fa-search"></i></span>
	        </div>
	    </div>
	    <div class="col-md-2">
	       <button style="width:100%" class="btn btn-danger" onclick="cargar_contenido('main-content','Ciudadano/vista_registrar_ciudadano.php')"><i class="fa fa-plus-square"></i>&nbsp;<b>New Registration</b></button></div>
        <div class="col-md-12">
            <div class="table-responsive" style="text-align: center;">
            	<br>
            	<label>LIST OF SENDERS</label>
                <div id="lista_ciudadano_tabla" class="icon-loading">
                </div>
                <p id="paginador_ciudadano_tabla" style="text-align:right" class="mi_paginador"></p>
              </div>
         </div>
    </div>
  </div>
</div>
<!-- INICIO MODAL -->
<div class="modal fade bs-example-modal-lg" id="modal_editar_ciudadano">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title" id="myModalLabel"><b>Edit Sendero</b></h4>
         </div>
      	<div class="modal-body">
			<div class="panel-body">
	                    <div class="col-sm-12">
	                        <input type="text" id="txtidciudadano" hidden >
	                        <label>Names </label>
	                        <input type="text" class="form-control" onkeypress="return soloLetras(event)" id="txtnombre_alimentos" placeholder="Enter Names" maxlength="">
	                        <br>
	                    </div>
	                    <div class="col-md-6">
	                        <label>Last name </label>
	                        <input type="text" class="form-control"onkeypress="return soloLetras(event)"id="txtapellidopaterno" placeholder="Enter Paternal Last Name" maxlength="">
	                       <br>
	                    </div>
	                    <div class="col-md-6">
	                        <label >Mother's last name </label>
	                        <input type="text" class="form-control" onkeypress="return soloLetras(event)" id="txtapellidomaterno" placeholder="Enter Maternal Name" maxlength="">
	                        <br>
	                    </div> 
	                    <div class="col-md-6">
	                        <label>Type Person </label>
	                        <select id="cbm_tipo"  style="width: 100%" class="form-control select2">
	                          <option value="JURIDICA">LEGAL</option>
	                          <option value="NATURAL">NATURAL</option>
	                        </select>
	                        <br>
	                    </div> 
	                    <div class="col-sm-6">
	                        <label >Telephone </label>
	                        <input type="text" class="form-control" onkeypress="return soloNumeros(event)" id="txttelefono_modal" placeholder="Enter phone number" maxlength="9">
	                        <br>
	                    </div>        
	                    <div class="col-md-6">
	                        <label>Mobile </label>
	                        <input type="text"class="form-control" id="txtmovil_modal"  onkeypress="return soloNumeros(event)" placeholder="Enter mobile number" maxlength="9">
	                            <br>
	                    </div> 
	                    <div class="col-md-6">
	                        <label>Direction </label>
	                        <input type="text"  class="form-control"  onkeypress="return soloLetras(event)"id="txtdireccion_modal" placeholder="Enter address" maxlength="200">
	                        <br>
	                    </div> 
	                    <div class="col-sm-4">
	                        <label>Date of birth</label>
	                        <div class=" input-group">
	                          <div class="input-group-addon">
	                            <i class="fa fa-calendar"></i>
	                          </div>
	                          <input type="date" style="padding: 0px 12px;background-color: #FFFFFF;font-weight:bold;" id="txtfecha_modal"  class="form-control"  >
	                        </div>
	                    </div>
	                    <div class="col-md-4">
	                        <label>Document Number</label>
	                        <input type="text"  class="form-control"  onkeypress="return soloNumeros(event)" id="txtnrodocumento" style="width: 100%;" placeholder="Enter document number" maxlength="13">
	                    </div>
	                    <div class="col-sm-4">
	                        <label>Email</label>
	                        <input type="text"  class="form-control"  onkeypress="return soloNumeros(event)" id="txtemail_modal" style="width: 100%;" placeholder="Enter email" maxlength="13">
	                    </div>   
			</div>         
        </div> 
        <div class="modal-footer">
        	<button  class="btn btn-success" onclick="Editar_ciudadano()"><i class="fa fa-check"></i>&nbsp;<b>Modify Sender</b></button>&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Cancel</b></button>
        </div> 
    </div>
  </div> 
</div>
<style type="text/css">
	.contendor_kn{
		padding: 10px;
	}
</style> 
<script type="text/javascript">listar_ciudadano_vista('','1');</script>
<script type="text/javascript">
  $("#txtbuscar_ciudadano").keyup(function(){
    var dato_buscar = $("#txtbuscar_ciudadano").val();
    listar_ciudadano_vista(dato_buscar,'1');
  });
</script>
<script>
    function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
       especiales = "8-37-39-46";

       tecla_especial = false
       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
            return false;
        }
    }
  	function soloNumeros(e){
      	tecla = (document.all) ? e.keyCode : e.which;
      //Tecla de retroceso para borrar, siempre la permite
	    if (tecla==8){
          return true;
    	}  
      // Patron de entrada, en este caso solo acepta numeros
      	patron =/[0-9]/;
      	tecla_final = String.fromCharCode(tecla);
      	return patron.test(tecla_final);
  	}
</script>
<script>
    $(function () {
        $('.select2').select2();
    })
</script>