<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriasHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materias_horarios', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->id('id');
            $table->bigInteger('Materia')->unsigned();
            $table->char('Dia', 20);
            $table->char('HoraI', 15);
            $table->char('HoraF', 15);
            $table->char('Aula', 50);
            $table->char('ModalidadClase', 50);

            $table->timestamps();

            $table->foreign('Materia')->references('id')->on('materias')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materias_horarios');
    }
}
