<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriasHorarios extends Model
{
    protected $fillable = [
        'id',
        'Materia',
        'Dia',
        'HoraI',
        'HoraF',
        'Aula',
        'ModalidadClase'
    ];

    public function ObtenerHorariosPorProfesor($idProf, $idFac){
        $horarios = MateriasHorarios::join('materias', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias_horarios.id','Materia','Dia','HoraI','HoraF','Aula', 'ModalidadClase')
                        ->Where([['materias.Profesor', '=', $idProf], ['programas_educativos.Facultad', '=', $idFac]])
                        ->orderBy('HoraI', 'asc')
                        ->get();
        return $horarios;
    }

    public function HorarioDeMateria($request){
        $idMateria = $request->get('idMateria');
        $horario = MateriasHorarios::join('materias', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias_horarios.id','Materia','Dia','HoraI','HoraF','Aula', 'ModalidadClase')
                        ->Where('materias_horarios.Materia', '=', $idMateria)
                        ->get();
        return $horario;
    }

    public function ObtenerHorarios($idFac){
        $horarios = MateriasHorarios::join('materias', 'materias_horarios.Materia', '=', 'materias.id')
                        ->join('programas_educativos', 'materias.ProgEducativo', '=', 'programas_educativos.id')
                        ->select('materias_horarios.id','Materia','Dia','HoraI','HoraF','Aula', 'ModalidadClase')
                        ->Where('programas_educativos.Facultad', '=', $idFac)
                        ->orderBy('HoraI', 'asc')
                        ->get();
        return $horarios;
    }

    public function RegistrarDatosHorario($request){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";

        $clase = new MateriasHorarios ([
            'Materia'=> $request->get('idMateria'),
            'Dia'=> $request->get('Dia'),
            'HoraI'=> $HoraI,
            'HoraF'=> $HoraF,
            'Aula'=> $request->get('Aula'),
            'ModalidadClase'=>  $request->get('ModalidadClase')
        ]); 
        $clase->save();
    }

    public function EliminarHorarios($request){
        $ids = $request->get('Ids');
        for ($i=0; $i < count($ids); $i++) { 
            $horario = MateriasHorarios::find($ids[$i]);
            $horario->delete();
        }
    }

    public function ModificarDatosHorario($request){
        $HoraI = $request->get('HoraI');
        $Duracion = $request->get('Duracion');
        $HoraF = intval($HoraI)+intval($Duracion)-1;
        $HoraI = $HoraI.":00";
        $HoraF = $HoraF.":59";
        $idRegistro = $request->get('idClase');

        $clase= MateriasHorarios::find($idRegistro);

        $clase->Dia = $request->get('Dia');
        $clase->HoraI = $HoraI;
        $clase->HoraF = $HoraF;
        $clase->Aula = $request->get('Aula');
        $clase->ModalidadClase = $request->get('ModalidadClase');
        
        $clase->save();

    }

    use HasFactory;
}
