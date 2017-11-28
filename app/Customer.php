<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Customer extends Model
{


    protected $table = 'score';

    public function getCustName($name){
        return DB::table($this->table)
            ->where('name', $name)
            ->first();
    }

    public function getAll(){
        return DB::table($this->table)
            ->get();
    }
}
