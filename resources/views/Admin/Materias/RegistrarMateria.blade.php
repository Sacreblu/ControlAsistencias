@extends('Admin.Base.Menu')
<link rel="stylesheet" href="{{asset('css/Admin/Materias/RegistrarMaterias.css')}}">
<script src="{{asset('js/Admin/Materias/RegistrarMateria.js')}}" type="text/javascript"></script>
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
</script>
<div class="loader" id="loader">
    <div class="loaderanimated"></div>
</div>
<div class="web" id="web">
    <div class="contenedor">
        <div class="row">
            <div class="col-md-6 divRegMateria row">
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>

                <div class="col-md-10 divFormRegMateria">
                   <legend class="titulos">Registrar Experiencia Educativa</legend>
                    <form id="formRegMateria" class="formRegMateria" action="" autocomplete="off">
                        <span class="labelobligarotio">* Campos obligatorios.</span>
                        <div class="form-group">
                            <label for="EE" class="label"><span class="labelobligarotio">*</span> Experiencia Educativa</label>
                            <input type="text" class="form-control" id="EE" name="EE" oninput="$('#alertEERegistro').html('')">
                            <span class="alertError" id="alertEERegistro"></span>
                        </div><br>
                        <div id="" class="row" >
                            <div class="form-group col-md-6">
                                <label for="ProgEducativo" class="label">Programa Educativo</label>
                                <select class="form-control" id="ProgEducativo" name="ProgEducativo">
                                    
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="NRC" class="label"><span class="labelobligarotio">*</span> NRC</label>
                                <input type="text" class="form-control" id="NRC" name="NRC" oninput="$('#alertNRCRegistro').html('')">
                                <span class="alertError" id="alertNRCRegistro"></span>
                            </div>
                        </div><br>
                        
                        <div id="" class="row" >
                            <div class="form-group col-md-6">
                                <label for="Periodo" class="label">Periodo</label>
                                <select class="form-control" id="Periodo" name="Periodo" onchange="ControladorPeriodo()">
                                    <option value="Febrero - Julio">Febrero - Julio</option>
                                    <option value="Agosto - Enero">Agosto - Enero</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Modalidad" class="label">Modalidad de la EE</label>
                                <select class="form-control" id="Modalidad" name="Modalidad">
                                    <option value="En línea">En Línea</option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="Mixta">Mixta</option>
                                    <option value="Virtual">Virtual</option>
                                </select>
                            </div>
                        </div><br>

                        <div id="" class="row" >
                            <div class="form-group col-md-6">
                                <label for="Bloque" class="label"><span class="labelobligarotio">*</span> Bloque</label>
                                <select class="form-control" id="Bloque" name="Bloque" onchange="">
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="Seccion" class="label"><span class="labelobligarotio">*</span> Sección</label>
                                <input  type="number" oninput="$('#alertSeccionRegistro').html(''); if( this.value.length > 1 )  this.value = this.value.slice(0,1)" class="form-control" id="Seccion" name="Seccion">
                                <span class="alertError" id="alertSeccionRegistro"></span>
                            </div>
                        </div><br>

                        <div class="form-group">
                            <label for="Profesor" class="label">Docente</label>
                            <input type="text" class="form-control" id="Profesor" name="Profesor" oninput="$('#alertidProfesorRegistro').html('')" onchange="ControladorProfesor()">
                            <input type="hidden" name="idProfesor" id="idProfesor">
                            <span class="alertError" id="alertidProfesorRegistro"></span>
                            <span class="alertError" id="alertProfesorRegistro"></span>
                        </div><br>
                    </form>
                    <button type="button" onclick="EjecutarValidaciones()" class="btn btn-success" style="align-self:center" id="btnRegistrar" >Registrar</button>
                </div>
            </div>
            <div class="col-md-6 divRegClases row">
               
               <div class="col-md-10 divFormulariosRegClases">
                   <legend class="titulos">Registrar Horarios</legend>
                   <div class="ListaHorarios-container">
                        <div class="Horarios-control">
                            <div class="text-control">
                                Clases
                            </div> 
                            <button class="btn btn-sm" id="btnAgregar" onclick="añadirHorario()" title="Añadir un Horario"><i class="fas fa-plus"></i></button>
                            <button class="btn btn-sm" id="btnQuitar" onclick="quitarHorario()" title="Restar un Horario" disabled><i class="fas fa-minus"></i></button>
                        </div>
                        <div id="Horarios">
                        </div>
                    </div>
               </div>
                
                <div class="col-md-1"></div>

                <div class="col-md-1"></div>
            </div>
        </div>
    </div>


</div>