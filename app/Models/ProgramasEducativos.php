<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramasEducativos extends Model
{
    protected $fillable = [
        'id',
        'NombreCarrera',
        'Siglas',
        'Facultad'
    ];

    public function getProgramas($idFac){
        $proged = ProgramasEducativos::join('facultades', 'programas_educativos.Facultad', '=', 'facultades.id')
                        ->select('programas_educativos.id as idCarrera','NombreCarrera','programas_educativos.Siglas as sigProgEd','Facultad as idFacultad', 'Nombre as Facultad', 'facultades.Siglas as sigFac', 'Campus')
                        ->Where('Facultad', '=', $idFac)
                        ->get();
        return $proged;
    }
    
    use HasFactory;
}
