@extends('Menu')
<link rel="stylesheet" href="{{asset('css/HistorialMovil.css')}}">
<script src="{{asset('js/HistorialMovil/HistorialMovil.js')}}" type="text/javascript"></script>
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
    var informacion = @json($result);
</script>

<div class="loader" id="loader">
    <div class="loaderanimated"></div>
</div>
<div class="movil" id="movil">
    <div class="contenedor" id="divContenedorMovil">
        <div class="col-md-12">
            <div class="TitleHist">Historial de Asistencias</div>
                <table class="table" id="tablaHistorial">
                    <thead class="table-histAsis">
                        <tr>
                            <th scope="col">E.E.</th>
                            <th scope="col">Día</th>
                            <th >fech</th>
                            <th scope="col">Hora</th>
                        </tr>
                    </thead>
                    <tbody id="bodyHistorial">
                                
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
</div>

<!-- Modal Ver Datos -->
<div class="modal fade" id="verDatos" tabindex="-1" role="dialog" aria-labelledby="VerDatosLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="Mtitle">Visualizar Asistencia</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="text-align:left">
                        <div class="tabs-container">
                            <form id="formModAsis" class="formModAsis" action="" >
                                <span class="labelobligarotio">* Campos obligatorios.</span>
                                <div class="form-group">
                                    <label for="EEMod" class="label">Experiencia Educativa</label>
                                    <input type="text" class="form-control" id="EEMod" name="EEMod" readonly>
                                    <div class="divModalidadEEMod" id="divModalidadEEMod"></div>
                                </div>
                                <div id="divfechahora" class="row" >
                                    <div class="form-group col-md-6">
                                        <label for="FechaMod" class="label">Fecha</label>
                                        <input type="text" class="form-control" id="FechaMod" name="Fecha" readonly>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="HoraMod" class="label">Hora</label>
                                        <input type="text" class="form-control" id="HoraMod" name="Hora" readonly>
                                    </div>
                                </div>        
                                <div class="form-group">
                                    <label for="ModalidadMod" class="label">Modalidad de la Clase</label>
                                    <select class="form-control" id="ModalidadMod" name="Modalidad" onchange="ModalidadControllerMod()">
                                        <option value="En Línea">En Línea</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Virtual">Virtual</option>
                                    </select>
                                </div>
                                <div class="form-group" id="divPlataformainfo">
                                    <label for="PlataformaMod" class="label">Plataforma para la clase</label>
                                    <select class="form-control" id="PlataformaMod" name="Plataforma">
                                        <option value="Microsoft Teams">Microsoft Teams</option>
                                        <option value="Google Meets">Google Meets</option>
                                        <option value="Zoom">Zoom</option>
                                        <option value="Discord">Discord</option>
                                        <option value="Eminus 3">Eminus 3</option>
                                        <option value="Eminus 4">Eminus 4</option>
                                    </select>
                                </div>
                                <div class="form-group" id="divAulaInfo" style="display:none">
                                    <label for="AulaMod" class="label">Aula para la clase</label>
                                    <input class="form-control" type="text" id="AulaMod" name="Aula" readonly>
                                </div>
                                
                                <div class="form-group" style="text-align: left;">
                                    <label for="TemasMod"><span class="labelobligarotio">*</span> Temas</label>
                                    <textarea class="form-control" id="TemasMod" name="Temas" rows="4" onchange="TemasController()"></textarea>
                                    <input type="hidden" id="idRegistro" name="idRegistro">
                                    <span class="alertError" id="alertTemasModRegistro"></span>
                                </div>
                            </form>           
                            <div style="text-align:center;">
                                <button type="button" id="Guardar" class="btn btn-primary btn-sm" onclick="validarModAsistencia()">Guardar</button>
                                <button type="button" id="Elimiar" class="btn btn-danger btn-sm" onclick="EliminarRegistro()">Eliminar</button>
                                <button type="button" id="Cerrar" class="btn btn-warning btn-sm btn-light" onclick="CerrarModal()">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>