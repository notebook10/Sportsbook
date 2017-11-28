<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Sched extends Model
{
    protected $table = 'score';

    public function getall(){
        return DB::table($this->table)
            ->where('line', '>=', 900)
            ->orWhere('line', '=', 0)
            ->where('status', '=' ,'T')
            ->orWhere('status', '=' ,'U')
            ->get();
    }
    public function getTeamFavorite(){
        return DB::table($this->table)
            ->where('line', '<', 0)
            ->orWhere('vs_line', '<', 0)
            ->where('status', '=' ,'T')
            ->orWhere('status', '=' ,'U')
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
            ->where('tgameno', $TGAMENO)
            ->where('sport', $SPORT)
            ->first();
    }
}
