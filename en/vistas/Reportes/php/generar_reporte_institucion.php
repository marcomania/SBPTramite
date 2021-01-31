<?php
//include('plantilla.php');
require('../fpdf/fpdf.php');
$mysqli = new mysqli("localhost","root","","bd_tramite"); 
	
if(mysqli_connect_errno()){
	echo 'Conexion Fallida : ', mysqli_connect_error();
	exit();
}
$query = "SELECT
institucion.inst_nombre,
institucion.inst_tipoinstitucion,
documento.doc_asunto,
CAST(documento.doc_fecha_recepcion AS DATE) AS FECHA,
area.area_nombre,
documento.doc_estado,
documento.documento_cod
FROM
institucion
INNER JOIN detalle_institucion ON detalle_institucion.institucion_cod = institucion.institucion_cod
INNER JOIN documento ON detalle_institucion.documento_cod = documento.documento_cod
INNER JOIN area ON documento.area_cod = area.area_cod";
	$resultado = $mysqli->query($query);
	
	$pdf=new FPDF('L','mm','A4');
	$pdf->AliasNbPages();
	$pdf->AddPage();
	$pdf->Image('../../descarga.png', 17, 7, 30 );
		$pdf->SetFont('Courier','B',15);
		$pdf->Cell(80);
		$pdf->Cell(120,10, 'Institution paperwork report',0,0,'C');
		$pdf->Ln(30);
		$pdf->SetFont('Courier','B',12);
	$pdf->SetFillColor(232,232,232);
	$pdf->SetFont('Courier','B',10);
	$pdf->Cell(30,6,'CODE',1,0,'C',1);
	$pdf->Cell(50,6,utf8_decode('INSTITUTION'),1,0,'C',1);
	$pdf->Cell(35,6,utf8_decode('INSTITUTION TYPE'),1,0,'C',1);
	$pdf->Cell(120,6,'SUBJECT',1,0,'C',1);
	$pdf->Cell(41,6,'AREA',1,1,'C',1);
	
	$pdf->SetFont('Courier','',10);
	$cont=0;
	if ($resultado = $mysqli->query($query)) {
		while($row = $resultado->fetch_assoc())
		{
		$cont++;
		$pdf->Cell(30,6,utf8_decode($row['documento_cod']),1,0,'C');
		$pdf->Cell(50,6,utf8_decode($row['inst_nombre']),1,0,'C');
		$pdf->Cell(35,6,utf8_decode($row['inst_tipoinstitucion']),1,0,'C');
		$pdf->Cell(120,6,utf8_decode($row['doc_asunto']),1,0,'C');
		$pdf->Cell(40,6,utf8_decode($row['area_nombre']),1,1,'C');
		}
	}
	if ($cont==0) {
			$pdf->Cell(276,6,"No data found",1,1,'C');
	}
	$pdf->Cell(120);
	$pdf->Output();
?>