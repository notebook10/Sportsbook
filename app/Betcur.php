<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Http\Request;
use Response;

class Betcur extends Model
{
    protected $table = 'bet_cur';
    public $timestamps = false;
    public function getAllDetails($player){
        return DB::table($this->table)
//            ->join('bet_cur_detail','bet_cur.bet_id', '=', 'bet_cur_detail.bet_id')
            ->where('player', $player)
            ->first();
    }

    public function getALL($player){
        return DB::table($this->table)
            ->leftjoin('bet_cur_detail','bet_cur.bet_id', '=', 'bet_cur_detail.bet_id')
//            ->select('bet_cur.bet_amt', 'bet_cur.bet_type', 'bet_cur.player', 'bet_cur_detail.game_date_time', 'bet_cur_detail.team', 'bet_cur_detail.line', 'bet_cur_detail.odds', 'bet_cur_detail.bet_id')
            ->where('player',$player)
            ->where('finish','=','0')
            ->get();
    }

    public function insertStraightBets($dataArray){
        foreach ($dataArray as $value) {
            date_default_timezone_set('America/Los_Angeles');
            $currentDate = date("Y-m-d h:i:s", time());
            $betCur = new Betcur();
            $betCur->player = $value["player"];
            $betCur->bet_date_time = $currentDate;
            $betCur->bet_amt= $value["bet_amt"];
            $betCur->bet_type = $value['bet_type'];
            $betCur->win = $value['win'];
            $betCur->lose = $value['lose'];
            $betCur->save();

            $insertedId = DB::getPdo()->lastInsertId();

            $betCurDetail = new BetcurDetail();
            $betCurDetail->bet_id = $insertedId;
            $betCurDetail->sport = $value['sport'];
            $betCurDetail->team = $value['team'];
            $betCurDetail->line = $value['line'];
            $betCurDetail->odds = $value['odds'];
            $betCurDetail->game_date_time = $value['game_date_time'];
            $betCurDetail->grade_no = $value['grade_no'];
            $betCurDetail->subtype = $value['subtype'];
            $betCurDetail->pt_bought = $value['pt_bought'];
            $betCurDetail->save();
        }
    }

    public function insertParlayBets($arr){
        foreach ($arr as $value) {
            date_default_timezone_set('America/Los_Angeles');
            $currentDate = date("Y-m-d h:i:s", time());
            $betCur = new Betcur();
            $betCur->player = $value["player"];
            $betCur->bet_date_time = $currentDate;
            $betCur->bet_amt = $value["bet_amt"];
            $betCur->bet_type = $value['bet_type'];
            $betCur->noofteams = $value['noofteams'];
            $betCur->win = $value['win'];
            $betCur->lose = $value['lose'];
            $betCur->save();

            $insertedId = DB::getPdo()->lastInsertId();

            $temp = $value["Child"];
            foreach ($temp as $i => $v){
                $betCurDetail = new BetcurDetail();
                $betCurDetail->bet_id = $insertedId;
                $betCurDetail->sport = $v['sport'];
                $betCurDetail->team = $v['team'];
                $betCurDetail->line = $v['line'];
                $betCurDetail->odds = $v['odds'];
                $betCurDetail->game_date_time = $v['game_date_time'];
                $betCurDetail->grade_no = $v['grade_no'];
                $betCurDetail->subtype = $v['subtype'];
                $betCurDetail->save();
            }
        }
    }

    public function insertTeaserBets($arr){
        foreach ($arr as $value) {
            date_default_timezone_set('America/Los_Angeles');
            $currentDate = date("Y-m-d h:i:s", time());
            $betCur = new Betcur();
            $betCur->player = $value["player"];
            $betCur->bet_date_time = $currentDate;
            $betCur->bet_amt = $value["bet_amt"];
            $betCur->bet_type = $value['bet_type'];
            $betCur->noofteams = $value['noofteams'];
            $betCur->win = $value['win'];
            $betCur->lose = $value['lose'];
            $betCur->teaser_pt = $value['teaser_pt'];
            $betCur->save();

            $insertedId = DB::getPdo()->lastInsertId();

            $temp = $value["Child"];
            foreach ($temp as $i => $v){
                $betCurDetail = new BetcurDetail();
                $betCurDetail->bet_id = $insertedId;
                $betCurDetail->sport = $v['sport'];
                $betCurDetail->team = $v['team'];
                $betCurDetail->line = $v['line'];
                $betCurDetail->odds = $v['odds'];
                $betCurDetail->game_date_time = $v['game_date_time'];
                $betCurDetail->grade_no = $v['grade_no'];
                $betCurDetail->subtype = $v['subtype'];
                $betCurDetail->save();
            }
        }
    }

    public function getnoofTeams(){
        return DB::table($this->table)
            ->select('bet_type', 'bet_id', 'noofteams', 'is_superTeaser', 'result_type')
            ->where('finish', '=', '0')
            ->get();
    }
    public function getbetResult(){
        return DB::table($this->table)
            ->select('result', 'finish', 'player')
            ->where('finish', '=', '0')
            ->get();
    }
    public function getbetResult2(){
        return DB::table($this->table)
            ->select('result', 'finish', 'player')
            ->where('toOffice', '=', '0')
            ->get();
    }

    public function getFinishforOffice(){
        return DB::table($this->table)
            ->select('bet_id')
            ->where('finish', '=', '1')
            ->get();
    }

    public function updateParent($dataArray){
        $array = array(
            'result_type' =>$dataArray['result_type'],
            'result' =>$dataArray['result'],
//            'finish' =>$dataArray['finish'],
        );
        $bet_type = $dataArray["bet_type"];
        $bet_id = $dataArray["bet_id"];
        return DB::table($this->table)
            ->where('bet_id', $bet_id)
            ->where('bet_type', $bet_type)
            ->update($array);
    }

    public function updatetoFinish($finishArray){
        $array = array(
            'finish' =>$finishArray['finish'],
        );
//        $result_type = $finishArray["result_type"];
        $bet_type = $finishArray["bet_type"];
        $bet_id = $finishArray["bet_id"];
        return DB::table($this->table)
//            ->where('noofteams', $result_type)
//            ->orwhere('noofteams', $result_type)
            ->where('bet_id', $bet_id)
            ->where('bet_type', $bet_type)
            ->update($array);
    }

    public function updatetoOffice($dataArray){
        $bet_id = $dataArray["bet_id"];
        return DB::table($this->table)
        ->where('finish', '=' ,'1')
        ->where('bet_id', $bet_id)
        ->update(['toOffice' => 1]);
    }

    public function updateTransferred($dataArray){
        $bet_id = $dataArray['bet_id'];
        return DB::table($this->table)
            ->where('bet_id', $bet_id)
            ->update(['Transferred' => 1]);
    }


}
