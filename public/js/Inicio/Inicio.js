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
var nDayGlobal="";
var nDayGlobalMod="";
var DiaSeleccionado="";

var contenidoWeb="";
var contenidoMovil="";

window.onload = function() {
	initializeInicio();
    $('#loader').delay(500).fadeOut("fast");
};

function initializeInicio() {
    window.onhashchange = function() {
        location.reload();
       }
    $('#User').html(informacion['Nombre']);
    ObtenerMateriasPorProfesor();
    setHistorial();
    AjusteResolucion();
    $('#tablaHistorial').DataTable(configTable);
    document.getElementById("Temas").focus();
    document.getElementById("TemasMod").focus();
}

function AjusteResolucion(){
    contenidoMovil = $("#movil").html();
    contenidoWeb = $("#web").html();
    $("#movil").html("");
    if (screen.width < 440) {
        $("#divContenedorMovil").css("top", "35%");
        contenidoWeb=$("#web").html();
        $("#web").html("");

        $("#movil").html(contenidoMovil);
        
        $("#web").css("display", "none");
        $("#movil").css("display", "block");
    }else{
        contenidoMovil = $("#movil").html();
        $("#movil").html("");
        $("#web").html(contenidoWeb);

        $("#web").css("display", "block");
        $("#movil").css("display", "none");
    }
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
				$("#EE").append(new Option(resultado[i].NombreEE.toUpperCase()+" (Blq "+resultado[i].Bloque+" - Sec "+resultado[i].Seccion+" - "+resultado[i].ProgEducativo+")", resultado[i].id));
                //$("#EEMod").append(new Option(resultado[i].NombreEE+" (Blq "+resultado[i].Bloque+" - Sec "+resultado[i].Seccion+" - "+resultado[i].ProgEducativo+")", resultado[i].id));
            }
            var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
            var hoy = new Date();
            nombreDia = dias[hoy.getDay()];
            
            var Horarios = MateriasyHorarios['Horarios'];
            var MateriasDelDía=Horarios.filter(function (horario) { return horario.Dia == nombreDia; });
            
            var hora = hoy.getHours();
            var minutos = hoy.getMinutes();

            var DatosAutomaticos="";

            for (let i = 0; i < MateriasDelDía.length; i++) {

                h = MateriasDelDía[i].HoraF.split(":")[0];
		        h = parseInt(h);

                if(hora<=h){
                    if(minutos<59){
                        DatosAutomaticos=MateriasDelDía[i];
                        i=MateriasDelDía.length;
                    }
                }
                
            }
            if(DatosAutomaticos!=""){
                setAutofields(DatosAutomaticos);
            }else{
                ControladorDatePicker();
            }
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

function setAutofields(DatosAutomaticos){
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
    var nDay=[0, 1, 2, 3, 4, 5, 6]
    var Horarios = MateriasyHorarios['Horarios'];
    var Materias = MateriasyHorarios['Materias'];
    $("#EE").val(DatosAutomaticos.Materia);
    $("#Hora").val(DatosAutomaticos.HoraI.substring(0, DatosAutomaticos.HoraI.length - 3)+" - "+DatosAutomaticos.HoraF.substring(0, DatosAutomaticos.HoraF.length - 3));
    $("#Modalidad").val(DatosAutomaticos.ModalidadClase);
    $("#Dia").val(DatosAutomaticos.Dia);
    $("#Aula").val(DatosAutomaticos.Aula);
    var materia = $("#EE").val();
    var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
    var modalidadEE = Materias.filter(function (materia) { return materia.id == DatosAutomaticos.Materia; });


    $("#divModalidadEE").html("*Modalidad de EE: "+modalidadEE[0].ModalidadEE+"*");
    $("#Periodo").val(modalidadEE[0].Periodo);
    
    for (let i = 0; i < horario.length; i++) {
        var index = dias.indexOf( horario[i].Dia);
 
        if ( index !== -1 ) {
            nDay.splice( index, 1 );
            dias.splice( index, 1 );
        }
    }

    nDayGlobal = nDay;

    setDatePicker(1);
}



function ControladorDatePicker(){
    
    $('#alertDuplicadosRegistro').html("");
    
    $("#Temas").val("");

    $("#Hora").val("");
    $("#Fecha").val("");
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
    var nDay=[0, 1, 2, 3, 4, 5, 6]
    var Horarios = MateriasyHorarios['Horarios'];
    var Materias = MateriasyHorarios['Materias'];
    var materia = $("#EE").val();
    var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
    var modalidadEE = Materias.filter(function (mtria) { return mtria.id == materia; });
    
    $("#divModalidadEE").html("*Modalidad de EE: "+modalidadEE[0].ModalidadEE+"*");
    $("#Periodo").val(modalidadEE[0].Periodo);

    for (let i = 0; i < horario.length; i++) {
        var index = dias.indexOf( horario[i].Dia);
 
        if ( index !== -1 ) {
            nDay.splice( index, 1 );
            dias.splice( index, 1 );
        }
    }

    nDayGlobal = nDay;

    setDatePicker(0);

}

function ControladorDatePickerMod(){
    $("#HoraMod").val("");
    $("#FechaMod").val("");
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
    var nDay=[0, 1, 2, 3, 4, 5, 6]
    var Horarios = MateriasyHorarios['Horarios'];
    var Materias = MateriasyHorarios['Materias'];
    var materia = $("#EEMod").val();
    var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
    var modalidadEE = Materias.filter(function (materia) { return materia.id == materia; });
    modalidadEE =  modalidadEE.ModalidadEE;
    
    $("#divModalidadEEMod").html("*Modalidad de EE: "+modalidadEE+"*");

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

function setDatePicker(valor){

    $( function() {
        $("#Fecha").datepicker({
            beforeShowDay: noExcursion,
            maxDate: new Date(),
            dayNames: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
            dayNamesMin: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
            monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
            dateFormat: "yy-mm-dd",
            onSelect: function(){
                
                $('#alertDuplicadosRegistro').html("");
                $('#alertFechaRegistro').html("");
                $("#Temas").val("");
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
                var Horarios = MateriasyHorarios['Horarios'];
                var materia = $("#EE").val();
                var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
                horaClase = horario.filter(function (horaClase) { return horaClase.Dia == DiaSeleccionado; });
                $("#Hora").val(horaClase[0].HoraI.substring(0, horaClase[0].HoraI.length - 3)+" - "+horaClase[0].HoraF.substring(0, horaClase[0].HoraF.length - 3));
                $("#Aula").val(horaClase[0].Aula);
                $("#Dia").val(DiaSeleccionado);
            }
        });
        if(valor==1){
            
            $('#Fecha').datepicker('setDate', new Date());
        }
    });

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
                var Horarios = MateriasyHorarios['Horarios'];
                var materia = $("#EEMod").val();
                var horario = Horarios.filter(function (horario) { return horario.Materia == materia; });
                horaClase = horario.filter(function (horaClase) { return horaClase.Dia == DiaSeleccionado; });
                $("#HoraMod").val(horaClase[0].HoraI.substring(0, horaClase[0].HoraI.length - 3)+" - "+horaClase[0].HoraF.substring(0, horaClase[0].HoraF.length - 3));
                $("#AulaMod").val(horaClase[0].Aula);
                $("#DiaMod").val(DiaSeleccionado);
            }
        });
        if(valor==1){
            
            $('#FechaMod').datepicker('setDate', Fecha);
        }
    });

}

function noExcursion(date){
    var day = date.getDay();
    var aux="(";
    for (let i = 0; i < nDayGlobal.length; i++) {
        if(i+1==nDayGlobal.length){
            aux=aux+"day != "+nDayGlobal[i]+")";
        }else{
            aux=aux+"day != "+nDayGlobal[i]+" && ";
        }
    }//eval(aux),
    var holydays = ["2022-02-07", "2022-02-22", "2022-02-28", "2022-03-01", "2022-03-18", "2022-03-21", "2022-05-01", "2022-05-15", "2022-09-16", "2022-11-01", "2022-11-02", "2022-11-21"];
    var string = jQuery.datepicker.formatDate('yy-mm-dd', date);

    if(eval(aux)==true){
        if(holydays.indexOf(string) == -1){
            return [eval(aux), ""];
        }else{
            return holydays.indexOf(string) == -1;
        }
    }else{
        return [eval(aux), ""];
    }
    //return ["22-02-07", "22-02-28", "22-03-01", "22-03-18"];
    // aqui indicamos el numero correspondiente a los dias que ha de bloquearse (el 0 es Domingo, 1 Lunes, etc...) en el ejemplo bloqueo todos menos los lunes y jueves.
    
};


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

function ModalidadController(){
    var valor = document.getElementById("Modalidad").value;
    
    if(valor=="Presencial"){
        $("#divAula").css("display", "block");
        $("#divPlataforma").css("display", "none");
    }else{
        $("#divAula").css("display", "none");
        $("#divPlataforma").css("display", "block");
    }
}

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

function TemasController(){
    $('#alertTemasRegistro').html("");
    $('#alertTemasModRegistro').html("");
}

function validarAsistencia(){
    var form = new FormData(document.getElementById("formRegAsis"));
	$.ajax({
		headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
		url: 'Asistencia/ValidarAsistencia',
		data: form,
		type: "POST",
		cache: false,
		contentType: false,
		processData: false,
		success: function(resultado){    
            $('#alertDuplicadosRegistro').html("");
            $('#alertFechaRegistro').html("");
            $('#alertTemasRegistro').html("");
            if(resultado==""){
                document.getElementById('formRegAsis').reset();
                refreshHistorial();         
                alert("Asistencia Registrada");
                if (screen.width < 400) {
                    location.reload();
                }
            }else{
                for (let i = 0; i < resultado.length; i++) {
                    switch (resultado[i]) {
                        case "Duplicados":
                            $('#alertDuplicadosRegistro').html("<i class='fas fa-exclamation-circle'></i> Ya existe una asistencia para esta EE con misma fecha y horario.");
                            break;
                        case "Fecha":
                            $('#alertFechaRegistro').html("<i class='fas fa-exclamation-circle'></i> Es necesario seleccionar una fecha valida.");
                            break;
                        default:
                            $('#alertTemasRegistro').html("<i class='fas fa-exclamation-circle'></i> Es necesario describir los temas vistos en esta clase.");
                            break;
                    }
                }
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
            document.getElementById('formRegAsis').reset();
            $('#alertTemasModRegistro').html("");
            $('#alertDuplicadosRegistro').html("");
            $('#alertFechaRegistro').html("");
            if(resultado==1){
                refreshHistorial();         
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
		}
	});
}

function setHistorial(){
    var mes = ["xd", "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    var inf = informacion['Historial'];
    var tabla="";
    for (let i = 0; i < inf.length; i++) {
        var fech = inf[i].Fecha.split("-");
        var nummes = parseInt(fech[1]);
        tabla = tabla + '<tr onclick=\'verAsistencia('+JSON.stringify(inf[i])+')\' data-toggle="modal" data-target="#verDatos" title="Modificar" style="cursor:pointer">';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 240px; width:240px">' +inf[i].NombreEE.toUpperCase()+" (Blq "+inf[i].Bloque+" - Sec "+inf[i].Seccion+" - "+inf[i].ProgEducativo+')</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 110px; width:110px">' + inf[i].Dia.substr(0,3)+', '+mes[nummes]+" "+fech[2]+", "+fech[0] + '</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 110px; width:110px">' + inf[i].Fecha + '</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center">' + inf[i].HoraI.substring(0, inf[i].HoraI.length - 3)+" - "+ inf[i].HoraF.substring(0, inf[i].HoraF.length - 3) +'</td>';
            tabla = tabla + '<td style="vertical-align:middle; text-align:center; max-width: 80px; width:80px">' + inf[i].Modalidad + '</td>';
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

function verAsistencia(asistencia){
	$('#EEMod').val(asistencia.NombreEE.toUpperCase()+"(Blq "+asistencia.Bloque+" - Sec "+asistencia.Seccion+" - "+asistencia.ProgEducativo+")");
    $('#FechaMod').val(asistencia.Fecha);
    $('#HoraMod').val(asistencia.HoraI.substring(0, asistencia.HoraI.length - 3)+" - "+asistencia.HoraF.substring(0, asistencia.HoraF.length - 3));
    $('#ModalidadMod').val(asistencia.Modalidad);
    $("#divModalidadEEMod").html("*Modalidad de EE: "+asistencia.ModalidadEE+"*");
    
    $('#PlataformaMod').val(asistencia.Plataforma);
    $('#AulaMod').val(asistencia.Aula);

    if(asistencia.Modalidad=="Presencial"){
        $("#divAulaInfo").css("display", "block");
        $("#divPlataformainfo").css("display", "none");
    }else{
        $("#divAulaInfo").css("display", "none");
        $("#divPlataformainfo").css("display", "block");
    }
    $('#TemasMod').val(asistencia.Temas);
    $('#idRegistro').val(asistencia.id);

    /*
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
    setDatePickerMod(1, asistencia.Fecha);*/
    $('#verDatos').modal('show');
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
                document.getElementById('formRegAsis').reset();
                $('#alertTemasModRegistro').html("");
                $('#alertDuplicadosRegistro').html("");
                $('#alertFechaRegistro').html("");
                refreshHistorial();         
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

function CerrarModal(){
    $('#verDatos').modal('hide');
    ControladorDatePicker();
}