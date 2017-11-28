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

    public function saveBetPAst($dataArray){
        $array = array(
            'bet_id' => $dataArray['bet_id'],
            'player' => $dataArray['player'],
            'bet_date_time' => $dataArray['bet_date_time'],
            'bet_amt' => $dataArray['bet_amt'],
            'bet_type' => $dataArray['bet_type'],
            'noofteams' => $dataArray['noofteams'],
            'win' => $dataArray['win'],
            'lose' => $dataArray['lose'],
            'result' => $dataArray['result'],
            'cancelled' => $dataArray['cancelled'],
            'finish' => $dataArray['finish'],
            'operator' => $dataArray['operator'],
//            'datechanged' => $dataArray['datechanged'],
            'teaser_pt' => $dataArray['teaser_pt'],
        );
        return DB::table($this->table)
            ->insert($array);
    }

    public function saveBetPAstdet($dataArray){
        $array = array(
            'bet_detail_id' => $dataArray['bet_detail_id'],
            'bet_id' => $dataArray['bet_id'],
            'game_date_time' => $dataArray['game_date_time'],
            'grade_no' => $dataArray['grade_no'],
            'sport' => $dataArray['sport'],
            'team' => $dataArray['team'],
            'opponent' => $dataArray['opponent'],
            'subtype' => $dataArray['subtype'],
            'line' => $dataArray['line'],
            'odds' => $dataArray['odds'],
            'result_type' => $dataArray['result_type'],
            'remark' => $dataArray['remark'],
            'score' => $dataArray['score'],
            'tpitcher' => $dataArray['tpitcher'],
            'vspitcher' => $dataArray['vspitcher'],
            'pt_bought' => $dataArray['pt_bought'],
        );
        return DB::table('bet_past_detail')
            ->insert($array);
    }
}
