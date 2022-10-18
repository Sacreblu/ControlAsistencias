<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
     <!--<link rel="shortcut icon" type="image/png" href="{{asset('storage/Imagenes/msicu.png')}}">
    <link rel="shortcut icon" sizes="192x192" href="{{asset('storage/Imagenes/msicu.png')}}">-->
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="{{asset('js/libs/jquery3.5.1.js')}}" ></script>
    <script src="{{asset('js/libs/bootstrap4.0.js')}}"></script>
    <script src="{{asset('js/libs/jquery-ui-1.12.1.min.js')}}"></script>
    <script src="{{asset('js/libs/jquery.dataTables-1.10.23.min.js')}}"></script>

    <link rel="stylesheet" href="{{asset('css/libs/bootstrap4.0.css')}}">
    <link rel="stylesheet" href="{{asset('css/libs/jquery-ui-1.12.1.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/libs/jquery.dataTables-1.10.23.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/Admin/header.css')}}">
    
    <link rel="stylesheet" href="{{asset('css/libs/font-awesome-6.0.0-all-min.css')}}">
    
    
    <!-- <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">-->
    

    

</head>
<body>
    <div class="head">
        <div class="header">
            <div class="divTitle">
                    Gestión de Asistencias
            </div>

            <div class="imagen-header img-right logout" onclick="cerrarsesion()" ><img src="{{asset('imgs/logout.png')}}" alt="" width="30" heigth="30" style="margin-top: 6.5px;"></div>
        
            <img class="imagen-header img-right" src="{{asset('imgs/uv_blanco.png')}}" alt="" width="45" heigth="45">
        </div>

        <nav class="navbar navbar-expand-lg navbar-light bg-light menu">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profesores
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ url('') }}">Registrar Profesores</a>
                            <a class="dropdown-item" href="{{ url('') }}">Ver Profesores</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Experiencias Educativas
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" style="cursor:pointer" onclick="redireccionar('/gestion/Materias/RegistrarMaterias')">Registrar Experiencia Educativa</a>
                            <a class="dropdown-item" style="cursor:pointer" onclick="redireccionar('/gestion/Materias')">Ver Experiencia Educativa</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
       
       <div class="User" id="User">
        </div>
    </div>
</body>

<script>
    function cerrarsesion() {
        $.ajax({
            headers: { "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content") },
            url: 'gestion/Profesores/CerrarSesion',
            type: "POST",
            success: function(){
                document.location.replace("/gestion")
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                /*
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);*/
                //location.reload();
            }
        });
    }

    function redireccionar(ruta){
        document.location.replace(ruta);
        //document.location.replace('/controlasistencia'+ruta);
    }
</script>
</html>