<script type="text/javascript" src="_recursos/js/console_documento.js"></script>
<div class="contendor_kn">
  <div class="panel panel-default">
    <div class="panel-heading">
        <h2><b>REGISTERED DOCUMENTS</b></h2>            
    </div>
    <div class="panel-body">
        <div class="col-md-10"> 
          <div class=" input-group">
            <input id="txt_documento_vista" type="text" class="form-control" onkeypress="return soloLetras(event)"  placeholder="Enter the code of the document to search">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-danger" onclick="cargar_contenido('main-content','Documento/vista_documento_registrar.php');"><i class="fa fa-file-text" ></i> &nbsp;&nbsp;<strong>New Registration</strong></button>    
        </div>
        <div class="col-md-12">
          <div class="box-body table-responsive" style="text-align: center;"><br>
          	<label>LIST OF REGISTERED DOCUMENTS</label>
              <div id="listar_documento_tabla" class=" icon-loading">
                <i id="loading_almacen" style="margin:auto;display:block; margin-top:60px;"></i>
                <div id="nodatos"></div>
              </div>
              <p id="paginador_documento_tabla" style="text-align:right" class="mi_paginador"></p>
          </div>
      </div>
    </div>
  </div>
</div>
<!-- INICIO MODAL -->
<script type="text/javascript">listar_documento_vista("","1");</script>
<!--Fin Modal-->

<style type="text/css">
	.contendor_kn{
		padding: 10px;
	}
</style>
<div class="modal fade bs-example-modal-lg" id="modal_editar_area">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title" id="myModalLabel"><b>Edit Area</b></h4>
         </div>
        <div class="modal-body">
      <div class="panel-body">
                      <div class="col-sm-6">
                          <input type="text" id="txtidarea" hidden >
                          <label>Name Area </label>
                          <input type="text" class="form-control" onkeypress="return soloLetras(event)" id="txtarea_modal" placeholder="Enter Area Name" maxlength="">
                          <br>
                      </div>
                      <div class="col-sm-6">
                          <label>State</label>
                          <select id="cmb_estado" style="width: 100%" class="form-control select2">
                            <option value="ACTIVO">ACTIVE</option>
                            <option value="INACTIVO">INACTIVE</option>
                          </select>
                      </div>   
      </div>         
        </div> 
        <div class="modal-footer">
          <button  class="btn btn-success" onclick="Editar_area()"><i class="fa fa-check"></i>&nbsp;<b>Modify Area</b></button>&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Cancel</b></button>
        </div> 
    </div>
  </div> 
</div>
<div class="modal fade" id="modal_asunto_documento_modal">
  <div class="modal-dialog">
    <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title" id="myModalLabel"><b>Document Subject N°: </b><label id="txtiddocumento_modal"></label></h4>
         </div>
        <div class="modal-body">
      <div class="panel-body">
          <div class="col-md-12">
            <label>SUBJECT</label>
            <textarea class="form-control" rows="8"  style="resize: none" readonly="" style="color: rgb(25,25,51); background-color: rgb(255,255,255);solid 5px;" placeholder="Enter Subject ..." id="txtasunto_documento_modal"></textarea>
          </div> 
      </div>         
        </div> 
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Close</b></button>
        </div> 
    </div>
  </div> 
</div>
<div class="modal fade" id="modal_datos_remitente_documento_modal">
  <div class="modal-dialog">
    <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title" id="myModalLabel"><b>Document Sender Data N°: </b><label id="txtiddocumento1_modal"></label></h4>
         </div>
        <div class="modal-body">
      <div class="panel-body">
          <div class="col-md-12">
            <label>SENDER DATA</label>
            <input type="text" id="txtdatosremitente" class="form-control"><br>
          </div> 
          <div class="col-md-6">
            <label>DNI</label>
            <input type="text" id="txtdniremitente" class="form-control">
          </div> 
          <div class="col-md-6">
            <label>TELEPHONE</label>
            <input type="text" id="txttelefonoremitente" class="form-control">
          </div> 
      </div>         
        </div> 
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Close</b></button>
        </div> 
    </div>
  </div> 
</div>
<div class="modal fade" id="modal_datos_remitenteinstitucion_documento_modal">
  <div class="modal-dialog">
    <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title" id="myModalLabel"><b>Document Sender Data N°: </b><label id="txtiddocumento1_modal"></label></h4>
         </div>
        <div class="modal-body">
          <div class="panel-body">
              <div class="col-md-12">
                <label>SENDER DATA</label>
                <input type="text" id="txtdatosremitenteinstitucion" class="form-control"><br>
              </div> 
              <div class="col-md-12">
                <label>INSTITUTION TYPE</label>
                <input type="text" id="txttipoinstitucion" class="form-control">
              </div> 
          </div>         
        </div> 
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"></i>&nbsp;<b>Close</b></button>
        </div> 
    </div>
  </div> 
</div>
<div class="modal fade bs-example-modal-lg" id="modal_archivo_documento" role="dialog" aria-labelledby="myModalLabel">  
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="kv-zoom-actions pull-right">
            <button type="button" class="btn btn-default btn-close" title="Close detailed preview" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button>
          </div>
          <h4 class="modal-title" id="myModalLabel"><b>DOCUMENT FILE: </b><label id="txtiddocumento1_modal"></label></h4>
        </div>
        <div class="modal-body">
          <div class="floating-buttons"></div>
          
            <div class="kv-zoom-body file-zoom-content" style="text-align:center; " >
            <div id="id_archivodocumento"></div>
          
        </div>
        </div>
      </div>
    </div>
</div>
<script type="text/javascript">
	$("#txt_documento_vista").keyup(function(){
		var dato_buscar = $("#txt_documento_vista").val();
		listar_documento_vista(dato_buscar,'1');
	});
</script>
<script>
    $(function () {
        $('.select2').select2();
    })
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