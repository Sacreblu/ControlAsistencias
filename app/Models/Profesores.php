<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Profesores extends Model
{
    protected $fillable = [
        'id',
        'noPersonal',
        'Nombre',
        'Apellido_P',
        'Apellido_M',
        'CorreoInstitucional',
        'FechaNac',
        'TipoContratacion',
        'CondicionSalud'
    ];





    public function IniciarSesion($request){
        $correo = $request->get('Usuario')."@uv.mx";
        $profesores = Profesores::join('profesor_facultads', 'profesores.id', '=', 'profesor_facultads.Profesor')
                        ->join('facultades', 'facultades.id', '=', 'profesor_facultads.Facultad')
                        ->select('profesores.id','noPersonal', "profesores.Nombre", "Apellido_P", "Apellido_M", "Siglas", "facultades.id as idFac")
                        ->Where([['CorreoInstitucional', '=', $correo], ['profesor_facultads.Facultad', '=', $request->get('Facultad')]])
                        ->first();
        return $profesores;
    }

    public function IniciarSesionAdmin($request){
        $correo = $request->get('Usuario')."@uv.mx";
        $facultad = $request->get('Facultad');
        $profesores = Profesores::join('administradores', 'profesores.id', '=', 'administradores.profesor')
                        ->join('facultades', 'facultades.id', '=', 'administradores.Facultad')
                        ->select('profesores.id as idProfesores','noPersonal', "profesores.Nombre", "Apellido_P", "Apellido_M", "Facultad", "facultades.Nombre as NombreFacultad")
                        ->Where([['CorreoInstitucional', '=', $correo], ['administradores.Facultad', '=', $facultad]])
                        ->first();
        return $profesores;
    }
    /*
    public function IniciarSesion($request){
        $profesores = Profesores::select('id','noPersonal', "Nombre", "Apellido_P", "Apellido_M")
                        ->Where([['noPersonal', '=', $request->get('noPersonal')], ['Contrasena', '=', $request->get('Password')]])
                        ->first();
        return $profesores;
    }*/

    public function ldap_autentica( $user_name, $ldappass ) {
        // Report simple running errors
        error_reporting ( E_ERROR | E_PARSE );
    
        // Prevent null binding
        if ( $user_name == NULL || $ldappass == NULL){ return ("false"); }
        if ( empty( $user_name ) || empty( $ldappass ) ){ return ("false xd"); }    
        $ldaphost='148.226.12.10';
        $ldapport=389;
        // conexión al servidor LDAP
       $ldapconn = ldap_connect( $ldaphost, $ldapport) or die("Could not connect to LDAP server.");
       ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
       ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
       $ldapbin= ldap_bind( $ldapconn, $user_name, $ldappass );
       
       if ( $ldapconn ) {

            // Set some ldap options for talking to AD
            ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
            ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

            // realizando la autenticación
            $ldapbind = ldap_bind( $ldapconn, $user_name, $ldappass );

            // verificación del enlace
            if ( $ldapbind ) {
                //echo "LDAP bind successful...";
                ldap_close ( $ldapconn );
                return true;
            } else {
                //echo "LDAP bind failed...";
                ldap_close ( $ldapconn );
                return false;
            }
        }
    }

    public function ObtenerProfesores($idFac){
        $profesores = Profesores::join('profesor_facultads', 'profesor_facultads.Profesor', '=', 'profesores.id')
                        ->select('profesores.id','Nombre','Apellido_P','Apellido_M', 'Facultad')
                        ->Where('Facultad', '=', $idFac)
                        ->get();
        return $profesores;
    }

    use HasFactory;
}
