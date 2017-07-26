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
use Validator;
use Theme;
use Illuminate\Support\Facades\Redirect;
use Input;

class HomeController extends Controller
{
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

//    public function main(){
//        $sched = new Sched();
//        $allTeam = $sched->getTeamFavorite();
//        $dataArray = array(
//            'sched' => $allTeam,
//        );
//
//        $theme = Theme::uses('default')->layout('layout')->setTitle('Main');
//        return $theme->of('sportsbook.main',$dataArray)->render();
//    }
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
            'TEAM' => $row->TEAM,
            'OPPONENT' => $row->OPPONENT,
            'TGAMENO' => $row->TGAMENO,
            'GAME_TIME' => $row->GAME_TIME,
            'LINE' => $row->LINE,
            'VS_LINE' => $row->VS_LINE,
            'VSGAMENO' => $row->VSGAMENO,
            'TOTAL' => $row->TOTAL,
            'GAME_DATE' => $row->GAME_DATE,
            'OVER_ODDS' => $row->OVER_ODDS,
            'UNDER_ODDS' => $row->UNDER_ODDS,
            'TEAM_ODDS' => $row->TEAM_ODDS,
            'VS_ODDS' => $row->VS_ODDS,
            'OPPONENT' => $row->OPPONENT,
            'SPORT' => $row->SPORT

        ];
        return $dataArray;
    }

//    public function customer(){
//        $theme = Theme::uses('default')->layout('layout')->setTitle('Main');
//        return $theme->of('sportsbook.customerLogin')->render();
//    }
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
                'password' => $query->password ,
                'balance' => $query->balance
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

}






















