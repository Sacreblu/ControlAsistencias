<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materias', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');
            $table->char('NombreEE', 150);
            $table->char('NRC', 50);
            $table->integer('Bloque');
            $table->integer('Seccion');
            $table->bigInteger('ProgEducativo')->unsigned();
            $table->bigInteger('Profesor')->unsigned();
            $table->char('ModalidadEE', 50);

            $table->timestamps();
            $table->foreign('Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ProgEducativo')->references('id')->on('programas_educativos')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materias');
    }
}
