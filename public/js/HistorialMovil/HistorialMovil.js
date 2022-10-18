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
    "order": [[ 2, "desc" ]],
    "columnDefs": [
        { "orderData": 2, "targets": 1 },
        {
            "targets": [ 2 ],
            "visible": false
        }
      ]
};

var MateriasyHorarios="";
var nDayGlobalMod="";
var DiaSeleccionado="";

window.onload = function() {
	initializeLogin();
    $('#loader').fadeOut("fast");
};

function initializeLogin() {
    $('#User').html(informacion['Nombre']);
    VerificarResolucion();
    ObtenerMateriasPorProfesor();
    setHistorial();
    $('#tablaHistorial').DataTable(configTable);
    document.getElementById("TemasMod").focus();
}

function VerificarResolucion(){
    if (screen.width > 400) {
        location.ref="/Inicio";
    }
}

function setHistorial(){
    var mes = ["xd", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    informacion = informacion['Historial'];
    var tabla="";
    for (let i = 0; i < informacion.length; i++) {
        var fech = informacion[i].Fecha.split("-");
        var nummes = parseInt(fech[1]);
        tabla = tabla + '<tr onclick=\'verAsistencia('+JSON.stringify(informacion[i])+')\' data-toggle="modal" data-target="#verDatos" title="Modificar" style="cursor:pointer">';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 240px; width:240px">' +informacion[i].NombreEE+" (Blq "+informacion[i].Bloque+" - Sec "+informacion[i].Seccion+" - "+informacion[i].ProgEducativo+')</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 110px; width:110px">' + informacion[i].Dia.substr(0,3)+', '+mes[nummes]+" "+fech[2]+", "+fech[0] + '</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 110px; width:110px">' + informacion[i].Fecha + '</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + informacion[i].HoraI+" - "+ informacion[i].HoraF +'</td>';
        tabla = tabla + '</tr>';
    }
    document.getElementById('bodyHistorial').innerHTML=tabla;
    
    
    
}

function refreshHistorial(){
    $.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Asistencia/RefreshHistorial',
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
            informacion = resultado;
            $('#tablaHistorial').DataTable().clear().destroy();
            setHistorial();
            $('#tablaHistorial').DataTable(configTable);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/*
            console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
            */
            location.reload();
		}
	});
}

function ObtenerMateriasPorProfesor(){
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Materias/MateriasByProfe',
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){
            MateriasyHorarios = resultado;
            resultado = resultado['Materias'];
            for(var i = 0; i < resultado.length; i++){
				$("#EEMod").append(new Option(resultado[i].NombreEE+" (Blq "+resultado[i].Bloque+" - Sec "+resultado[i].Seccion+" - "+resultado[i].ProgEducativo+")", resultado[i].id));
            }
            /*var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
            var hoy = new Date();
            nombreDia = dias[hoy.getDay()];
            
            var Horarios = MateriasyHorarios['Horarios'];
            var MateriasDelDía=Horarios.filter(function (horario) { return horario.Dia == nombreDia; });
            
            var hora = hoy.getHours();

            var DatosAutomaticos="";

            for (let i = 0; i < MateriasDelDía.length; i++) {

                h = MateriasDelDía[i].HoraI.split(":")[0];
		        h = parseInt(h);

                if(Hora<h){
                    console.log("HoraPC: "+Hora);
                    console.log("HoraClase: "+h);
                    DatosAutomaticos=MateriasDelDía[i];
                    i=MateriasDelDía.length;
                }
                
            }
            if(DatosAutomaticos!=""){
                setAutofields(DatosAutomaticos);
            }else{
                ControladorDatePicker()
            }*/
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/*
            console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
            */
            location.reload();
		}
	});
}

function TemasController(){
    $('#alertTemasModRegistro').html("");
}


function verAsistencia(asistencia){

	$('#EEMod').val(asistencia.NombreEE);
    $('#FechaMod').val(asistencia.Fecha);
    $('#HoraMod').val(asistencia.HoraI+" - "+asistencia.HoraF);
    $('#ModalidadMod').val(asistencia.Modalidad);
    $("#divModalidadEEMod").html("*Modalidad de EE: "+asistencia.ModalidadEE+"*");

    $('#AulaMod').val(asistencia.Aula);
    $('#PlataformaMod').val(asistencia.Plataforma);

    if(asistencia.Modalidad=="Presencial"){
        $("#divAulaInfo").css("display", "block");
        $("#divPlataformainfo").css("display", "none");
    }else{
        $("#divAulaInfo").css("display", "none");
        $("#divPlataformainfo").css("display", "block");
    }
    $('#TemasMod').val(asistencia.Temas);
    $('#idRegistro').val(asistencia.id);

    $('#verDatos').modal('show');
}

function validarModAsistencia(){
    var form = new FormData(document.getElementById("formModAsis"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Asistencia/ValidarModAsistencia',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){    
            $('#alertTemasModRegistro').html("");
            if(resultado==1){
                refreshHistorial();         
                alert("Asistencia Modificada");
                $('#verDatos').modal('hide');
                if (screen.width < 400) {
                    location.reload();
                }
            }else{
                $('#alertTemasModRegistro').html("<i class='fas fa-exclamation-circle'></i> Es necesario describir los temas vistos en esta clase.");
            }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
            /*
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
            */
            //location.reload();
		}
	});
}

/*
function ControladorDatePickerMod(){
    $("#HoraMod").val("");
    $("#FechaMod").val("");
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
    var nDay=[0, 1, 2, 3, 4, 5, 6]
    var Horarios = MateriasyHorarios['Horarios'];
    var materia = $("#EEMod").val();
    var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
    
    for (let i = 0; i < horario.length; i++) {
        var index = dias.indexOf( horario[i].Dia);
 
        if ( index !== -1 ) {
            nDay.splice( index, 1 );
            dias.splice( index, 1 );
        }
    }

    nDayGlobalMod = nDay;

    setDatePickerMod(0, null);

}

function setDatePickerMod(valor, Fecha){

    $( function() {
        $("#FechaMod").datepicker({
            beforeShowDay: noExcursionMod,
            maxDate: new Date(),
            dayNames: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
            dayNamesMin: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
            monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
            dateFormat: "yy-mm-dd",
            onSelect: function(){
                var seldate = $(this).datepicker('getDate');
                seldate = seldate.toDateString();
                seldate = seldate.split(' ');
                var weekday=new Array();
                    weekday['Mon']="Lunes";
                    weekday['Tue']="Martes";
                    weekday['Wed']="Miércoles";
                    weekday['Thu']="Jueves";
                    weekday['Fri']="Viernes";
                    weekday['Sat']="Sábado";
                    weekday['Sun']="Domingo";
                var dayOfWeek = weekday[seldate[0]];
                DiaSeleccionado = dayOfWeek;
                console.log(DiaSeleccionado);
                var Horarios = MateriasyHorarios['Horarios'];
                var materia = $("#EEMod").val();
                var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
                horaClase = horario.filter(function (horaClase) { return horaClase.Dia == DiaSeleccionado; });
                $("#HoraMod").val(horaClase[0].HoraI+" - "+horaClase[0].HoraF);
                $("#AulaMod").val(horaClase[0].Aula);
                $("#DiaMod").val(DiaSeleccionado);
                console.log(horaClase);
            }
        });
        if(valor==1){
            
            $('#FechaMod').datepicker('setDate', Fecha);
        }
    });

}

function noExcursionMod(date){
    var day = date.getDay();

    var aux="(";
    for (let i = 0; i < nDayGlobalMod.length; i++) {
        if(i+1==nDayGlobalMod.length){
            aux=aux+"day != "+nDayGlobalMod[i]+")";
        }else{
            aux=aux+"day != "+nDayGlobalMod[i]+" && ";
        }
    }
    return [eval(aux),''];
    // aqui indicamos el numero correspondiente a los dias que ha de bloquearse (el 0 es Domingo, 1 Lunes, etc...) en el ejemplo bloqueo todos menos los lunes y jueves.
    
};
*/
function ModalidadControllerMod(){
    var valor = document.getElementById("ModalidadMod").value;
    
    if(valor=="Presencial"){
        $("#divAulaInfo").css("display", "block");
        $("#divPlataformainfo").css("display", "none");
    }else{
        $("#divAulaInfo").css("display", "none");
        $("#divPlataformainfo").css("display", "block");
    }
}



function GuardarCambios(){
    var form = new FormData(document.getElementById("formModAsis"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Asistencia/ModificarAsistencia',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){    
            refreshHistorial();         
            alert("Asistencia Modificada");
            $('#verDatos').modal('hide');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/*
            console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
            */
            location.reload();
		}
	});
}

function EliminarRegistro(){
    var opcion = confirm("¿Desea eliminar este registro?");
    if (opcion == true) {
        var form = new FormData(document.getElementById("formModAsis"));
        $.ajax({
            headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
            url: 'Asistencia/EliminarAsistencia',
            data: form,
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            success: function(resultado){    
                refreshHistorial();         
                alert("Registro Eliminado");
                $('#verDatos').modal('hide');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                /*
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                */
                location.reload();
            }
        });
	} 
}

function CerrarModal(){
    $('#verDatos').modal('hide');
}
