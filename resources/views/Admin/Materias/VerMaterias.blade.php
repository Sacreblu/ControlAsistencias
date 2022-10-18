@extends('Admin.Base.Menu')
<link rel="stylesheet" href="{{asset('css/Admin/Materias/VerMaterias.css')}}">
<script src="{{asset('js/Admin/Materias/VerMaterias.js')}}" type="text/javascript"></script>
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
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

    
<script>
    var info = @json($result);
    var materias = info['Materias'];
    for (let i = 0; i < materias.length; i++) {
        materias[i].NombreFull = materias[i].Nombre+" "+materias[i].Apellido_P+" "+materias[i].Apellido_M;
        delete materias[i].Nombre;
        delete materias[i].Apellido_P;
        delete materias[i].Apellido_M;
    }
    info['Materias'] = materias;
</script>

<div class="loader" id="loader">
    <div class="loaderanimated"></div>
</div>

<div class="Contenedor">
        <div class="div-buscar">
            <div class="form-inline form-buscar">
                <form id="formBusqueda">
                    <div style="display:block; margin-bottom: 9px; padding-right: 10px">
                        <div class="form-check check-buscar">
                            <input class="form-check-input" onchange="BusquedaMateria()" type="radio" checked name="opcionBusqueda" id="checkNRC" value="NRC">
                            <label class="form-check-label" for="checkNRC">NRC</label>
                        </div>
                        <div class="form-check check-buscar">
                            <input class="form-check-input" onchange="BusquedaMateria()" type="radio" name="opcionBusqueda" id="checkNombreEE" value="NombreEE">
                            <label class="form-check-label" for="checkNombreEE">Nombre EE</label>
                        </div>
                        <div class="form-check check-buscar">
                            <input class="form-check-input" onchange="BusquedaMateria()" type="radio" name="opcionBusqueda" id="checkNombreProf" value="NombreProf">
                            <label class="form-check-label" for="checkNombreProf">Docente</label>
                        </div>
                    </div>
                    <input type="text" class="form-control input-busqueda" name="textBusqueda" id="busqueda" onkeyup="BusquedaMateria()" value="">
                    <button type="button" class="btn btn-success btn-sm btn-buscar" onclick="BusquedaMateria()">Buscar</button>
                </form>
            </div>
        </div>
        <div class="div-opciones row">
            <div class="form-group form-inline col-md-9 opciones-form">
                <label for="Mostrar">Mostrar: </label>
                <select class="form-control" id="Mostrar" onchange="FiltradoMaterias()">
                    <option value="Todos">Todos</option>
                </select>
            </div>
        </div>
        
        <div class="col-md-12 mt-3">
            <table id="MateriaTabla" class="table table-hover table-sm tablaMaterias">
                <thead>
                    <tr style="text-align:center">
                        <th style="width:80px; vertical-align:middle;">NRC</th>
                        <th style="width:250px; vertical-align:middle;">Experiencia Educativa</th>
                        <th style="width:200px; vertical-align:middle;">Docente</th>
                        <th style="width:100px; vertical-align:middle;">Programa Educativo</th>
                        <th style="width:100px; vertical-align:middle;">Modalidad</th>
                        <th style="width:100px; vertical-align:middle;">Bloque</th>
                        <th style="width:100px; vertical-align:middle;">Seccion</th>

                        <th style="width:140px; vertical-align:middle;">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tablaMaterias">
                </tbody>
            </table>
            <br>
        </div>

        <!-- Modal Ver Datos -->
        <div class="modal fade" id="verDatos" tabindex="-1" role="dialog" aria-labelledby="VerDatosLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id=""> Información de Experiencia Educativa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="container" style="padding: 0 !important">
                                
                                <div style="max-height: 350px; overflow-y: auto; overflow-x: hidden;">
                                    <div class="row">
                                        <div class="col-md-5" style="margin-bottom:15px" >
                                            <p style="font-size:16px; text-align: center;"><b>Nombre de la Experiencia Educativa</b></p>
                                            <p style="font-size:16px; text-align: center;" id="NombreEE"></p>
                                        </div>
                                        <div class="col-md-2" style="margin-bottom:15px">
                                            <p style="font-size:16px; text-align: center;"><b>NRC</b></p>
                                            <p style="font-size:16px; text-align: center;" id="NRC"></p>
                                        </div>
                                        <div class="col-md-3" style="margin-bottom:15px">
                                            <p style="font-size:16px; text-align: center;"><b>Bloque y Sección</b></p>
                                            <p style="font-size:16px; text-align: center;" id="BloqSecc"></p>
                                        </div>
                                        <div class="col-md-2" style="margin-bottom:15px">
                                            <p style="font-size:16px; text-align: center;"><b>Periodo</b></p>
                                            <p style="font-size:16px; text-align: center;" id="Periodo"></p>
                                        </div><br>
                                        <div class="col-md-3" style="margin-bottom:20px">
                                            <p style="font-size:16px; text-align: center;"><b>Modalidad (EE)</b></p>
                                            <p style="font-size:16px; text-align: center;" id="ModalidadEE"></p>
                                        </div>
                                        <div class="col-md-4" style="margin-bottom:20px">
                                            <p style="font-size:16px; text-align: center;"><b>Programa Educativo</b></p>
                                            <p style="font-size:16px; text-align: center;" id="ProgEd"></p>
                                        </div>
                                       
                                        <div class="col-md-5" style="margin-bottom:20px">
                                            <p style="font-size:16px; text-align: center;"><b>Docente</b></p>
                                            <p style="font-size:16px; text-align: center;" id="Profesor"></p>
                                        </div>
                                        <div class="col-md-12 horarios" id="Horarios">
                                           
                                        </div>
                                    </div> 
                                </div>                        
                               
                            <div class="row" style="margin:25px; text-align:center;">
                                <div class="col-md-4"></div>
                                <div class="col-md-2" id="btnModificar">
                                </div>
                                <div class="col-md-2" id="btnEliminar">
                                </div>
                                <div class="col-md-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>