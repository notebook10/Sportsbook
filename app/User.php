<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function checkusertype($id){
        $currentuser = User::where('id',$id)->first();
        if($currentuser->LVL == 1){
            return 'main';
        }else if($currentuser->LVL == 2){
            return 'sportsbook/main';
        }
    }
}
