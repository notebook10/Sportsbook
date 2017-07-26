<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/','HomeController@index');

Route::post('login','HomeController@login');
Route::get('logout','HomeController@logout');


Route::group(['middleware' => ['auth']], function (){
    Route::get('main', 'HomeController@main');
    Route::get('customer', 'HomeController@customer');
    Route::get('/autocomplete', 'HomeController@autocomplete');
    Route::match(array('get', 'post'),'/sportsbook/getSched', 'HomeController@getSched');
    Route::match(array('get', 'post'),'/viewPendingBets', 'HomeController@viewPendingBets');
    Route::match(array('get', 'post'),'/viewBets', 'HomeController@viewBets');
    Route::match(array('get', 'post'),'/viewPastBets', 'HomeController@viewPastBets');
});