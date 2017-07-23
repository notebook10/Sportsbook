<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;
//use UserTrait;

class operator extends Authenticatable
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

    protected $table = 'operator';
    protected $primaryKey = 'OperatorID';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public static function checkusertype($OperatorID){
        operator::where('OperatorID',$OperatorID)->first();
//        if($currentuser->LVL == 1){
            return 'main';
//        }else if($currentuser->LVL == 2){
//            return 'admin';
//        }
    }

}
