<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Betcur extends Model
{
    protected $table = 'bet_cur';

    public function getAllDetails($player){
        return DB::table($this->table)
//            ->join('bet_cur_detail','bet_cur.bet_id', '=', 'bet_cur_detail.bet_id')
            ->where('player', $player)
            ->first();
    }

    public function getALL($player){
        return DB::table($this->table)
            ->leftjoin('bet_cur_detail','bet_cur.bet_id', '=', 'bet_cur_detail.bet_id')
            ->select('bet_cur.bet_amt', 'bet_cur.bet_type', 'bet_cur.player', 'bet_cur_detail.game_date_time', 'bet_cur_detail.team', 'bet_cur_detail.line', 'bet_cur_detail.odds', 'bet_cur_detail.bet_id')
            ->where('player',$player)
            ->get();
    }
}
