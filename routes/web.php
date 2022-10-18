<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfesoresController;
use App\Http\Controllers\MateriasController;
use App\Http\Controllers\AsistenciasController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/Inicio', [AsistenciasController::class, 'HistorialAsistencia']);

Route::get('/Historial', [AsistenciasController::class, 'HistorialAsistenciaMovil']);


Route::get('/', [ProfesoresController::class, 'Login']);
Route::post('/Profesores/IniciarSesion', [ProfesoresController::class, 'IniciarSesion']);
Route::post('/Profesores/VerificarSesion', [ProfesoresController::class, 'VerificarSesion']);
Route::post('/Profesores/CerrarSesion', [ProfesoresController::class, 'CerrarSesion']);


Route::post('/Materias/MateriasByProfe', [MateriasController::class, 'ObtenerMateriasPorProfesor']);

Route::post('/Asistencia/ValidarAsistencia', [AsistenciasController::class, 'ValidarAsistencia']);
Route::post('/Asistencia/ValidarModAsistencia', [AsistenciasController::class, 'ValidarModAsistencia']);
Route::post('/Asistencia/RegistrarAsistencia', [AsistenciasController::class, 'RegistrarAsistencia']);
Route::post('/Asistencia/ModificarAsistencia', [AsistenciasController::class, 'ModificarAsistencia']);
Route::post('/Asistencia/EliminarAsistencia', [AsistenciasController::class, 'EliminarAsistencia']);
Route::post('/Asistencia/RefreshHistorial', [AsistenciasController::class, 'RefreshHistorial']);


//SISTEMA ADMINISTRATIVO
Route::get('/gestion', [ProfesoresController::class, 'LoginAdmin']);

Route::post('/gestion/Profesores/IniciarSesion', [ProfesoresController::class, 'IniciarSesionAdmin']);
Route::post('/gestion/Profesores/VerificarSesion', [ProfesoresController::class, 'VerificarSesionAdmin']);
Route::post('/gestion/Profesores/CerrarSesion', [ProfesoresController::class, 'CerrarSesionAdmin']);


Route::get('/gestion/Materias', [MateriasController::class, 'VistaVerMaterias']);
Route::post('/gestion/Materias/FiltrarMaterias', [MateriasController::class, 'FiltrarMaterias']);
Route::post('/gestion/Materias/BusquedaMateria', [MateriasController::class, 'BusquedaMateria']);
Route::post('/gestion/Materias/InfoMateria', [MateriasController::class, 'InfoMateria']);
Route::post('/gestion/Materias/EliminarMateria', [MateriasController::class, 'EliminarMateria']);


Route::get('/gestion/Materias/RegistrarMaterias', [MateriasController::class, 'VistaRegistrarMaterias']);
Route::post('/gestion/Materias/ValidarDatosMateria', [MateriasController::class, 'ValidarDatosMateria']);
Route::post('/gestion/Materias/ValidarTraslapeProfesor', [MateriasController::class, 'ValidarTraslapeProfesor']);
Route::post('/gestion/Materias/ValidarTraslapeAulas', [MateriasController::class, 'ValidarTraslapeAulas']);
Route::post('/gestion/Materias/RegistrarDatosMateria', [MateriasController::class, 'RegistrarDatosMateria']);
Route::post('/gestion/Materias/RegistrarDatosHorario', [MateriasController::class, 'RegistrarDatosHorario']);


Route::get('/gestion/Materias/ModificarMateria', [MateriasController::class, 'VistaModificarMaterias']);
Route::post('/gestion/Materias/idMateriaSession', [MateriasController::class, 'idMateriaSession']);
Route::post('/gestion/Materias/ValidarDatosMateriaModificar', [MateriasController::class, 'ValidarDatosMateriaModificar']);
Route::post('/gestion/Materias/ValidarTraslapeAulasGuardado', [MateriasController::class, 'ValidarTraslapeAulasGuardado']);
Route::post('/gestion/Materias/ValidarTraslapeProfesorGuardado', [MateriasController::class, 'ValidarTraslapeProfesorGuardado']);
Route::post('/gestion/Materias/ModificarDatosMateria', [MateriasController::class, 'ModificarDatosMateria']);
Route::post('/gestion/Materias/EliminarHorarios', [MateriasController::class, 'EliminarHorarios']);
Route::post('/gestion/Materias/ModificarDatosHorario', [MateriasController::class, 'ModificarDatosHorario']);