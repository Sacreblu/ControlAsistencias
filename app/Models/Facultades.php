<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultades extends Model
{
    protected $fillable = [
        'id',
        'Nombre',
        'Siglas',
        'Campus'
    ];

    public function getFacs(){
        $facs = Facultades::select('id', 'Nombre','Siglas','Campus')
                        ->get();
        return $facs;
    }
    

    use HasFactory;
}
