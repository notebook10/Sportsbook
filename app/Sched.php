<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Sched extends Model
{
    protected $table = 'sched';

    public function getAllTeam(){
        return DB::table($this->table)
            ->get();
    }
    public function getSchedByTeam($TEAM){
        return DB::table($this->table)
            ->where('TEAM', $TEAM)
            ->first();
    }
}
