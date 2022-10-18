window.onload = function() {
	initializeLogin();
    $('#loader').fadeOut("fast");
};

function initializeLogin() {
	$( "#Usuario" ).focus();
	$("#Password").on('keyup', function (e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			IniciarSesion();
		}
	});

	for (let i = 0; i < info.length; i++) {
        $("#Facultad").append(new Option(info[i].Nombre+" - "+info[i].Campus, info[i].id));
    }
}

function validar(){
	var text = $('#Usuario').val();
	if(text.includes("@")){
		$('#alertUsuario').html("<i class='fas fa-exclamation-circle'></i> Únicamente debe ingresar su usuario. Ej. javcordova");
	}else{
		$('#alertUsuario').html("");
	}
}

function IniciarSesion(){
	var user=$('#Usuario').val();
	var pass=$('#Password').val();
	var fac=$('#Facultad').val();
	if(user!="" && pass!=""){
		if(user.includes("@")!=true){
			pass = btoa(pass);
	
			var parametros = {
				"Usuario" : user,
				"Password" : pass,
				"Facultad" : fac
			};
			$.ajax({
				headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
				url: 'Profesores/IniciarSesion',
				data: parametros,
				type: "POST",
				success: function(resultado){
					if(resultado==1){
						document.location.replace("Inicio");
					}else{
						document.getElementById('formLogin').reset();
						$( "#Usuario" ).focus();	
						if (resultado==0) {
							alert("Usuario y/o Contraseña incorrectos");
						}else{
							alert("Usuario y/o Contraseña incorrectos");
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
		}else{
			alert("Únicamente debe ingresar su usuario. Ej. javcordova");
			$('#alertUsuario').html("");
			$( "#Usuario" ).focus();
			document.getElementById('formLogin').reset();
		}
	}else{
		alert("Ingrese sus credenciales");
	}
}

