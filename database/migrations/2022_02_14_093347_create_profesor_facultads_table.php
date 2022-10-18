<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesorFacultadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesor_facultads', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');
            $table->bigInteger('Profesor')->unsigned()->nullable($value = true);
            $table->bigInteger('Facultad')->unsigned()->nullable($value = true);

            $table->timestamps();

            $table->foreign('Profesor')->references('id')->on('profesores')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('Facultad')->references('id')->on('facultades')->onDelete('set null')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesor_facultads');
    }
}
