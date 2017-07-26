<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
class Player extends Model
{
    protected $table = 'cust';

    public function getAllPlayer($term){
        return DB::table($this->table)
            ->where('name', 'like', '%' . $term . '%')
            ->take(10)
            ->get();
    }
//    public function  getOnePlayer($custid, $name){
//        return DB::table($this->table)
//            ->where('custid', $custid)
//            ->where('name', $name)
//            ->first();
//    }
}
