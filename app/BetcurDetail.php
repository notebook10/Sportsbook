<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Response;
use App\CONCAT;

class BetcurDetail extends Model
{
    protected $table = 'bet_cur_detail';
    public $timestamps = false;
    //

    public function getAllBetDetail(){
        return DB::table($this->table)
            ->where('result_type', '=', '')
            ->get();
    }

    public function getALLFinish(){
        return DB::table($this->table)
            ->leftjoin('bet_cur','bet_cur.bet_id', '=', 'bet_cur_detail.bet_id')
//            ->where('result_type','=','')
            ->get();
    }

    public function updateScore($grade_no){
        return DB::table($this->table)
            ->where('grade_no', $grade_no)
            ->update(['bet_cur_detail.score' => DB::raw('score.field')]);
    }

    public function joinParentChild(){
        return DB::table($this->table)
            ->leftjoin('bet_cur', 'Bet_cur_detail.bet_id', '=', 'bet_cur.bet_id')
            ->leftjoin('cust', 'bet_cur.player', '=', 'cust.name')
            ->select('bet_cur.bet_id as betid', 'bet_cur.bet_type', 'bet_cur.result_type as resA', 'bet_cur.result', 'bet_cur.finish', 'bet_cur.win', 'bet_cur.lose', 'bet_cur.noofteams', 'bet_cur.is_superTeaser', 'bet_cur.is_trueOdds', 'bet_cur.bet_amt', 'bet_cur.datechanged', 'bet_cur.player',
                    'bet_cur_detail.result_type as resB','bet_cur_detail.odds','bet_cur_detail.team','bet_cur_detail.result_type','bet_cur_detail.score',
                    'cust.mon_rslt','cust.tue_rslt','cust.wed_rslt','cust.thu_rslt','cust.fri_rslt','cust.sat_rslt','cust.sun_rslt')
            ->where('bet_cur_detail.result_type','!=','')
            ->where('bet_cur_detail.score','!=','')
            ->where('bet_cur.finish','=','0')
            ->get();
    }
    public function joinForResType(){
        return DB::table($this->table)
            ->leftjoin('bet_cur', 'Bet_cur_detail.bet_id', '=', 'bet_cur.bet_id')
            ->select('bet_cur.bet_id as betid','bet_cur_detail.result_type as resB')
            ->where('bet_cur_detail.result_type','!=','')
            ->where('bet_cur_detail.score','!=','')
            ->where('bet_cur.finish','=','0')
            ->get();
    }

    public function updateAllDetail($dataArray){
        $array = array(
            'score' => $dataArray["score"],
            'result_type' => $dataArray["result_type"],
            );
        $grade_no = $dataArray["grade_no"];
        $subtype = $dataArray["subtype"];
//        var_dump($team_grade);
        return DB::table($this->table)
            ->where('grade_no',$grade_no)
            ->where('subtype', $subtype)
            ->update($array);
    }

    public function  parlaytrueOdds(){
        return DB::table($this->table)
            ->leftjoin('bet_cur', 'Bet_cur_detail.bet_id', '=', 'bet_cur.bet_id')
            ->select('bet_cur.noofteams','bet_cur.result_type', 'bet_cur_detail.odds', 'bet_cur_detail.bet_id')
            ->where('bet_cur.bet_type', '=', 'P')
            ->where('bet_cur.finish','=','0')
            ->where('bet_cur.is_trueOdds','=','1')
            ->where('bet_cur_detail.result_type','=','W')
            ->get();
    }

    public function updateTransferred($dataArray){
        $bet_detail_id = $dataArray['bet_detail_id'];
        return DB::table($this->table)
            ->where('bet_detail_id', $bet_detail_id)
            ->update(['Transferred' => 1]);
    }
}
