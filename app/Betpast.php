<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Betpast extends Model
{
    //
    protected $table = 'bet_past';

    public function getAll($player){
        return DB::table($this->table)
            ->leftjoin('bet_past_detail','bet_past.bet_id', '=', 'bet_past_detail.bet_id')
            ->where('player', $player)
            ->get();
    }
}
