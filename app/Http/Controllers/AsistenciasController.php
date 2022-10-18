<?php

namespace App\Http\Controllers;


use App\Models\Asistencias;
use App\Models\Materias;
use App\Models\MateriasHorarios;
use Illuminate\Http\Request;

class AsistenciasController extends Controller
{

    public function HistorialAsistencia(){
        $sesion = session('noPersonal');
        if($sesion==null){
            return redirect('/');
        }else{
            $idProf = session('idProf');
            $objeto = new Asistencias();
            $result = array(
                        "Historial" => $objeto->HistorialAsistencia($idProf),
                        'Nombre' => session('NombreProf')." - ".session('Fac')." (".session('noPersonal').")"
                    );
            return view('Inicio', compact('result'));
        }
    }

    public function HistorialAsistenciaMovil(){
        $sesion = session('noPersonal');
        if($sesion==null){
            return redirect('/');
        }else{
            $idProf = session('idProf');
            $objeto = new Asistencias();
            $result = array(
                        "Historial" => $objeto->HistorialAsistencia($idProf),
                        'Nombre' => session('NombreProf')." (".session('noPersonal').")"
                    );
            return view('HistorialMovil', compact('result'));
        }
    }

    public function ValidarAsistencia(Request $request){
        $arreglo = array();
        if ($request->get('Fecha')=="") {
            array_push($arreglo, "Fecha");
        }else{
            $asistencia = new Asistencias();
            $resultado=$asistencia->ValidarAsistencia($request);
            if ($resultado!=null) {
                array_push($arreglo, "Duplicados");
            }
        }
        if ($request->get('Temas')=="") {
            array_push($arreglo, "Temas");
        }

        if(count($arreglo)==0){
            $idProf = session('idProf');
            $asistencia->RegistrarAsistencia($request, $idProf);
            return null;
        }else{
            return $arreglo;
        }
    }

    public function ValidarModAsistencia(Request $request){
        
        if ($request->get('Temas')=="") {
            return 0;
        }else{
            $asistencia = new Asistencias();
            $asistencia->ModificarAsistencia($request);
            return 1;
        }
    }

    /*public function RegistrarAsistencia(Request $request){
        $idProf = session('idProf');
        $asistencia = new Asistencias();
        $asistencia->RegistrarAsistencia($request, $idProf);
    }

    public function ModificarAsistencia(Request $request){
        $asistencia = new Asistencias();
        $asistencia->ModificarAsistencia($request);
    }*/

    public function EliminarAsistencia(Request $request){
        $asistencia = new Asistencias();
        $asistencia->EliminarAsistencia($request);
    }

    public function RefreshHistorial(){
        $idProf = session('idProf');
        $objeto = new Asistencias();
        $result = array(
                    "Historial" => $objeto->HistorialAsistencia($idProf),
                    'Nombre' => session('NombreProf')." (".session('noPersonal').")"
                );
        return $result;
    }
}
