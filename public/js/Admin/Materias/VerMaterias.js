var configTable = {
	"pagingType": "simple_numbers",
	"searching": false,
	"lengthChange": false,
	"pageLength": 10,
	"language": {
		"decimal": "",
		"emptyTable": "No hay información",
		"info": "Mostrando _START_ a _END_ de _TOTAL_ resultados",
		"infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
		"infoFiltered": "(Filtrado de _MAX_ total entradas)",
		"infoPostFix": "",
		"thousands": ",",
		"lengthMenu": "Mostrar _MENU_ Entradas",
		"loadingRecords": "Cargando...",
		"processing": "Procesando...",
		"search": "Buscar:",
		"zeroRecords": "Sin resultados encontrados",
		"paginate": {
			"first": "Primero",
			"last": "Ultimo",
			"next": "Siguiente",
			"previous": "Anterior"
		}
	},
    "order": [[ 3, "asc" ],[ 5, "asc" ],[ 6, "asc" ]]
};

window.onload = function() {
	initializeVerMateria();
    $('#loader').fadeOut("fast");
};

function initializeVerMateria() {
	$('#User').html(info['NombreFacultad']);
    setMaterias();
    $('#MateriaTabla').DataTable(configTable);
    var progEd = info['ProgEd'];

    for (let i = 0; i < progEd.length; i++) {
        $("#Mostrar").append(new Option(progEd[i].NombreCarrera, progEd[i].idCarrera));
    }
}

function setMaterias() {
    var Materias = info["Materias"];
    var tabla="";
    for (let i = 0; i< Materias.length; i++) {
        tabla = tabla + '<tr style="cursor:pointer">';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NRC + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreEE.toUpperCase() + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreFull.toUpperCase() + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ProgEducSiglas + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ModalidadEE + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Bloque + '</td>';
            tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Seccion + '</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center;">';
                tabla = tabla + '<button type="button" class="btn btn-primary btn-xs" onclick="ModificarMateria(\''+Materias[i].idMateria+'\')">Modificar</button>';
                tabla = tabla + '<button type="button" class="btn btn-danger btn-xs btn-right" onclick="EliminarMateria(\''+Materias[i].idMateria+'\')">Eliminar</button>';
            tabla = tabla + '</td>';
        tabla = tabla + '</tr>';
    }
    document.getElementById('tablaMaterias').innerHTML=tabla;
}

function FiltradoMaterias() {
    var mostrar = $('#Mostrar').val();

	var parametros = {
		"mostrar" : mostrar
	};
    
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Materias/FiltrarMaterias',
		data: parametros,
		type: "POST",
		success: function(resultado){
			$('#MateriaTabla').DataTable().clear().destroy();
            var Materias = resultado["Materias"];

            for (let i = 0; i < Materias.length; i++) {
                Materias[i].NombreFull = Materias[i].Nombre+" "+Materias[i].Apellido_P+" "+Materias[i].Apellido_M;
                delete Materias[i].Nombre;
                delete Materias[i].Apellido_P;
                delete Materias[i].Apellido_M;
            }

			var tabla="";
			for (let i = 0; i < Materias.length; i++) {
				tabla = tabla + '<tr style="cursor:pointer">';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NRC + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreEE.toUpperCase() + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreFull.toUpperCase() + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ProgEducSiglas + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ModalidadEE + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Bloque + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Seccion + '</td>';
                    tabla = tabla + '<td style="vertical-align:middle; text-align:center;">';
                        tabla = tabla + '<button type="button" class="btn btn-primary btn-xs" onclick="ModificarMateria(\''+Materias[i].idMateria+'\')">Modificar</button>';
                        tabla = tabla + '<button type="button" class="btn btn-danger btn-xs btn-right" onclick="EliminarMateria(\''+Materias[i].idMateria+'\')">Eliminar</button>';
                    tabla = tabla + '</td>';
                tabla = tabla + '</tr>';
			}
			document.getElementById('tablaMaterias').innerHTML=tabla;
			$('#MateriaTabla').DataTable(configTable);
			
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

function BusquedaMateria() {
	var form = new FormData(document.getElementById("formBusqueda"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Materias/BusquedaMateria',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
			$('#MateriaTabla').DataTable().clear().destroy();
            var Materias = resultado["Materias"];

            for (let i = 0; i < Materias.length; i++) {
                Materias[i].NombreFull = Materias[i].Nombre+" "+Materias[i].Apellido_P+" "+Materias[i].Apellido_M;
                delete Materias[i].Nombre;
                delete Materias[i].Apellido_P;
                delete Materias[i].Apellido_M;
            }

			var tabla="";
			for (let i = 0; i < Materias.length; i++) {
				tabla = tabla + '<tr style="cursor:pointer">';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NRC + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreEE.toUpperCase() + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].NombreFull.toUpperCase() + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ProgEducSiglas + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].ModalidadEE + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Bloque + '</td>';
                    tabla = tabla + '<td onclick=\'verMateria('+Materias[i].idMateria+')\' data-toggle="modal" data-target="#verDatos" title="Ver Registro" style="vertical-align:middle; text-align:center;">' + Materias[i].Seccion + '</td>';
                    tabla = tabla + '<td style="vertical-align:middle; text-align:center;">';
                        tabla = tabla + '<button type="button" class="btn btn-primary btn-xs" onclick="ModificarMateria(\''+Materias[i].idMateria+'\')">Modificar</button>';
                        tabla = tabla + '<button type="button" class="btn btn-danger btn-xs btn-right" onclick="EliminarMateria(\''+Materias[i].idMateria+'\')">Eliminar</button>';
                    tabla = tabla + '</td>';
                tabla = tabla + '</tr>';
			}
			document.getElementById('tablaMaterias').innerHTML=tabla;
			$('#MateriaTabla').DataTable(configTable);
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

function verMateria(idmateria) {
    var parametros = {
		"idMateria" : idmateria
	};
    
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Materias/InfoMateria',
		data: parametros,
		type: "POST",
		success: function(resultado){
			var Materia = resultado['Materia'][0];
			$('#NombreEE').html(Materia.NombreEE);
			$('#NRC').html(Materia.NRC);
			$('#BloqSecc').html("Bloque "+Materia.Bloque + ", Sección "+Materia.Seccion);
			$('#ProgEd').html(Materia.NombreCarrera+ " (" + Materia.ProgEducSiglas + ")");
			$('#ModalidadEE').html(Materia.ModalidadEE);
			$('#Periodo').html(Materia.Periodo);
			$('#Profesor').html(Materia.Nombre+" "+Materia.Apellido_P+" "+Materia.Apellido_M);

			var Horarios = resultado['Horario'];
			var clases="";
			
			clases = clases + '<div class="col-md-2">';
				clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:10px !important; "><b>Día</b></p>';
				for (let i = 0; i < Horarios.length; i++) {
					clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:15px !important;">'+Horarios[i].Dia+'</p>';
				}
			clases = clases + '</div>';
			clases = clases + '<div class="col-md-4">';
				clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:10px !important;"><b>Horario</b></p>';
				for (let i = 0; i < Horarios.length; i++) {
					clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:15px !important;">'+Horarios[i].HoraI+' - '+Horarios[i].HoraF+'</p>';
				}
			clases = clases + '</div>';
			clases = clases + '<div class="col-md-2">';
				clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:10px !important;"><b>Aula</b></p>';
				for (let i = 0; i < Horarios.length; i++) {
					clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:15px !important;">'+Horarios[i].Aula+'</p>';
				}
			clases = clases + '</div>';
			clases = clases + '<div class="col-md-4">';
				clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:10px !important;"><b>Modalidad (Clase)</b></p>';
				for (let i = 0; i < Horarios.length; i++) {
					clases = clases + '<p style="font-size:16px; text-align: center; margin-bottom:15px !important;">'+Horarios[i].ModalidadClase+'</p>';
				}
			clases = clases + '</div>';
			
			document.getElementById('Horarios').innerHTML=clases;
			document.getElementById('btnModificar').innerHTML='<button type="button" class="btn btn-primary btn-sm" onclick="ModificarMateria(\''+Materia.idMateria+'\')">Modificar</button>';
			document.getElementById('btnEliminar').innerHTML='<button type="button" class="btn btn-danger btn-sm btn-right" onclick="EliminarMateria(\''+Materia.idMateria+'\')">Eliminar</button>';;

			$('#verDatos').modal('show');
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

function EliminarMateria(idMateria){
	var parametros = {
		"idMateria" : idMateria
	};
    var opcion = confirm("¿Desea eliminar este registro?");
    if (opcion == true) {
        $.ajax({
            headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
            url: 'Materias/EliminarMateria',
            data: parametros,
			type: "POST",
			success: function(resultado){   
                FiltradoMaterias();         
                $('#verDatos').modal('hide');
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

function ModificarMateria(idMateria) {
	var parametros = {
		"idMateria" : idMateria
	};
    $.ajax({
        headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
        url: 'Materias/idMateriaSession',
        data: parametros,
		type: "POST",
		success: function(){  
            document.location.replace("Materias/ModificarMateria")
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