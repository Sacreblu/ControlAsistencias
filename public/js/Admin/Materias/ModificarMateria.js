

var validarContDatosMateria = 0;

var ContadorHorarioGuardados = -1;
var ContadorHorario = 0; 

var ArregloBorrarHorarios = [];
var validarContHorarios = 0;
var validarContAulas = 0;

var Profesores = "";
var Bandera = true;

window.onload = function() {
	initializeRegistrarMateria();
    $('#loader').fadeOut("fast");
};

function initializeRegistrarMateria() {
	$('#User').html(info['NombreFacultad']);
	
	inicializarFormularioMateria();
}

function inicializarFormularioMateria(){
	var resultado = info["Profesores"];
	var Json ="[";
	var arregloNombres=[];
	for (let i = 0; i < resultado.length; i++) {
		arregloNombres.push(resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M);
		if (i == resultado.length-1) {
			Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'", "Facultad" : "'+resultado[i].Facultad+'"}';
		}else{
			Json += '{"Nombre" : "'+resultado[i].Nombre+' '+resultado[i].Apellido_P+' '+resultado[i].Apellido_M+'", "id" : "'+resultado[i].id+'", "Facultad" : "'+resultado[i].Facultad+'"},';
		}
	}
	Json +="]";
	Json = JSON.parse(Json);
	Profesores = Json;

	if(info["Programas"].length!=0){
		for (let i = 0; i < info["Programas"].length; i++) {
			$("#ProgEducativo").append(new Option(info["Programas"][i].NombreCarrera, info["Programas"][i].idCarrera));
		}
	}else{
		$("#ProgEducativo").append(new Option("Sin programas educativos registrados", "0"));
	}

	autocompleteProfesores(arregloNombres);
	ControladorPeriodo();
	setInfoForm();
	setHorarios();
}

function autocompleteProfesores(arregloNombres){
	$( "#Profesor" ).autocomplete({
		source: arregloNombres
	});
}

function ControladorProfesor(){
	var valor = $("#Profesor").val();
	var profesor = Profesores.filter(function (profesor) { return profesor.Nombre == valor; });
    try {
		$("#idProfesor").val(profesor[0]["id"]);
	} catch (error) {
		$("#idProfesor").val("");
	}
}

function ControladorPeriodo(){
	var Periodo = $("#Periodo").val();
	var BloqueA = [1, 3, 5, 7, 9, 11];
	var BloqueB = [2, 4, 6, 8, 10, 12];
	$("#Bloque").html("");
	if(Periodo == "Agosto - Enero"){
		for (let i = 0; i < BloqueA.length; i++) {
			$("#Bloque").append(new Option(BloqueA[i], BloqueA[i]));
		}
	}else{
		for (let i = 0; i < BloqueB.length; i++) {
			$("#Bloque").append(new Option(BloqueB[i], BloqueB[i]));
		}
	}
}

function setInfoForm(){
	var Materia = info['Materia'][0];
	$("#EE").val(Materia.NombreEE);
	$("#idEE").val(Materia.idMateria);
	$("#ProgEducativo").val(Materia.idPrograma);
	$("#NRC").val(Materia.NRC);
	$("#Periodo").val(Materia.Periodo);
	$("#Modalidad").val(Materia.ModalidadEE);
	$("#Bloque").val(Materia.Bloque);
	$("#Seccion").val(Materia.Seccion);
	if(Materia.idProf!=null){
		$("#Profesor").val(Materia.Nombre+" "+Materia.Apellido_P+" "+Materia.Apellido_M);
		$("#idProfesor").val(Materia.idProf);
	}
}

function setHorarios(){
	var Horarios = info['Horario']
	for (let i = 0; i < Horarios.length; i++) {
		ContadorHorarioGuardados += 1;
		var cardHorario = '<div class="Horario-form card" id="CardHGuardado'+ContadorHorarioGuardados+'">';
				cardHorario += '<div class="row">';
					cardHorario += '<div class="col-md-10" data-toggle="collapse" style="cursor: pointer" data-target="#ModificarHorario'+ContadorHorarioGuardados+'">';
						cardHorario += '<i class="fas fa-angle-right"></i> Clase Registrada ';
					cardHorario += '</div>';
					cardHorario += '<button class="col-md-2 btn btn-danger btn-xs btn-right"  type="button" onclick="EliminarClase(\''+ContadorHorarioGuardados+'\')">Eliminar</button>';
				cardHorario += '</div>';
				cardHorario += '<div id="ModificarHorario'+ContadorHorarioGuardados+'" class="collapse show">'
					cardHorario += '<hr>';
					cardHorario += '<form class="form-group" action="" name="formHorariosGuardados">';
						cardHorario += '<div class="form-row">';

							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label>Día</label>';
								cardHorario += ' <select class="form-control" id="DiasGuardado'+ContadorHorarioGuardados+'" name="Dia" onchange="resetalertDiaGuardado()">';
									cardHorario += '<option value="Lunes">Lunes</option>';
									cardHorario += '<option value="Martes">Martes</option>';
									cardHorario += '<option value="Miércoles">Miércoles</option>';
									cardHorario += '<option value="Jueves">Jueves</option>';
									cardHorario += '<option value="Viernes">Viernes</option>';
								cardHorario += '</select>';
							cardHorario += '</div>';
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Aula</label>';
								cardHorario += '<input type="text" class="form-control" id="AulaGuardado'+ContadorHorarioGuardados+'" name="Aula" oninput="$(\'#alertAulaGuardado'+ContadorHorarioGuardados+'Registro\').html(\'\')">';
								cardHorario += '<input type="hidden" name="idClase" id="idClaseGuardado'+ContadorHorarioGuardados+'">';
								cardHorario += '<input type="hidden" name="Pos" id="Pos'+ContadorHorarioGuardados+'" value="'+ContadorHorarioGuardados+'">';
							cardHorario += '</div>';

							cardHorario += '<span class="alertError" id="alertDiaGuardado'+ContadorHorarioGuardados+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertAulaGuardado'+ContadorHorarioGuardados+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertTraslapeAulaGuardado'+ContadorHorarioGuardados+'Registro"></span>';
						
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Hora de Inicio</label>';
								cardHorario += '<input type="number" onkeyup="controladorHorarioGuardado(\''+ContadorHorarioGuardados+'\')" oninput="$(\'#alertHoraIGuardado'+ContadorHorarioGuardados+'Registro\').html(\'\'); if( this.value.length > 2 )  this.value = this.value.slice(0,2)" class="form-control" id="HoraIGuardado'+ContadorHorarioGuardados+'" name="HoraI" placeholder="Ej. 07">';
								cardHorario += '<span class="alertHorario" id="alertHorarioGuardado'+ContadorHorarioGuardados+'Registro"></span>';
							cardHorario += '</div>';
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Duración (Hrs)</label>';
								cardHorario += '<input type="number" class="form-control" id="DuracionGuardado'+ContadorHorarioGuardados+'" name="Duracion" onkeyup="controladorHorarioGuardado(\''+ContadorHorarioGuardados+'\')" oninput="$(\'#alertDuracion'+ContadorHorarioGuardados+'Registro\').html(\'\'); if( this.value.length > 1 )  this.value = this.value.slice(0,1)">';
							cardHorario += '</div>';
							
							cardHorario += '<span class="alertError" id="alertHoraIGuardado'+ContadorHorarioGuardados+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertDuracionGuardado'+ContadorHorarioGuardados+'Registro"></span>';
						cardHorario += '</div>';
						cardHorario += '<div class="form-group">';
							cardHorario += '<label>Modalidad de la Clase</label>';
							cardHorario += ' <select class="form-control" id="ModalidadClaseGuardado'+ContadorHorarioGuardados+'" name="ModalidadClase">';
								cardHorario += '<option value="En Línea">En Línea</option>';
								cardHorario += '<option value="Presencial">Presencial</option>';
								cardHorario += '<option value="Híbrida">Híbrida</option>';
								cardHorario += '<option value="Virtual">Virtual</option>';
							cardHorario += '</select>';
						cardHorario += '</div>';
						cardHorario += '<span class="alertError" id="alertTraslapeHorarioGuardado'+ContadorHorarioGuardados+'Registro"></span>';
					cardHorario += '</form>';
				cardHorario += '</div>';	
		cardHorario += '</div>';

		$("#Horarios").append(cardHorario);

		$("#idClaseGuardado"+ContadorHorarioGuardados).val(Horarios[i].id);
		$("#DiasGuardado"+ContadorHorarioGuardados).val(Horarios[i].Dia);
		$("#AulaGuardado"+ContadorHorarioGuardados).val(Horarios[i].Aula);
		$("#HoraIGuardado"+ContadorHorarioGuardados).val(Horarios[i].HoraI.substring(0,2));
		var horaI=Horarios[i].HoraI.substring(0,2);
		var horaF=Horarios[i].HoraF.substring(0,2);
		var duracion = parseInt(horaF)-parseInt(horaI)+1;
		$("#DuracionGuardado"+ContadorHorarioGuardados).val(duracion);
		$("#ModalidadClaseGuardado"+ContadorHorarioGuardados).val(Horarios[i].ModalidadClase);
		$("#alertHorarioGuardado"+ContadorHorarioGuardados+"Registro").html('<i class="fa-regular fa-circle-check" style="color:rgb(50, 167, 65);"></i> '+$("#HoraIGuardado"+ContadorHorarioGuardados).val()+":00 - "+horaF+":59");
	}
	ContadorHorario = ContadorHorarioGuardados;
}

function añadirHorario(){
	$("#btnQuitar").prop('disabled', false);
	ContadorHorario += 1;
		var cardHorario = '<div class="Horario-form card" id="CardH'+ContadorHorario+'">';
				cardHorario += '<div data-toggle="collapse" style="cursor: pointer" data-target="#RegistroHorario'+ContadorHorario+'">';
					cardHorario += '<i class="fas fa-angle-right"></i> Nueva Clase ';
				cardHorario += '</div>';
				cardHorario += '<div id="RegistroHorario'+ContadorHorario+'" class="collapse show">'
					cardHorario += '<hr>';
					cardHorario += '<form class="form-group" action="" name="formHorarios">';
						cardHorario += '<div class="form-row">';

							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label>Día</label>';
								cardHorario += ' <select class="form-control" id="Dias'+ContadorHorario+'" name="Dia" onchange="resetalertDia()">';
									cardHorario += '<option value="Lunes">Lunes</option>';
									cardHorario += '<option value="Martes">Martes</option>';
									cardHorario += '<option value="Miércoles">Miércoles</option>';
									cardHorario += '<option value="Jueves">Jueves</option>';
									cardHorario += '<option value="Viernes">Viernes</option>';
								cardHorario += '</select>';
							cardHorario += '</div>';
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Aula</label>';
								cardHorario += '<input type="text" class="form-control" id="Aula'+ContadorHorario+'" name="Aula" oninput="$(\'#alertAula'+ContadorHorario+'Registro\').html(\'\')">';
							cardHorario += '</div>';

							cardHorario += '<span class="alertError" id="alertDia'+ContadorHorario+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertAula'+ContadorHorario+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertTraslapeAula'+ContadorHorario+'Registro"></span>';
						
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Hora de Inicio</label>';
								cardHorario += '<input type="number" onkeyup="controladorHorario(\''+ContadorHorario+'\')" oninput="$(\'#alertHoraI'+ContadorHorario+'Registro\').html(\'\'); if( this.value.length > 2 )  this.value = this.value.slice(0,2)" class="form-control" id="HoraI'+ContadorHorario+'" name="HoraI" placeholder="Ej. 07">';
								cardHorario += '<span class="alertHorario" id="alertHorario'+ContadorHorario+'Registro"></span>';
							cardHorario += '</div>';
							cardHorario += '<div class="form-group col-md-6">';
								cardHorario += '<label><span class="labelobligarotio">*</span> Duración (Hrs)</label>';
								cardHorario += '<input type="number" class="form-control" id="Duracion'+ContadorHorario+'" name="Duracion" onkeyup="controladorHorario(\''+ContadorHorario+'\')" oninput="$(\'#alertDuracion'+ContadorHorario+'Registro\').html(\'\'); if( this.value.length > 1 )  this.value = this.value.slice(0,1)">';
							cardHorario += '</div>';
							
							cardHorario += '<span class="alertError" id="alertHoraI'+ContadorHorario+'Registro"></span>';
							cardHorario += '<span class="alertError" id="alertDuracion'+ContadorHorario+'Registro"></span>';
						cardHorario += '</div>';
						cardHorario += '<div class="form-group">';
							cardHorario += '<label>Modalidad de la Clase</label>';
							cardHorario += ' <select class="form-control" id="ModalidadClase'+ContadorHorario+'" name="ModalidadClase">';
								cardHorario += '<option value="En Línea">En Línea</option>';
								cardHorario += '<option value="Presencial">Presencial</option>';
								cardHorario += '<option value="Híbrida">Híbrida</option>';
								cardHorario += '<option value="Virtual">Virtual</option>';
							cardHorario += '</select>';
						cardHorario += '</div>';
						cardHorario += '<span class="alertError" id="alertTraslapeHorario'+ContadorHorario+'Registro"></span>';
					cardHorario += '</form>';
				cardHorario += '</div>';	
		cardHorario += '</div>';
	
	$("#Horarios").append(cardHorario);
}

function quitarHorario(){
	var idDiv="#CardH"+ContadorHorario;
	$(idDiv).remove();
	ContadorHorario -= 1;
	if(ContadorHorario<=ContadorHorarioGuardados){
		$("#btnQuitar").prop('disabled', true);
	}
}

function controladorHorario(num) {
	if($("#HoraI"+num).val()!="" && $("#Duracion"+num).val()!=""){
		var HoraF = parseInt($("#HoraI"+num).val())+parseInt($("#Duracion"+num).val())-1;
		if(HoraF+1>21 || parseInt($("#HoraI"+num).val())<7 || parseInt($("#HoraI"+num).val())>21){
			$("#alertHorario"+num+"Registro").html('<i class="fa-regular fa-circle-xmark" style="color:rgb(199, 57, 57); font-size:12px;"></i> '+$("#HoraI"+num).val()+":00 - "+HoraF+":59 (no valido)");
		}else{
			$("#alertHorario"+num+"Registro").html('<i class="fa-regular fa-circle-check" style="color:rgb(50, 167, 65);"></i> '+$("#HoraI"+num).val()+":00 - "+HoraF+":59");
		}
		
	}else{
		$("#alertHorario"+num+"Registro").html("");
	}
	
}

function controladorHorarioGuardado(num) {
	if($("#HoraIGuardado"+num).val()!="" && $("#DuracionGuardado"+num).val()!=""){
		var HoraF = parseInt($("#HoraIGuardado"+num).val())+parseInt($("#DuracionGuardado"+num).val())-1;
		if(HoraF+1>21 || parseInt($("#HoraIGuardado"+num).val())<7 || parseInt($("#HoraIGuardado"+num).val())>21){
			$("#alertHorarioGuardado"+num+"Registro").html('<i class="fa-regular fa-circle-xmark" style="color:rgb(199, 57, 57); font-size:12px;"></i> '+$("#HoraIGuardado"+num).val()+":00 - "+HoraF+":59 (no valido)");
		}else{
			$("#alertHorarioGuardado"+num+"Registro").html('<i class="fa-regular fa-circle-check" style="color:rgb(50, 167, 65);"></i> '+$("#HoraIGuardado"+num).val()+":00 - "+HoraF+":59");
		}
		
	}else{
		$("#alertHorario"+num+"Registro").html("");
	}
	
}

function EliminarClase(posicion) {
	var r = confirm("¿Está seguro de eliminar este registro? \n (Se ejecutará al guardar los cambios)");
	if (r == true) {
		ArregloBorrarHorarios.push($("#idClaseGuardado" + posicion).val());
		$("#CardHGuardado" + posicion).remove();
	}
}

function EjecutarValidaciones() {
	$("#btnGuardar").prop('disabled', true);

	ValidarDatosMateria();
	ValidarHorarios();
}

function validarValidaciones() {
	if(validarContDatosMateria==0 && validarContHorarios==0 && validarContAulas==0){
		if(Bandera==true){
			ModificarEE();
			
		}else{
			
			$("#btnGuardar").prop('disabled', false);
			alert("Alguno de los campos no ha sido llenado de forma correcta.");
			Bandera = true;
		}
	}
}

function ValidarDatosMateria(){
	validarContDatosMateria = 1;
	var formDatosMateria = new FormData(document.getElementById('formModMateria'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "ValidarDatosMateriaModificar",
		data: formDatosMateria,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertEEModificar").html("");
			$("#alertNRCModificar").html("");
			$("#alertSeccionModificar").html("");
			$("#alertidProfesorModificar").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Modificar").html(mensajes);
				}
				Bandera = false;
			}

			validarContDatosMateria --;
			validarValidaciones();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/*
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
			*/
		}
	});
}

function ValidarHorarios(){

	var ArregloHorariosGuardados = document.getElementsByName('formHorariosGuardados');
	var ArregloHorarios = document.getElementsByName('formHorarios');

	validarContAulas = ArregloHorariosGuardados.length + ArregloHorarios.length;
	validarContHorarios = ArregloHorariosGuardados.length + ArregloHorarios.length;
	
	for (let i = 0; i < ArregloHorariosGuardados.length; i++) {
		ValidarHorariosGuardados(new FormData(ArregloHorariosGuardados[i]));
	}

	var aulas = document.getElementsByName('Aula');
	for (let i =  ArregloHorariosGuardados.length; i < ArregloHorariosGuardados.length + ArregloHorarios.length; i++) {
		if(aulas[i].value==""){
			$("#alertAula"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir el aula de la clase');
			Bandera = false;
			validarContAulas --;
			
			validarValidaciones();
		}else{
			validarContAulas= ArregloHorarios.length;
			var formHorario = new FormData(ArregloHorarios[i]);
			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: "ValidarTraslapeAulas",
				data: formHorario,
				type: "POST",
				contentType: false,
				processData: false,
				success: function(resultado){
					if(resultado==0){
						$("#alertTraslapeAula"+i+"Registro").html('');
					}else{
						$("#alertTraslapeAula"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Esta aula está asignada a otra EE dentro de este horario.');
						Bandera=false;
					}
					validarContAulas --;
					validarValidaciones();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					/*
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
					*/
					
				}
			});
		}
	}


	var dias = document.getElementsByName('Dia');
	var hrs = document.getElementsByName('HoraI');
	var duracion = document.getElementsByName('Duracion');
	for (var i = ArregloHorariosGuardados.length; i < dias.length; i++) {
		for (var j = 0; j < dias.length; j++) {
			if(j!=i){
				if (dias[i].value == dias[j].value) {
					$("#alertDia"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya cuenta con un horario para este día');
					Bandera = false;
				}
			}
		}

		if(hrs[i].value==""){
			$("#alertHoraI"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la hora inicial de la clase');
			Bandera = false;
		}

		var hora = parseInt(hrs[i].value);
		if(hora<7 || hora>20){
			Bandera = false;
			$("#alertHoraI"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La hora de inicio es inválida');
		}

		if (duracion[i].value=="0") {
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
			Bandera = false;
		}
		if(parseInt(hrs[i].value)+parseInt(duracion[i].value)>21){
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
			Bandera = false;
		}
		if(duracion[i].value==""){
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la duración de la clase');
			Bandera = false;
		}

		if($("#idProfesor").val()!=""){
			var ArregloformHorarios = document.getElementsByName('formHorarios');
			
			var formHorario = new FormData(ArregloformHorarios[i-ArregloHorariosGuardados.length]);
			
			formHorario.append("idProfesor", $("#idProfesor").val());
			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: "ValidarTraslapeProfesor",
				data: formHorario,
				type: "POST",
				contentType: false,
				processData: false,
				success: function(resultado){
					
					var posicion = i-1;
					if(resultado==0){
						$("#alertTraslapeHorario"+posicion+"Registro").html('');
					}else{
						$("#alertTraslapeHorario"+posicion+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya existe una EE asociada a este profesor en este horario');
						Bandera=false;
					}
					validarContHorarios --;
					
					validarValidaciones();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					/*
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
					*/
						
				}
			});
		}else{
				
			validarContHorarios --;
			validarValidaciones();
		}
	}
	
}

async function ValidarHorariosGuardados(formHorario){

	var pos = formHorario.get("Pos");
	if ($("#AulaGuardado"+pos).val()==""){
		$("#alertAulaGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir el aula de la clase');
		Bandera = false;
	}else{
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "ValidarTraslapeAulasGuardado",
			data: formHorario,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				if(resultado==0){
					$("#alertTraslapeAulaGuardado"+pos+"Registro").html('');
				}else{
					$("#alertTraslapeAulaGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Esta aula está asignada a otra EE dentro de este horario.');
					Bandera=false;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				/*
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
				*/
			}
		});
	}


	var dias = document.getElementsByName('Dia');
	for (var i = 0; i < dias.length; i++) {
		if(dias[i].id!="DiasGuardado"+pos){
			if (dias[i].value == $("#DiasGuardado"+pos).val()) {
				$("#alertDiaGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya cuenta con un horario para este día');
				Bandera = false;
			}
		}
	}



	
	if ($("#HoraIGuardado"+pos).val()==""){
		$("#alertHoraIGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la hora inicial de la clase');
		Bandera = false;
	}
	var hora = parseInt($("#HoraIGuardado"+pos).val());
	if(hora<7 || hora>20){
		Bandera = false;
		$("#alertHoraIGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> La hora de inicio es inválida');
	}

	if ($("#DuracionGuardado"+pos).val()=="0"){
		$("#alertDuracionGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
		Bandera = false;
	}

	if (parseInt($("#HoraIGuardado"+pos).val()) + parseInt($("#DuracionGuardado"+pos).val())>21){
		$("#alertDuracionGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
		Bandera = false;
	}
	if ($("#DuracionGuardado"+pos).val()==""){
		$("#alertDuracionGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la duración de la clase');
		Bandera = false;
	}

	if(Bandera==true){ 
		if($("#idProfesor").val()!=""){
			formHorario.append("idProfesor", $("#idProfesor").val());
			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: "ValidarTraslapeProfesorGuardado",
				data: formHorario,
				type: "POST",
				contentType: false,
				processData: false,
				success: function(resultado){
					if(resultado==0){
						$("#alertTraslapeHorarioGuardado"+pos+"Registro").html('');
					}else{
						$("#alertTraslapeHorarioGuardado"+pos+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya existe una EE asociada a este profesor en este horario');
						Bandera=false;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					/*
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
					*/
				}
			});
		}
	}
	
	validarContHorarios --;
	validarContAulas --;
	
	validarValidaciones();
}


function ModificarEE() {
	var formEE = new FormData(document.getElementById('formModMateria'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "ModificarDatosMateria",
		data: formEE,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(idRegistro){
			ModificarHorarios(idRegistro);
			alert("Experiencia Educativa Modificada");
			location.reload();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/*
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
			*/
		}
	});
	
}

function ModificarHorarios(idRegistro) {
	RegistrarHorarios(idRegistro);
	GuardarCambiosHorarios();
	EliminarHorarios();
}

function RegistrarHorarios(idRegistro) {
	var arregloHorarios = document.getElementsByName('formHorarios');
	for (let i = 0; i < arregloHorarios.length; i++) {
		var formHorario = new FormData(arregloHorarios[i]);
		formHorario.append("idMateria", idRegistro);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "RegistrarDatosHorario",
			data: formHorario,
			type: "POST",
			contentType: false,
			processData: false,
			success: function(resultado){
				//console.log(resultado);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				/*
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
				*/
			}
		});
	}		
}

function GuardarCambiosHorarios(){
	var arregloHorarios = document.getElementsByName('formHorariosGuardados');
	for (let i = 0; i < arregloHorarios.length; i++) {
		var formHorario = new FormData(arregloHorarios[i]);
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "ModificarDatosHorario",
			data: formHorario,
			type: "POST",
			contentType: false,
			processData: false,
			success: function (resultado) {

			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				/*
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
				*/
			}
		});
	}
}

function EliminarHorarios(){
	if (ArregloBorrarHorarios.length != 0) {
		$.ajax({
			headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
			url: "EliminarHorarios",
			data: { "Ids": ArregloBorrarHorarios },
			type: "POST",
			success: function (resultado) {
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				/*
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
				*/
			}
		});
	}
}

function resetalertDia(){
	var dias = document.getElementsByName('Dia');
	for (let i = 0; i < dias.length; i++) {
		$("#alertDia"+i+"Registro").html("");
	}
}

function resetalertDiaGuardado(){
	var dias = document.getElementsByName('Dia');
	for (let i = 0; i < dias.length; i++) {
		$("#alertDiaGuardado"+i+"Registro").html("");
	}
}