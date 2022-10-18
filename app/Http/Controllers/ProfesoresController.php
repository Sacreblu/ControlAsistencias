<?php

namespace App\Http\Controllers;

use App\Models\Profesores;
use App\Models\Facultades;

use Illuminate\Http\Request;
use Illuminate\Http\Response;


class ProfesoresController extends Controller
{
    public function Login(){
        $sesion = session('noPersonal');
        if($sesion==null){
            $facultades = new Facultades();
            $facultades = $facultades->getFacs();
            return view('Login', compact('facultades'));
        }else{
            return redirect('/Inicio');
        }
    }

    public function IniciarSesion(Request $request){
        $user_name = $request->get('Usuario');
        $user_password = $request->get('Password');

        $user_password =  base64_decode($user_password);
        
        $object = new Profesores();

        $region = 'XALAPA';

        $profesor = new Profesores();
        $profesor = $profesor->IniciarSesion($request);
        if($profesor==null){
            return 2;
        }else{
           
            if( $object->ldap_autentica( strtolower( $region ) . '\\' . $user_name, $user_password ) ) {
                session(['noPersonal' => $profesor['noPersonal']]);
                session(['NombreProf' => $profesor['Nombre']." ".$profesor['Apellido_P']." ".$profesor['Apellido_M']]);
                session(['idProf' => $profesor['id']]);
                session(['Fac' => $profesor['Siglas']]);
                session(['idFac' => $profesor['idFac']]);
                return 1;
            }else{
                return 0;
            }
        }
    }

    public function VerificarSesion(){
        $sesion = session('noPersonal');
        $Nombre= session('NombreProf')." (".session('noPersonal').")";
        if($sesion==null){
            return 0;
        }else{
            return $Nombre;
        }
    }

    public function CerrarSesion(){
        session()->forget('noPersonal');
        session()->forget('idProf');
    }


    //SISTEMA ADIMNISTRATIVO
    

    public function LoginAdmin(){
        $sesion = session('idFacultad');
        if($sesion==null){
            $facultades = new Facultades();
            $facultades = $facultades->getFacs();
            return view('Admin.Login', compact('facultades'));
        }else{
            return redirect('/gestion/Materias');
        }
    }
    
    public function IniciarSesionAdmin(Request $request){
        $user_name = $request->get('Usuario');
        $user_password = $request->get('Password');
        $fac = $request->get('Facultad');

        $user_password =  base64_decode($user_password);
        
        $object = new Profesores();

        $region = 'XALAPA';

        $profesor = new Profesores();
        $profesor = $profesor->IniciarSesionAdmin($request);
        if($profesor==null){
            return 2;
        }else{
           
            if( $object->ldap_autentica( strtolower( $region ) . '\\' . $user_name, $user_password ) ) {
                session(['idFacultad' => $profesor['Facultad']]);
                session(['Facultad' => $profesor['NombreFacultad']]);
                session(['nP' => $profesor['noPersonal']]);
                return 1;
            }else{
                return 0;
            }
        }
    }

    public function VerificarSesionAdmin(){
        $sesion = session('idFacultad');
        $NombreFac= session('Facultad');
        if($sesion==null){
            return 0;
        }else{
            return $NombreFac;
        }
    }

    public function CerrarSesionAdmin(){
        session()->forget('idFacultad');
        session()->forget('Facultad');
        session()->forget('nP');
    }
}
