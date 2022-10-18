
var ContadorHorario = -1;

var validarContDatosMateria = 0;
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
	if(ContadorHorario<0){
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

function EjecutarValidaciones() {
	$("#btnRegistrar").prop('disabled', true);

	ValidarDatosMateria();
	ValidarHorarios();
}

function validarValidaciones() {
	if(validarContDatosMateria==0 && validarContHorarios==0 && validarContAulas==0){
		if(Bandera==true){
			RegistrarEE();
		}else{
			$("#btnRegistrar").prop('disabled', false);
			alert("Alguno de los campos no ha sido llenado de forma correcta.");
			Bandera = true;
		}
	}
}

function ValidarDatosMateria(){
	validarContDatosMateria = 1;
	var formDatosMateria = new FormData(document.getElementById('formRegMateria'));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "ValidarDatosMateria",
		data: formDatosMateria,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(resultado){
			$("#alertEERegistro").html("");
			$("#alertNRCRegistro").html("");
			$("#alertSeccionRegistro").html("");
			$("#alertidProfesorRegistro").html("");
			
			if(resultado!=true){
				for (const atributo in resultado) {
					var mensajes="";
					for (let i = 0; i < resultado[atributo].length; i++) {
						mensajes = mensajes + '<i class="fas fa-exclamation-circle"></i> '+resultado[atributo][i];
						if(resultado[atributo].length-i!=1){
							mensajes = mensajes + "<br>"
						}
					}
					$("#alert"+atributo+"Registro").html(mensajes);
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

	var ArregloformHorarios = document.getElementsByName('formHorarios');
	
	var aulas = document.getElementsByName('Aula');
	validarContAulas= ArregloformHorarios.length;
	for (let i = 0; i < aulas.length; i++) {
		if(aulas[i].value==""){
			$("#alertAula"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir el aula de la clase');
			Bandera = false;
			validarContAulas --;
		}else{
			var formHorario = new FormData(ArregloformHorarios[i]);
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
	for (var i = 0; i < dias.length; i++) {
		for (var j = 0; j < dias.length; j++) {
			if(j!=i){
				if (dias[i].value == dias[j].value) {
					$("#alertDia"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya cuenta con un horario para este día');
					Bandera = false;
				}
			}
		}
	}
	
	var hrs = document.getElementsByName('HoraI');
	for (let i = 0; i < hrs.length; i++) {
		if(hrs[i].value==""){
			$("#alertHoraI"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la hora inicial de la clase');
			Bandera = false;
		}
	}
	for (let i = 0; i < hrs.length; i++) {
		var hora = parseInt(hrs[i].value);
		if(hora<7 || hora>20){
			Bandera = false;
			$("#alertHoraI"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La hora de inicio es inválida');
		}
	}

	var duracion = document.getElementsByName('Duracion');
	for (let i = 0; i < duracion.length; i++) {
		if (duracion[i].value=="0") {
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
			Bandera = false;
		}
		if(parseInt(hrs[i].value)+parseInt(duracion[i].value)>21){
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> La duración establecida es inválida');
			Bandera = false;
		}
	}
	for (let i = 0; i < duracion.length; i++) {
		if(duracion[i].value==""){
			$("#alertDuracion"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Es necesario definir la duración de la clase');
			Bandera = false;
		}
	}

	if(Bandera==true){
		if($("#idProfesor").val()==""){
			validarContHorarios =0;
			validarValidaciones();
		}else{
			var ArregloformHorarios = document.getElementsByName('formHorarios');
			validarContHorarios= ArregloformHorarios.length;
	
			for (let i = 0; i < ArregloformHorarios.length; i++) {
				var formHorario = new FormData(ArregloformHorarios[i]);
				formHorario.append("idProfesor", $("#idProfesor").val());
				$.ajax({
					headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
					url: "ValidarTraslapeProfesor",
					data: formHorario,
					type: "POST",
					contentType: false,
					processData: false,
					success: function(resultado){
						if(resultado==0){
							$("#alertTraslapeHorario"+i+"Registro").html('');
						}else{
							$("#alertTraslapeHorario"+i+"Registro").html('<i class="fas fa-exclamation-circle"></i> Ya existe una EE asociada a este profesor en este horario');
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
			}
		}
	}else{
		validarContHorarios =0;
		validarValidaciones();
	}
}

function RegistrarEE() {
	var formEE = new FormData(document.getElementById('formRegMateria'));
	
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: "RegistrarDatosMateria",
		data: formEE,
		type: "POST",
		contentType: false,
		processData: false,
		success: function(idRegistro){
			RegistrarHorarios(idRegistro);
			alert("Experiencia Educativa Registrada");
			document.getElementById('formRegMateria').reset();
			$("#Horarios").html("");var ContadorHorario = -1;

			validarContDatosMateria = 0;
			validarContHorarios = 0;
			validarContAulas = 0;
			
			Bandera = true;
			
			$("#btnRegistrar").prop('disabled', false);

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
function resetalertDia(){
	var arregloHorarios = document.getElementsByName('formHorarios');
	for (let i = 0; i < arregloHorarios.length; i++) {
		$("#alertDia"+i+"Registro").html("");
	}
}