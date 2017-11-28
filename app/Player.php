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

    public function saveCurrentBet($TotalBet, $id){
        return DB::table($this->table)
            ->where('custid', $id)
            ->update($TotalBet);
    }
//    public function  getOnePlayer($custid, $name){
//        return DB::table($this->table)
//            ->where('custid', $custid)
//            ->where('name', $name)
//            ->first();
//    }

    public function saveDResult($resultArray){
        $array = array(
            $resultArray['dayRslt'] => $resultArray['rslt_value'] + $resultArray['resultbyPlayer']
        );
        $Player = $resultArray['player'];
        return DB::table($this->table)
            ->where('name', $Player)
            ->update($array);
    }

    public function savetoOffice($dataOffice){
        $getofficeData = DB::table('cust')->where('name', 'office')->get();
        $officeDayRSLT = $getofficeData[0]->$dataOffice['dayRslt'] + ($dataOffice['resultbyOffice'] * -1);
        $weekDay = $dataOffice['dayRslt'];
        return DB::table($this->table)
            ->where('name', '=', 'office')
            ->update([$weekDay => $officeDayRSLT]);
    }

//    public function savetoOffice($dataArray){
//        $getofficeData = DB::table($this->table)->where('name', 'office')->get();
//        $officeDayRSLT = $getofficeData[0]->$dataArray['dayRslt'] + $dataArray['resultbyOffice'];
////        dd($officeDayRSLT);
//        return DB::table($this->table)
//            ->where('name', 'office')
//            ->update([$dataArray['dayRslt'] => $officeDayRSLT]);
//    }
}
