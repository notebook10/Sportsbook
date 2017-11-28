<?php

namespace App\Http\Controllers;

use App\Betcur;
use App\Betpast;
use App\Customer;
use App\operator;
use App\Player;
use Illuminate\Http\Request;
use App\User;
use App\Sched;
use Auth;
use phpDocumentor\Reflection\Types\Array_;
use Validator;
use Theme;
use Illuminate\Support\Facades\Redirect;
use Input;

class HomeController extends Controller
{
    public function sysopLogin(){
        return view('default/login');
    }

    public function index(){
        if(Auth::check()){
            $user = Auth::user();
            $direct = operator::checkusertype($user->OperatorID);
            return Redirect::to($direct);
        }else{
            return view('default/login');
        }
    }
    public function login(Request $request){
        $username = $request->input('username');
        $password = $request->input('password');

        $data = [
            'username' => $username,
            'password' => $password
        ];
        $rules = [
            'username' => 'required|min:2',
            'password' => 'required|min:2'
        ];
        $validator = Validator::make($data,$rules);
        if($validator->fails()){
            return Redirect::to('/');
        }else {
            $user = operator::where('INITIALS', '=', $username)
                ->where('PW', '=', $password)
                ->first();
            if ($user) {
            Auth::login($user);
                return Redirect::to('/');
            } else {
                return Redirect::to('/')
                    ->withErrors([
                        'validate' => 'Wrong Username or Password!',
                    ]);
            }
        }
    }

    public function logout(){
        Auth::logout();
        return Redirect::to('/');
    }

    public function main(){
        $sched = new Sched();
        $allTeam = $sched->getTeamFavorite();
        $all = $sched->getall();
        $dataArray = array(
            'sched' => $allTeam,
            'schedall' => $all,
        );

        $theme = Theme::uses('default')->layout('layout')->setTitle('Main');
        return $theme->of('sportsbook.main',$dataArray)->render();
    }


    public function getSched(Request $request){
        $TGAMENO = $request->input('TGAMENO');
        $SPORT = $request->input('SPORT');
        $sched = new Sched();
        $row = $sched->getSchedByTeamNo($TGAMENO, $SPORT);
        $dataArray = [
            'TEAM' => $row->team,
            'OPPONENT' => $row->opponent,
            'TGAMENO' => $row->tgameno,
//            'GAME_TIME' => $row->GAME_TIME,
            'LINE' => $row->line,
            'VS_LINE' => $row->vs_line,
            'VSGAMENO' => $row->vsgameno,
            'TOTAL' => $row->total,
//            'GAME_DATE' => $row->GAME_DATE,
            'OVER_ODDS' => $row->over_odds,
            'UNDER_ODDS' => $row->under_odds,
            'TEAM_ODDS' => $row->team_odds,
//            'OPPONENT' => $row->OPPONENT,
            'VS_ODDS' => $row->vs_odds,
            'SPORT' => $row->sport,
            'GAME_DATE_TIME' => $row->game_date_time,
//            'GAME_TIME' => $row->GAME_TIME,
            'TEAM_GRADE' => $row->team_grade,
            'VS_GRADE' => $row->vs_grade,
            'TPITCHER' => $row->tpitcher,
            'VSPITCHER' => $row->vspitcher

        ];
        return $dataArray;
    }

    public function autocomplete(Request $request){
        $term =  $request->input('term');
        $cust = new Player();
        $results = array();

        $queries = $cust->getAllPlayer($term);

        foreach ($queries as $query)
        {
            $results[] = [
                'id' => $query->custid,
                'value' => $query->name,
                'password' => $query->password,
                'balance' => $query->balance,
                'standing' => $query->standing,
                'custid' => $query->custid,
                'siteID' => $query->siteID,
                'mon_rslt' => $query->mon_rslt,
                'tue_rslt' => $query->tue_rslt,
                'wed_rslt' => $query->wed_rslt,
                'thu_rslt' => $query->thu_rslt,
                'fri_rslt' => $query->fri_rslt,
                'sat_rslt' => $query->sat_rslt,
                'sun_rslt' => $query->sun_rslt,
                'cap_game' => $query->cap_game,
                'cap' => $query->cap,
                'chart' => $query->chart,
                'currentbet' => $query->currentbet,
                'int_pf' => $query->int_pf,
                'int_pf_t' => $query->int_pf_t,
                'int_cf' => $query->int_cf,
                'int_cf_t' => $query->int_cf_t,
                'int_pb' => $query->int_pb,
                'int_pb_t' => $query->int_pb_t,
                'int_cb' => $query->int_cb,
                'int_cb_t' => $query->int_cb_t,
                'int_hk' => $query->int_hk,
                'int_hk_t' => $query->int_hk_t,
                'int_bs' => $query->int_bs,
                'int_bs_t' => $query->int_bs_t,
                'int_pr' => $query->int_pr,
                'int_prly4' => $query->int_prly4,
                'parlay_teams' => $query->parlay_teams,
                'int_teaser' => $query->int_teaser,
                'int_rev' => $query->int_rev,
                'last_mon' => $query->last_mon,
                'last_tue' => $query->last_tue,
                'last_wed' => $query->last_wed,
                'last_thu' => $query->last_thu,
                'last_fri' => $query->last_fri,
                'last_sat' => $query->last_sat,
                'last_sun' => $query->last_sun,
            ];
        }
        if(count($results))
            return $results;
        else
            return ['value'=>'No Result Found','id'=>''];
    }

    public function viewBets(Request $request){
        $player = $request->input('player');
        $betcur = new Betcur();
        $row = $betcur->getAll($player);
        $dataArray = [
            'alldata' => $row
        ];
        return $dataArray;
    }

    public function viewPastBets(Request $request){
        $player = $request->input('player');
        $betpast = new Betpast();
        $row = $betpast->getAll($player);
        $dataArray = [
          'allpast' => $row
        ];
        return $dataArray;
    }

    public function saveBets(Request $request){
        $betsModel = new Betcur();
        $betsModel->insertStraightBets($request->input("dataArray"));
        return "0";
    }

//    public function saveParlayBets(Request $request){
//        $model = new Betcur();
//        $foo = $request->input("ParlayArray");
//        $dataArray = array(
//            'player' => $foo[0]["player"],
//            'bet_amt' => $foo[0]["bet_amt"],
//            'bet_type' => $foo[0]["bet_type"],
//            'win' => $foo[0]["win"],
//            'lose' => $foo[0]["lose"],
//        );
//
//        $BetcurID = $model->insertParlayBets($dataArray);
//        $model->insertParlayBetsDetails($foo, $BetcurID);
//
//        return "1";
//    }
    public function saveParlayBets(Request $request){
        $model = new Betcur();
        $foo = $request->input("ParlayArray");
//        $dataArray = array();
        $arr = array();
        foreach($foo as $values) {
            foreach($values as $value) {
                $arr[$value['PGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'Child' =>$values
                ];
                var_dump($values);
            }
        }

        $model->insertParlayBets($arr);

        return "0";
    }

    public function saveTeaserBets(Request $request){
        $model = new Betcur();
        $foo = $request->input("TeaserArray");
        $arr = array();
        foreach($foo as $values) {
            foreach($values as $value) {
                $arr[$value['TGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'teaser_pt' => $values[0]["teaser_pt"],
                    'Child' =>$values
                ];
            }
        }

        $model->insertTeaserBets($arr);

        return "0";
    }

    public function saveAllBets(Request $request){
        $betsModel = new Betcur();

        $foo = $request->input("ParlayArray");
        $arr = array();
        foreach($foo as $values) {
            foreach($values as $value) {
                $arr[$value['PGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'Child' =>$values
                ];
            }
        }

        $foo2 = $request->input("TeaserArray");
        $arr2 = array();
        foreach($foo2 as $values) {
            foreach($values as $value) {
                $arr2[$value['TGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'teaser_pt' => $values[0]["teaser_pt"],
                    'Child' =>$values
                ];
            }
        }
        $betsModel->insertStraightBets($request->input("dataArray"));
        $betsModel->insertParlayBets($arr);
        $betsModel->insertTeaserBets($arr2);

        return "0";
    }

    public function saveSPBets(Request $request){
        $betsModel = new Betcur();

        $foo = $request->input("ParlayArray");
        $arr = array();
        foreach($foo as $values) {
            foreach($values as $value) {
                $arr[$value['PGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'Child' =>$values
                ];
            }
        }

        $betsModel->insertParlayBets($arr);

        $betsModel->insertStraightBets($request->input("dataArray"));
        return "0";
    }

    public function saveSTBets(Request $request){
        $betsModel = new Betcur();

        $foo2 = $request->input("TeaserArray");
        $arr2 = array();
        foreach($foo2 as $values) {
            foreach($values as $value) {
                $arr2[$value['TGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'teaser_pt' => $values[0]["teaser_pt"],
                    'Child' =>$values
                ];
            }
        }

        $betsModel->insertTeaserBets($arr2);

        $betsModel->insertStraightBets($request->input("dataArray"));
        return "0";
    }

    public function savePTBets(Request $request){
        $betsModel = new Betcur();

        $foo = $request->input("ParlayArray");
        $arr = array();
        foreach($foo as $values) {
            foreach($values as $value) {
                $arr[$value['PGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'Child' =>$values
                ];
            }
        }

        $foo2 = $request->input("TeaserArray");
        $arr2 = array();
        foreach($foo2 as $values) {
            foreach($values as $value) {
                $arr2[$value['TGroup']] = [
                    'player' => $values[0]["player"],
                    'bet_amt' => $values[0]["bet_amt"],
                    'bet_type' => $values[0]["bet_type"],
                    'noofteams' => $values[0]["noofteams"],
                    'win' => $values[0]["win"],
                    'lose' => $values[0]["lose"],
                    'teaser_pt' => $values[0]["teaser_pt"],
                    'Child' =>$values
                ];
            }
        }

        $betsModel->insertTeaserBets($arr2);

        $betsModel->insertParlayBets($arr);

        return "0";
    }

    public function saveTotalWager(Request $request){
        $custid = $request->input("custid");
        $TotalBet = array (
            'currentbet' => $request->input("TotalBet")
        );

        $custModel = new Player();
        $custModel->saveCurrentBet($TotalBet, $custid);
    }
}






















