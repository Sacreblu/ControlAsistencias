<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsistenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asistencias', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');
            $table->bigInteger('Materia')->unsigned();
            $table->bigInteger('Profesor')->unsigned();
            $table->char('Modalidad', 30);
            $table->char('Plataforma', 25)->nullable();
            $table->char('Aula', 50)->nullable();
            $table->date('Fecha');
            $table->char('Dia', 20);
            $table->char('HoraI', 15);
            $table->char('HoraF', 15);
            $table->text('Temas', 350)->nullable();

            $table->timestamps();

            $table->foreign('Materia')->references('id')->on('materias')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asistencias');
    }
}
