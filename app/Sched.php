<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Sched extends Model
{
    protected $table = 'sched';

    public function getall(){
        return DB::table($this->table)
            ->where('LINE', '>=', 999)
            ->orWhere('LINE', '=', 0)
            ->get();
    }
    public function getTeamFavorite(){
        return DB::table($this->table)
            ->where('LINE', '<', 0)
            ->orWhere('VS_LINE', '<', 0)
//            ->orderBy('LINE')
            ->get();
    }
//    public function getTeamFavTeam(){
//        return DB::table($this->table)
//            ->where('LINE', '<', 0)
//            ->get();
//    }
//    public function getTeamFavOpponent(){
//        return DB::table($this->table)
//            ->where('VS_LINE', '<', 0)
//            ->get();
//    }
    public function getSchedByTeamNo($TGAMENO, $SPORT){
        return DB::table($this->table)
            ->where('TGAMENO', $TGAMENO)
            ->where('SPORT', $SPORT)
            ->first();
    }
}
