<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdministradoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administradores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');
            $table->bigInteger('Profesor')->unsigned()->nullable($value = true);;
            $table->bigInteger('Facultad')->unsigned()->nullable($value = true);;
            $table->timestamps();

            $table->foreign('Facultad')->references('id')->on('facultades')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('administradores');
    }
}
