<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasEducativosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas_educativos', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->char('NombreCarrera', 100);
            $table->char('Siglas', 10);
            $table->bigInteger('Facultad')->unsigned()->nullable($value = true);
            $table->timestamps();

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
        Schema::dropIfExists('programas_educativos');
    }
}
