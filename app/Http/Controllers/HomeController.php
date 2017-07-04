<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Sched;
use Auth;
use Validator;
use Theme;
use Illuminate\Support\Facades\Redirect;

class HomeController extends Controller
{
//    public function index(){
//        if(Auth::check()){
//            $user = Auth::user();
//            $direct = User::checkusertype($user->id);
//            return Redirect::to($direct);
//        }else{
//            return view('default/login');
//        }
//    }
//    public function login(Request $request){
//        $username = $request->input('username');
//        $password = $request->input('password');
//        $data = [
//            'username' => $username,
//            'password' => $password
//        ];
//        $rules = [
//            'username' => 'required|min:2',
//            'password' => 'required|min:2'
//        ];
//        $validator = Validator::make($data,$rules);
//        if($validator->fails()){
//            return Redirect::to('/');
//        }else{
//            if(Auth::attempt(['username' => $username, 'password' => $password])){
//                return Redirect::to('/');
//            }else{
//                return Redirect::to('/')
//                    ->withErrors([
//                        'validate' => 'Wrong Email or Password!',
//                    ]);
//            }
//        }
//    }
//
//    public function logout(){
//        Auth::logout();
//        return Redirect::to('/');
//    }

    public function main(){
        $sched = new Sched();
        $allTeam = $sched->getAllTeam();
        $dataArray = array(
          'sched' => $allTeam
        );

        $theme = Theme::uses('default')->layout('layout')->setTitle('Main');
        return $theme->of('sportsbook.main',$dataArray)->render();
    }

    public function getSched(Request $request){
        $id = $request->input('TEAM');
        $sched = new Sched();
        $row = $sched->getSchedByTeam($id);
        $dataArray = [
            'TEAM' => $row->TEAM,
            'OPPONENT' => $row->OPPONENT,
            'TGAMENO' => $row->TGAMENO,
            'GAME_TIME' => $row->GAME_TIME,
            'LINE' => $row->LINE,
            'VS_LINE' => $row->VS_LINE,
//            'VSGAMENO' => $row->VSGAMENO,
//            'TEAM_FULL' => $row->TEAM_FULL,
//            'VS_FULL' => $row->VS_FULL,
            'OVER_ODDS' => $row->OVER_ODDS,
            'UNDER_ODDS' => $row->UNDER_ODDS,
            'TEAM_ODDS' => $row->TEAM_ODDS,
            'VS_ODDS' => $row->VS_ODDS,
            'TGAMENO' => $row->TGAMENO,
            'OPPONENT' => $row->OPPONENT

        ];
        return $dataArray;
    }
}


























