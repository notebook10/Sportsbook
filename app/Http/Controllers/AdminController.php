<?php

namespace App\Http\Controllers;

use App\BetcurDetail;
use Illuminate\Http\Request;
use App\Betcur;
use App\Betpast;
use App\Customer;
use App\operator;
use App\Player;
use App\User;
use App\Sched;
use Auth;
use phpDocumentor\Reflection\Types\Array_;
use Validator;
use Theme;
use Illuminate\Support\Facades\Redirect;
use Input;
use DB;
ignore_user_abort(true);
class AdminController extends Controller
{

    public function sysopPage(){
        $sched = new BetcurDetail();
        $allBet = $sched->getALLFinish();
        $dataArray = array(
            'allBet' => $allBet,
        );
        return view('sysoppage/sysopPage',$dataArray);
    }

    public function updateScore(Request $request){
        $betDetails = new BetcurDetail();
        $betDetails ->updateScore();
        return $betDetails;
    }


    public function getTeamFinish(){
        date_default_timezone_set('America/Los_Angeles');
        $BetCur = new Betcur();
        $Detail = new BetcurDetail();
        $Cust = new Player();

        $scores = DB::table('bet_cur_detail')
            ->leftjoin('score','bet_cur_detail.grade_no','=','score.team_grade')
//            ->leftjoin('bet_cur','bet_cur_detail.bet_id','=','bet_cur.bet_id')
            ->select('score.team_grade AS team_grade','score.team_score AS team_score','score.vs_score AS vs_score','score.total AS total','bet_cur_detail.grade_no','bet_cur_detail.score','bet_cur_detail.subtype','bet_cur_detail.line','bet_cur_detail.pt_bought')
            ->where('team_score', '>','0')
            ->orWhere('vs_score', '>','0');
//            ->get();
        $allscores = DB::table('bet_cur_detail')
            ->leftjoin('score','bet_cur_detail.grade_no','=','score.vs_grade')
//            ->leftjoin('bet_cur','bet_cur_detail.bet_id','=','bet_cur.bet_id')
            ->select('score.team_grade AS team_grade','score.team_score AS team_score','score.vs_score AS vs_score','score.total AS total','bet_cur_detail.grade_no','bet_cur_detail.score','bet_cur_detail.subtype','bet_cur_detail.line','bet_cur_detail.pt_bought')
            ->where('team_score', '>','0')
            ->orWhere('vs_score', '>','0')
            ->unionAll($scores)
            ->get();
//        var_dump($allscores);
        foreach ($allscores as $value) {
//            var_dump($value->grade_no .':'. $value->team_score .'-'. $value->vs_score);
            $grade_no = $value->grade_no;
            if($grade_no[0] == "T"){
                $scoreDisplay = $value->team_score .'-'. $value->vs_score;
                $scoreDifference = $value->team_score - $value->vs_score;
            }else{
                $scoreDisplay = $value->vs_score .'-'. $value->team_score;
                $scoreDifference = $value->vs_score - $value->team_score;
            }
//            $result_type = "";
//            if($value->team_score > 0 || $value->vs_score >0){
                if($value->subtype == "S"){
                    if(($value->line + $scoreDifference) > 0){
                        $result_type = "W";
                    }elseif (($value->line + $scoreDifference) < 0){
                        $result_type = "L";
                    } else {
                        $result_type = "T";
                    }
                }elseif($value->subtype == "O"){
                    $scoreTotal = $value->team_score + $value->vs_score;
                    if($scoreTotal > $value->line){
                        $result_type = "W";
                    }elseif ($scoreTotal < $value->line){
                        $result_type = "L";
                    }else {
                        $result_type = "T";
                    }
                }else{
                    $scoreTotal = $value->team_score + $value->vs_score;
                    if($scoreTotal < $value->line){
                        $result_type = "W";
                    }elseif ($scoreTotal > $value->line){
                        $result_type = "L";
                    }else {
                        $result_type = "T";
                    }
                }
//            }
            $dataArray = [
                "subtype" => $value->subtype,
                "grade_no" => $value->grade_no,
                "score" => $scoreDisplay,
                "result_type" => $result_type,

            ];
            $Detail->updateAllDetail($dataArray);
        }
//        for floyd only
        $p2_odds = 240;
        $p3_odds = 500;
        $p4_odds = 1000;
        $p5_odds = 2000;
        $p6_odds = 3500;
        $p7_odds = 6000;
        $p8_odds = 10000;
        $p9_odds = 20000;
        $p10_odds = 35000;
        $t2_odds = -110;
        $t3_odds = 160;
        $t4_odds = 250;
        $t5_odds = 400;
        $t6_odds = 600;
        $t7_odds = 800;
        $t8_odds = 1300;
        $t9_odds = 1500;
        $t10_odds = 2000;

        $parent = $Detail->joinParentChild();
        $var = "";
        foreach ($parent as $value){
            $result = 0;
            if($value->bet_type == "S"){
                $result_type = $value->resB;
                if($result_type == "W"){
                    $result = $value->win;
                }elseif ($result_type == "L"){
                    $result = $value->lose * -1;
                }else {
                    $result = 0;
                }
                $finish = 1;
            }elseif ($value->bet_type == "P"){
//                var_dump($value->team , $value->odds);
                $temp = AdminController::getdata($value->betid, $var);
                $result_type = $temp;
                // see if one of the teams lost
                if( strpos( $result_type, "L" ) !== false > 0){
                    $result = $value->lose * -1;
                    $finish = 1;
                } else {
                    $noofWin = substr_count( $result_type, "W" );
                    // see if all game is finish
                    if(strlen($result_type) == $value->noofteams){
                        //check if number of wins equal to number of teams
                        if($noofWin == $value->noofteams){
                            $result = $value->win;
                        }else{
                         //else, means has tie or cancelled
                            $payOut = "";
                            $keys = "";
                            $payOd = AdminController::istrueOdds($payOut);
                            if($noofWin == 1){
                                if($value->odds < 0){
                                    $result = $value->bet_amt * 100/abs($value->odds);
                                } else {
                                    $result = $value->bet_amt * $value->odds/100;
                                }
                            }elseif ($noofWin == 2){
                                if($value->is_trueOdds == 1){
                                    foreach ($payOd as $payOds) {
                                        if ($value->betid == $payOds[1]){
                                            $result = $value->bet_amt * $payOds[0];
                                        }
                                    }
                                }else {
                                    $result = $value->bet_amt * $p2_odds/100;
                                }
                            }elseif ($noofWin == 3){
                                if($value->is_trueOdds == 1){
                                    foreach ($payOd as $payOds) {
                                        if ($value->betid == $payOds[1]){
                                            $result = $value->bet_amt * $payOds[0];
                                        }
                                    }
                                }else {
                                    $result = $value->bet_amt * $p3_odds/100;
                                }
                            }elseif ($noofWin == 4){
                                if($value->is_trueOdds == 1){
                                    foreach ($payOd as $payOds) {
                                        if ($value->betid == $payOds[1]){
                                            $result = $value->bet_amt * $payOds[0];
                                        }
                                    }
                                }else {
                                    $result = $value->bet_amt * $p4_odds/100;
                                }
                            }elseif ($noofWin == 5){
                                if($value->is_trueOdds == 1){
                                    foreach ($payOd as $payOds) {
                                        if ($value->betid == $payOds[1]){
                                            $result = $value->bet_amt * $payOds[0];
                                        }
                                    }
                                }else {
                                    $result = $value->bet_amt * $p5_odds/100;
                                }
                            }elseif ($noofWin == 6){
                                $result = $value->bet_amt * $p6_odds/100;
                            }elseif ($noofWin == 7){
                                $result = $value->bet_amt * $p7_odds/100;
                            }elseif ($noofWin == 8){
                                $result = $value->bet_amt * $p8_odds/100;
                            }elseif ($noofWin == 9){
                                $result = $value->bet_amt * $p9_odds/100;
                            }elseif ($noofWin == 10){
                                $result = $value->bet_amt * $p10_odds/100;
                            }
                            $finish = 1;
                        }
                    }else {
                        $result = 0;
                        $finish = 0;
                    }
                }

            } else {
                $temp = AdminController::getdata($value->betid, $var);
                $result_type = $temp;
//                if bet teaser is super teaser
                if($value->is_superTeaser == 1){
                    if(strlen($result_type) == $value->noofteams){
                        if( strpos( $result_type, "T" ) !== false > 0 || strpos( $result_type, "C" ) !== false > 0){
                            $result = 0;
                        } else {
                            if( strpos( $result_type, "L" ) !== false > 0){
                                $result = $value->lose * -1;
                            } else {
                                $result = $value->win;
                            }
                        }
                        $finish = 1;
                    }else {
                        $result = 0;
                        $finish = 0;
                    }
                }else {
//                if bet teaser is regular teaser
                    if( strpos( $result_type, "L" ) !== false > 0){
                        $result = $value->lose * -1;
                        $finish = 1;
                    } else {
                        $noofWin = substr_count( $result_type, "W" );
                        if(strlen($result_type) == $value->noofteams){
                            if($noofWin == 1){
                                if($value->odds < 0){
                                    $result = $value->bet_amt * 100/abs($value->odds);
                                } else {
                                    $result = $value->bet_amt * $value->odds/100;
                                }
                            } elseif ($noofWin == 2){
                                $result = $value->bet_amt * $t2_odds/100;
                            } elseif ($noofWin == 3){
                                $result = $value->bet_amt * $t3_odds/100;
                            } elseif ($noofWin == 4){
                                $result = $value->bet_amt * $t4_odds/100;
                            } elseif ($noofWin == 5){
                                $result = $value->bet_amt * $t5_odds/100;
                            } elseif ($noofWin == 6){
                                $result = $value->bet_amt * $t6_odds/100;
                            } elseif ($noofWin == 7){
                                $result = $value->bet_amt * $t7_odds/100;
                            } elseif ($noofWin == 8){
                                $result = $value->bet_amt * $t8_odds/100;
                            } elseif ($noofWin == 9){
                                $result = $value->bet_amt * $t9_odds/100;
                            } elseif ($noofWin == 10){
                                $result = $value->bet_amt * $t10_odds/100;
                            }
                            $finish = 1;
                        }else {
                            $result = 0;
                            $finish = 0;
                        }
                    }
                }

            }
//            ************update parent bet type and result***************************
            $dataArray =[
                'bet_id' => $value->betid,
                'bet_type' => $value->bet_type,
                'result' => $result,
                'result_type' => $result_type,
//                'finish' => $finish,
            ];
            $BetCur->updateParent($dataArray);

//            **********update daily result win or lose in player*****************************
            $Dresult = "";
            $daily_result = AdminController::gettotalbyPlayer($value->player, $Dresult);
            $pst = date('Y-m-d H:i:s');
            $rsltdate = date('N', strtotime($pst));
            if($rsltdate == 1){
                $dayRslt = "mon_rslt";
                $rslt_value = $value->mon_rslt;
            }elseif ($rsltdate == 2){
                $dayRslt = "tue_rslt";
                $rslt_value = $value->tue_rslt;
            }elseif ($rsltdate == 3){
                $dayRslt = "wed_rslt";
                $rslt_value = $value->wed_rslt;
            }elseif ($rsltdate == 4){
                $dayRslt = "thu_rslt";
                $rslt_value = $value->thu_rslt;
            }elseif ($rsltdate == 5){
                $dayRslt = "fri_rslt";
                $rslt_value = $value->fri_rslt;
            }elseif ($rsltdate == 6){
                $dayRslt = "sat_rslt";
                $rslt_value = $value->sat_rslt;
            }elseif ($rsltdate == 7){
                $dayRslt = "sun_rslt";
                $rslt_value = $value->sun_rslt;
            }
            $resultArray =[
                'player' => $value->player,
                'rslt_value' => $rslt_value,
                'dayRslt' => $dayRslt,
                'resultbyPlayer' =>$daily_result,
            ];
            $Cust->saveDResult($resultArray);
        }
//            **************turn finish to 1*************************
        $thisBet = $BetCur->getnoofTeams();
        foreach ($thisBet as $value) {
            if($value->bet_type == "S"){
                if($value->result_type != ""){
                    $fin = 1;
                }else {
                    $fin = 0;
                }
            }elseif ($value->bet_type == "P"){
                $temp2 = AdminController::getdata($value->bet_id, $var);
                $result_type = $temp2;
                if( strpos( $result_type, "L" ) !== false > 0){
                    $fin = 1;
                } else {
                    if(strlen($result_type) == $value->noofteams){
                        $fin = 1;
                    }else {
                        $fin = 0;
                    }
                }

            } else {
                $temp2 = AdminController::getdata($value->bet_id, $var);
                $result_type = $temp2;
//                if bet teaser is super teaser
                if($value->is_superTeaser == 1){
                    if(strlen($result_type) == $value->noofteams){
                        $fin = 1;
                    }else {
                        $fin = 0;
                    }
                }else {
//                if bet teaser is regular teaser
                    if( strpos( $result_type, "L" ) !== false > 0){
                        $fin = 1;
                    } else {
                        if(strlen($result_type) == $value->noofteams){
                            $fin = 1;
                        }else {
                            $fin = 0;
                        }
                    }
                }
            }
            $finishArray =[
                'bet_id' => $value->bet_id,
                'bet_type' => $value->bet_type,
                'finish' => $fin,
            ];
//            var_dump($finishArray);
            $BetCur->updatetoFinish($finishArray);
        }

//            **************update office daily result*************************
        $ODresult = "";
        $office_result = AdminController::gettotalbyOffice($ODresult);
        $offpst = date('Y-m-d H:i:s');
        $Offrsltdate = date('N', strtotime($offpst));
        if($Offrsltdate == 1){
            $OffdayRslt = "mon_rslt";
        }elseif ($Offrsltdate == 2){
            $OffdayRslt = "tue_rslt";
        }elseif ($Offrsltdate == 3){
            $OffdayRslt = "wed_rslt";
        }elseif ($Offrsltdate == 4){
            $OffdayRslt = "thu_rslt";
        }elseif ($Offrsltdate == 5){
            $OffdayRslt = "fri_rslt";
        }elseif ($Offrsltdate == 6){
            $OffdayRslt = "sat_rslt";
        }elseif ($Offrsltdate == 7){
            $OffdayRslt = "sun_rslt";
        }
        $dataOffice =[
            'name' => "office",
            'resultbyOffice' =>$office_result,
            'dayRslt' => $OffdayRslt,
        ];
        $Cust->savetoOffice($dataOffice);
        $parentforOffice = $BetCur->getFinishforOffice();
        foreach ($parentforOffice as $value){
            $dataArray =[
                'bet_id' => $value->bet_id,
            ];
            $BetCur->updatetoOffice($dataArray);
        }

//        ***************transfer data from bet_cur to bet_past******************
        $betcur = DB::table('bet_cur')->where('finish','=','1')->where('Transferred','=','0')->get();
        foreach ($betcur as $item) {
            $dataArray = [
                'bet_id' => $item->bet_id,
                'player' => $item->player,
                'bet_date_time' => $item->bet_date_time,
                'bet_amt' => $item->bet_amt,
                'bet_type' => $item->bet_type,
                'noofteams' => $item->noofteams,
                'win' => $item->win,
                'lose' => $item->lose,
                'result' => $item->result,
                'cancelled' => $item->cancelled,
                'finish' => $item->finish,
                'operator' => $item->operator,
//                'datechanged' => $item->datechanged,
                'teaser_pt' => $item->teaser_pt,
            ];
            $BetPast = new Betpast();
            $BetPast->saveBetPAst($dataArray);
//            var_dump($dataArray);
        }

//        ***************transfer data from bet_cur_detail to bet_past_detail******************
        $betcurdet = DB::table('bet_cur')->leftjoin('bet_cur_detail','bet_cur.bet_id','=','bet_cur_detail.bet_id')->where('bet_cur.finish','=','1')->where('bet_cur.Transferred','=','0')->get();
        foreach ($betcurdet as $item) {
            $dataArray = [
                'bet_detail_id' => $item->bet_detail_id,
                'bet_id' => $item->bet_id,
                'game_date_time' => $item->game_date_time,
                'grade_no' => $item->grade_no,
                'sport' => $item->sport,
                'team' => $item->team,
                'opponent' => $item->opponent,
                'subtype' => $item->subtype,
                'line' => $item->line,
                'odds' => $item->odds,
                'result_type' => $item->result_type,
                'remark' => $item->remark,
                'score' => $item->score,
                'tpitcher' => $item->tpitcher,
                'vspitcher' => $item->vspitcher,
                'pt_bought' => $item->pt_bought,
            ];
            $BetPastdet = new Betpast();
            $BetPastdet->saveBetPAstdet($dataArray);
        }
        $toTransferred = DB::table('bet_cur')->select('bet_cur.bet_id as bet_id')->leftjoin('bet_past','bet_cur.bet_id','=','bet_past.bet_id')->where('bet_cur.finish','=','1')->where('bet_cur.Transferred','=','0')->get();
        foreach ($toTransferred as $item) {
            $dataArray = [
                'bet_id' => $item->bet_id
            ];
            $BetCur->updateTransferred($dataArray);
        }
//        $toTransferred2 = DB::table('bet_cur_detail')->select('bet_cur_detail.bet_detail_id as bet_detail_id')->leftjoin('bet_past_detail','bet_cur_detail.bet_detail_id','=','bet_past_detail.bet_detail_id')->where('bet_cur_detail.finish','=','1')->where('bet_cur_detail.Transferred','=','0')->get();
//        foreach ($toTransferred2 as $item) {
//            $dataArray = [
//                'bet_detail_id' => $item->bet_detail_id
//            ];
//            $Detail->updateTransferred($dataArray);
//        }

        return "0";
    }


    public static function getdata($betid, $var){
        $Detail = new BetcurDetail();
        $parent = $Detail->joinForResType();
//        dd($parent);
        foreach ($parent as $item) {
            if($betid == $item->betid){
                $var .= $item->resB;
//                echo $item->resB;
            }
//            var_dump($item->result_typeA);
        }
        return $var;

    }
    public static function gettotalbyPlayer($player ){
        $Detail = new Betcur();
        $data = $Detail->getbetResult();
        $i = 0;
        $Dresult = 0;
        foreach ($data as $item) {
            if($player == $item->player){
                $i++;
                $Dresult += $item->result;
            }
        }
        return $Dresult;
    }
    public static function gettotalbyOffice(){
        $Detail = new Betcur();
        $data = $Detail->getbetResult2();
        $i = 0;
        $ODresult = 0;
        foreach ($data as $item) {
                $i++;
            $ODresult += $item->result;
        }
//        var_dump($ODresult);
        return $ODresult;
    }

    public static function istrueOdds(){
        $Detail = new BetcurDetail();
        $parent = $Detail->parlaytrueOdds();
        $arr = array();
        $payOut = array();
        foreach ($parent as $value) {

            if(strlen($value->result_type) == $value->noofteams){
                if (!isset($arr[$value->bet_id])) $arr[$value->bet_id] = array();
                $arr[$value->bet_id][] = $value;
            }

        }
        foreach ($arr as  $key => $item) {
//            var_dump($key);
            if(isset($item[0]->odds)){$itemOdds0 = $item[0]->odds;}else{$itemOdds0 = 0;}
            if(isset($item[1]->odds)){$itemOdds1 = $item[1]->odds;}else{$itemOdds1 = 0;}
            if(isset($item[2]->odds)){$itemOdds2 = $item[2]->odds;}else{$itemOdds2 = 0;}
            if(isset($item[3]->odds)){$itemOdds3 = $item[3]->odds;}else{$itemOdds3 = 0;}
            if(isset($item[4]->odds)){$itemOdds4 = $item[4]->odds;}else{$itemOdds4 = 0;}
            if(isset($item[5]->odds)){$itemOdds5 = $item[5]->odds;}else{$itemOdds5 = 0;}

            if($itemOdds0 < 0) {
                $odds0 =(-($itemOdds0) + 100) / -($itemOdds0);
            } else if($item[0]->odds > 0) {
                $odds0 =  (+($itemOdds0) + 100) / 100;
            } else {
                $odds0 = 1;
            }

            if($itemOdds1 < 0) {
                $odds1 =(-($itemOdds1) + 100) / -($itemOdds1);
            } else if($item[0]->odds > 0) {
                $odds1 =  (+($itemOdds1) + 100) / 100;
            } else {
                $odds1 = 1;
            }

            if($itemOdds2 < 0) {
                $odds2 =(-($itemOdds2) + 100) / -($itemOdds2);
            } else if($itemOdds2 > 0) {
                $odds2 =  (+($itemOdds2) + 100) / 100;
            } else {
                $odds2 = 1;
            }

            if($itemOdds3 < 0) {
                $odds3 =(-($itemOdds3) + 100) / -($itemOdds3);
            } else if($itemOdds3 > 0) {
                $odds3 =  (+($itemOdds3) + 100) / 100;
            } else {
                $odds3 = 1;
            }

            if($itemOdds4 < 0) {
                $odds4 =(-($itemOdds4) + 100) / -($itemOdds4);
            } else if($itemOdds4 > 0) {
                $odds4 =  (+($itemOdds4) + 100) / 100;
            } else {
                $odds4 = 1;
            }

            if($itemOdds5 < 0) {
                $odds5 =(-($itemOdds5) + 100) / -($itemOdds5);
            } else if($itemOdds5 > 0) {
                $odds5 =  (+($itemOdds5) + 100) / 100;
            } else {
                $odds5 = 1;
            }


            $PayOdds = ($odds0 * $odds1 * $odds2 * $odds3 * $odds4 * $odds5) - 1;
            array_push($payOut,[$PayOdds,$key]);

        }



        return $payOut;
    }



}