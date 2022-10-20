<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');

            $table->integer('No_CVU')->nullable($value = false)->unique();
            $table->char('Contrasena', 16)->nullable($value = false);
            $table->char('Nombre', 30)->nullable($value = false);
            $table->char('Apellido_P', 20)->nullable($value = false);
            $table->char('Apellido_M', 20)->nullable($value = false);
            $table->char('CorreoInstitucional', 30)->nullable($value = true);
            $table->date('FechaNac')->nullable($value = true);
            $table->bigInteger('TipoContratacion')->unsigned()->nullable($value = true);
            $table->text('CondicionSalud', 450)->nullable();
            
            $table->timestamps();

            $table->foreign('TipoContratacion')->references('id')->on('tipo_contrataciones')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesores');
    }
}
