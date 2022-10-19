<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencias extends Model
{
    protected $fillable = [
        'id',
        'Materia',
        'Profesor',
        'Modalidad',
        'Plataforma',
        'Aula',
        'Fecha',
        'Dia',
        'HoraI',
        'Periodo',
        'HoraF',
        'Temas',
        'Direccion'
    ];
    
    public function HistorialAsistencia($idProf){
        $Asistencias = Asistencias::join('materias', 'asistencias.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('asistencias.id', 'materias.ModalidadEE', 'Materia as idMateria', 'NombreEE', 'NRC', 'Bloque', 'Seccion', 
                                        'programas_educativos.Siglas as ProgEducativo', 'Modalidad', 'Plataforma', 'Aula', 'Fecha', 'Dia', 
                                        'HoraI', 'HoraF', 'Temas')
                        ->Where('asistencias.Profesor', '=', $idProf)
                        ->orderBy('Fecha', 'DESC')
                        ->orderBy('HoraI', 'ASC')
                        ->get();
        return $Asistencias;
    }

    public function ValidarAsistencia($request){
        $Horas = explode(" - ", $request->get('Hora'));
        $Asistencias = Asistencias::select('id', 'Materia', 'Profesor', 'Fecha', 'HoraI')
                        ->Where([['Materia', '=', $request->get('EE')], ['Fecha', '=', $request->get('Fecha')], ['HoraI', '=',  $Horas[0]]])
                        ->first();
        return $Asistencias;
    }

    public function RegistrarAsistencia($request, $idProf){
        $Horas = explode(" - ", $request->get('Hora'));

        $ipDir=$request->ip();
        $Periodo="";
        if ($request->get('Periodo')=='Agosto - Enero') {
            $Periodo = 'Agosto '.date("Y").' - Enero '.date("Y")+1;
        }else{
            $Periodo = 'Febrero - Julio '.date("Y");
        }

        $datos = new Asistencias ([
            'Materia'=> $request->get('EE'),
            'Profesor'=> $idProf,
            'Modalidad'=> $request->get('Modalidad'),
            'Plataforma'=> $request->get('Plataforma'),
            'Aula'=> $request->get('Aula'),
            'Fecha'=>  $request->get('Fecha'),
            'Dia'=> $request->get('Dia'),
            'Periodo'=> $Periodo,
            'HoraI'=> $Horas[0],
            'HoraF'=> $Horas[1],
            'Temas'=> $request->get('Temas'),
            'Direccion'=> $ipDir
        ]); 
        $datos->save();
    }

    public function ModificarAsistencia($request){

        $asistencia = Asistencias::find($request->get('idRegistro'));

        $asistencia->Modalidad = $request->get('Modalidad');
        $asistencia->Plataforma = $request->get('Plataforma');
        $asistencia->Temas = $request->get('Temas');

        $asistencia->save();
    }

    public function EliminarAsistencia($request){
        $accion = Asistencias::find($request->get('idRegistro'));
        $accion->delete();
    }

    
    use HasFactory;
}
