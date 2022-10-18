<?php

namespace App\Http\Controllers;

use App\Models\Materias;
use App\Models\MateriasHorarios;
use App\Models\ProgramasEducativos;
use App\Models\Facultades;
use App\Models\Profesores;



use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class MateriasController extends Controller
{
    

    public function ObtenerMateriasPorProfesor(){
        $idProf = session('idProf');
        $idFac = session('idFac');

        $materias = new Materias();
        $materias = $materias->ObtenerMateriasPorProfesor($idProf, $idFac);

        $horarios = new MateriasHorarios();
        $horarios = $horarios->ObtenerHorariosPorProfesor($idProf, $idFac);
        
        $array = array(
            "Materias" => $materias,
            "Horarios" => $horarios
        );
        return $array;
    }



    //Funciones Cliente Administrativo
    public function VistaVerMaterias(){
        $sesion = session('idFacultad');
        if($sesion==null){
            return redirect('/gestion');
        }else{
            session()->forget('idMateria');
            $materias = new Materias();
            $materias = $materias->ObtenerInfoMaterias($sesion);
            $proged = new ProgramasEducativos();
            $proged = $proged->getProgramas($sesion);
    
            $result = array(
                "Materias" => $materias,
                "ProgEd" => $proged,
                "NombreFacultad"=> session('Facultad')." (".session('nP').")"
            );
            return view('Admin.Materias.VerMaterias', compact('result'));
        }
        
    }

    public function idMateriaSession(Request $request){
        session(['idMateria' => $request->get('idMateria')]);
    }

    public function VistaModificarMaterias(){
        $sesion = session('idFacultad');
        if($sesion==null){
            return redirect('/gestion');
        }else{
            if (session('idMateria')==null) {
                return redirect('/gestion/Materias');
            }else{
                $idMateria = session('idMateria');
                $request = new Request([
                    'idMateria'   => $idMateria
                ]);
                
                $proged = new ProgramasEducativos();
                $proged = $proged->getProgramas($sesion);

                $profesores = new Profesores();
                $Profesores = $profesores->ObtenerProfesores($sesion);

                $materia = new Materias();
                $materia = $materia->ObtenerMateria($request);
        
                $horario = new MateriasHorarios();
                $horario = $horario->HorarioDeMateria($request);
        
                $result = array(
                    "Materia" => $materia,
                    "Horario" => $horario,
                    "Programas" => $proged,
                    "Profesores" => $Profesores,
                    "NombreFacultad"=> session('Facultad')." (".session('nP').")"
                );
                return view('Admin.Materias.ModificarMateria', compact('result'));
            }
        }
    }

    public function VistaRegistrarMaterias(){
        $sesion = session('idFacultad');
        if($sesion==null){
            return redirect('/gestion');
        }else{
            session()->forget('idMateria');
            $proged = new ProgramasEducativos();
            $proged = $proged->getProgramas($sesion);

            $profesores = new Profesores();
            $Profesores = $profesores->ObtenerProfesores($sesion);
    
            $result = array(
                "Programas" => $proged,
                "Profesores" => $Profesores,
                "NombreFacultad"=> session('Facultad')." (".session('nP').")"
            );
            return view('Admin.Materias.RegistrarMateria', compact('result'));
        }
        
    }

    public function FiltrarMaterias(Request $request){
            
            $sesion = session('idFacultad');
            $materias = new Materias();
            $materias = $materias->FiltrarMaterias($sesion, $request);
    
            $result = array(
                "Materias" => $materias
            );

            return $result;
    }

    public function InfoMateria(Request $request){
        $materia = new Materias();
        $materia = $materia->ObtenerMateria($request);

        $horario = new MateriasHorarios();
        $horario = $horario->HorarioDeMateria($request);
        
        $array = array(
            "Materia" => $materia,
            "Horario" => $horario
        );
        return $array;
    }

    public function EliminarMateria(Request $request){
        $Materia = new Materias();
        $Materia->EliminarMateria($request);
    }

    public function BusquedaMateria(Request $request){
            
        $sesion = session('idFacultad');
        $materias = new Materias();
        $materias = $materias->BusquedaMateria($sesion, $request);

        $result = array(
            "Materias" => $materias
        );

        return $result;
}

    public function ValidarDatosMateria(Request $request){
        $validator = Validator::make($request->all(), [
                'EE'=>'required|string|max:150',
                'NRC'=>'required|string|max:50|unique:materias',
                'Seccion'=>'required|not-in:"0"',
                'Profesor'=>'nullable',
                'idProfesor' => 'required_with:Profesor'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosMateriaModificar(Request $request){
        $idEE = $request->get('idEE');
        $validator = Validator::make($request->all(), [
                'EE'=>'required|string|max:150',
                'NRC'=>'required|string|max:50|unique:materias,NRC,'.$idEE,
                'Seccion'=>'required|not-in:"0"',
                'Profesor'=>'nullable',
                'idProfesor' => 'required_with:Profesor'
            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarTraslapeProfesor(Request $request){
        $object = new Materias();
        $object = $object->ValidarTraslapeProfesor($request);
        if($object->count()==0){
            return 0;
        }else{
            return 1;
        }
    }

    public function ValidarTraslapeProfesorGuardado(Request $request){
        $object = new Materias();
        $object = $object->ValidarTraslapeProfesorGuardado($request);
        if($object->count()==0){
            return 0;
        }else{
            return 1;
        }
    }

    public function ValidarTraslapeAulas(Request $request){
        $object = new Materias();
        $object = $object->ValidarTraslapeAulas($request);
        if($object->count()==0){
            return $object->count();
        }else{
            return $object;
        }

    }

    public function ValidarTraslapeAulasGuardado(Request $request){
        $object = new Materias();
        $object = $object->ValidarTraslapeAulasGuardado($request);
        if($object->count()==0){
            return $object->count();
        }else{
            return $object;
        }

    }

    public function RegistrarDatosMateria(Request $request){
        $ee = new Materias();
        $idEE = $ee->RegistrarDatosMateria($request);
        return $idEE;
    }

    public function ModificarDatosMateria(Request $request){
        $ee = new Materias();
        $idEE = $ee->ModificarDatosMateria($request);
        return $idEE;
    }

    public function RegistrarDatosHorario(Request $request){
        $ee = new MateriasHorarios();
        $ee->RegistrarDatosHorario($request);
    }

    public function EliminarHorarios(Request $request){
        $clases = new MateriasHorarios();
        return $clases->EliminarHorarios($request);
    }

    public function ModificarDatosHorario(Request $request){
        $clases = new MateriasHorarios();
        return $clases->ModificarDatosHorario($request);
    }
}
