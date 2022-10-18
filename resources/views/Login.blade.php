<!DOCTYPE html>

<script>
    var info = @json($facultades);
</script>

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
    <meta name="csrf-token" content="{{ csrf_token() }}">

<style>
    .loader{
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        background-color: #f3f3f3;
    }

    .loaderanimated {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #04436e;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
</style>

    <script src="{{asset('js/libs/jquery3.5.1.js')}}" ></script>
    <script src="{{asset('js/libs/bootstrap4.0.js')}}"></script>
    <script src="{{asset('js/libs/jquery-ui-1.12.1.min.js')}}"></script>
    
    <link rel="stylesheet" href="{{asset('css/libs/bootstrap4.0.css')}}">
    <link rel="stylesheet" href="{{asset('css/libs/jquery-ui-1.12.1.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/libs/font-awesome-6.0.0-all-min.css')}}">
    
    <link rel="stylesheet" href="{{asset('css/Login.css')}}"/>
    <script src="{{asset('js/Login/Login.js')}}" type="text/javascript"></script>

</head>
<body>
<div class="loader" id="loader">
    <div class="loaderanimated"></div>
</div>
    <div class="Contenedor">
        <div id="vistaWeb" class="vistaWeb">
            <div class="row">
                <div id="ContenedorLogin" class="col-md-4 ContenedorLogin" >
                    <div id="divLogin" class="divLogin">
                        <img class="imagen-logo" src="{{asset('imgs/uv.png')}}" alt="" width="165" heigth="165">
                        <p class="titulo">Control de Asistencias</p>
                        <form id="formLogin" class="vistaWeb" action="" autocomplete="off">
                            <div class="form-group">
                                <label for="Usuario" class="label">Usuario</label>
                                <input type="text" class="form-control" id="Usuario" name="Usuario" oninput="validar()">
                                <span class="alertError" id="alertUsuario"></span>
                            </div>
                            <div class="form-group">
                                <label for="Password" class="label">Contraseña</label>
                                <input type="password" class="form-control" id="Password" name="Password">
                            </div>
                        </form>
                        <br>
                        <button type="button" class="btn btn-login" onclick="IniciarSesion()">Iniciar Sesión</button>

                        <div class="form-group">
                            <select class="form-control" id="Facultad">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 login-img">
                    
                </div>
            </div>
        </div>

        
    </div>
</body>
</html>