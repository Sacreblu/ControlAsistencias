<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materias extends Model
{

    protected $fillable = [
        'id',
        'NombreEE',
        'NRC',
        'Bloque',
        'Seccion',
        'ProgEducativo',
        'Profesor',
        'ModalidadEE',
        'Periodo'
    ];

    public function ObtenerMateriasPorProfesor($idProf, $idFac){
        $Periodo='Febrero - Julio';
        $mes = date("n");

        /*if ($mes>=2 && $mes<=7) {
            $Periodo="Febrero - Julio";
        }else{
            $Periodo="Agosto - Enero";
        }*/

        $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias.id','NombreEE','NRC', 'Periodo','programas_educativos.Siglas as ProgEducativo', 'Seccion', 'Bloque', 'ModalidadEE')
                        ->Where([['Profesor', '=', $idProf], ['Periodo', '=', $Periodo], ['programas_educativos.Facultad', '=', $idFac]])
                        ->get();
        return $materias;
    }


    //Sistema Administrador
    public function ObtenerInfoMaterias($idFac){
        $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where('programas_educativos.Facultad', '=', $idFac)
                        ->get();
        return $materias;
    }

    public function ObtenerMateria($request){
        $idMateria = $request->get('idMateria');
        $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'programas_educativos.NombreCarrera', 'programas_educativos.id as idPrograma', 'profesores.id as idProf', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE', 'Periodo')
                        ->Where('materias.id', '=', $idMateria)
                        ->get();
        return $materias;
    }

    public function EliminarMateria($request){
        $accion = Materias::find($request->get('idMateria'));
        $accion->delete();
    }

    public function FiltrarMaterias($idFac, $request){
         $valor = $request->get('mostrar');
        if ($valor=="Todos") {
            $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where('programas_educativos.Facultad', '=', $idFac)
                        ->get();
            return $materias;
        }else{
            $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where([['programas_educativos.Facultad', '=', $idFac], ['materias.ProgEducativo', '=', $valor]])
                        ->get();
            return $materias;
        }
    }

    public function BusquedaMateria($idFac, $request){
        $opcion = $request->get('opcionBusqueda');
        $text = $request->get('textBusqueda');
        if($text != ""){
            switch ($opcion) {
                case 'NRC':
                    $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where([['programas_educativos.Facultad', '=', $idFac], ['materias.NRC', 'like', '%'.$text.'%']])
                        ->get();
                    break;
                case 'NombreEE':
                    $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where([['programas_educativos.Facultad', '=', $idFac], ['materias.NombreEE', 'like', '%'.$text.'%']])
                        ->get();
                    break;
                
                default:
                    $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                        ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                        ->Where([['programas_educativos.Facultad', '=', $idFac], ['profesores.Nombre', 'like', '%'.$text.'%']])
                        ->orWhere([['programas_educativos.Facultad', '=', $idFac], ['profesores.Apellido_P', 'like', '%'.$text.'%']])
                        ->orWhere([['programas_educativos.Facultad', '=', $idFac], ['profesores.Apellido_M', 'like', '%'.$text.'%']])
                        ->get();
                    break;
            }
        }else{
            $materias = Materias::join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                ->join('profesores', 'materias.Profesor', '=', 'profesores.id')
                ->select('materias.id as idMateria','NombreEE','NRC', 'Seccion', 'Bloque','programas_educativos.Siglas as ProgEducSiglas', 'Nombre', 'Apellido_P', 'Apellido_M', 'ModalidadEE')
                ->Where('programas_educativos.Facultad', '=', $idFac)
                ->get();
        }
            
        return $materias;
    }

    public function ValidarTraslapeProfesor($request, $idFac){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $idProf = $request->get('idProfesor');
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";
        $Dia = $request->get('Dia');
        

        $materias = Materias::join('materias_horarios', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias.id')
                        ->Where([['HoraI', '<=', $HoraI], ['HoraF', '>=', $HoraI], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '<=', $HoraF], ['HoraF', '>=', $HoraF], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '>=', $HoraI], ['HoraF', '<=', $HoraF], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->get();
        return $materias;
    }

    public function ValidarTraslapeProfesorGuardado($request, $idFac){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $idProf = $request->get('idProfesor');
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";
        $Dia = $request->get('Dia');
        $idClase = $request->get('idClase');
        

        $materias = Materias::join('materias_horarios', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias.id')
                        ->Where([['HoraI', '<=', $HoraI], ['HoraF', '>=', $HoraI], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '<=', $HoraF], ['HoraF', '>=', $HoraF], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '>=', $HoraI], ['HoraF', '<=', $HoraF], ['Profesor', '=', $idProf], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->get();
        return $materias;
    }
    
    public function ValidarTraslapeAulas($request, $idFac){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $aula = $request->get('Aula');
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";
        $Dia = $request->get('Dia');
        

        $materias = Materias::join('materias_horarios', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias.id')
                        ->Where([['HoraI', '<=', $HoraI], ['HoraF', '>=', $HoraI], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '<=', $HoraF], ['HoraF', '>=', $HoraF], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '>=', $HoraI], ['HoraF', '<=', $HoraF], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['programas_educativos.Facultad', '=', $idFac]])
                        ->get();
        return $materias;
    }

    public function ValidarTraslapeAulasGuardado($request, $idFac){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $aula = $request->get('Aula');
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";
        $Dia = $request->get('Dia');
        $idClase = $request->get('idClase');
        

        $materias = Materias::join('materias_horarios', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias.id')
                        ->Where([['HoraI', '<=', $HoraI], ['HoraF', '>=', $HoraI], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '<=', $HoraF], ['HoraF', '>=', $HoraF], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orWhere([['HoraI', '>=', $HoraI], ['HoraF', '<=', $HoraF], ['Aula', '=', $aula], ['Dia', '=', $Dia], ['materias_horarios.id', '<>', $idClase], ['programas_educativos.Facultad', '=', $idFac]])
                        ->get();
        return $materias;
    }

    public function RegistrarDatosMateria($request){
        
        $ee = new Materias ([
            'NombreEE'=> $request->get('EE'),
            'ProgEducativo'=> $request->get('ProgEducativo'),
            'NRC'=> $request->get('NRC'),
            'Periodo'=> $request->get('Periodo'),
            'ModalidadEE'=> $request->get('Modalidad'),
            'Bloque'=>  $request->get('Bloque'),
            'Seccion'=> $request->get('Seccion'),
            'Profesor'=> $request->get('idProfesor')
        ]); 
        $ee->save();

        return $ee->id;
    }

    public function ModificarDatosMateria($request){
        
        $materia = Materias::find($request->get('idEE'));

        $materia->NombreEE = $request->get('EE');
        $materia->ProgEducativo = $request->get('ProgEducativo');
        $materia->NRC = $request->get('NRC');
        $materia->Periodo = $request->get('Periodo');
        $materia->ModalidadEE = $request->get('Modalidad');
        $materia->Bloque = $request->get('Bloque');
        $materia->Seccion = $request->get('Seccion');
        $materia->Profesor = $request->get('idProfesor');
        $materia->save();
        
        return $materia->id;
    }

    public function clasesbydia($dia){
        $materias = Materias::join('materias_horarios', 'materias.id', '=', 'materias_horarios.Materia')
                        ->select('materias.id as materia', 'materias.profesor', 'ModalidadClase', 'Aula', 'Dia', 'HoraI', 'HoraF', 'Periodo')
                        ->Where('Dia', '=', $dia)
                        ->get();
        return $materias;
    }

    use HasFactory;
}
