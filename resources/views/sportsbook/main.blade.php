

<div class="container">
    <div class="row sports-content">
        <div class="col-sm-4 col-content" id="col-team">
            <div id="radio-sports">
                <h5>Select Sports</h5>
            </div>
            <table  id="tblTeam" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th style="width: 3%; text-align: center">G No.</th>
                    <th>Team</th>
                    <th>Opponent</th>
                    <th style="width: 3%; text-align: center">Sports</th>
                </tr>
                </thead>
                <tbody>
                @foreach($sched as $value)
                    <tr>
                        <td>{{ $value->TGAMENO }}</td>
                        <td class="btnTeam" data-id="{{ $value->TEAM }}" >{{ $value->TEAM }}</td>
                        <td>{{ $value->OPPONENT }}</td>
                        <td style="text-align: center">{{ $value->SPORT }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <div class="col-sm-4 col-content" id="col-content">
            <form id='frmSched'>
                <div class="form-body">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="TEAM" id="TEAM">
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='TEAMN' name='' value=''>--}}
                        {{--<p class="TEAMN chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='OPPONENT' name='' value=''>--}}
                        {{--<p class="OPPONENT chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='TGAMENO' name='' value=''>--}}
                        {{--<p class="TGAMENO chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='GAME_TIME' name='' value=''>--}}
                        {{--<p class="GAME_TIME chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='LINE' name='' value=''>--}}
                        {{--<p class="LINE chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='VS_LINE' name='' value=''>--}}
                        {{--<p class="VS_LINE chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='OVER_ODDS' name='' value=''>--}}
                        {{--<p class="OVER_ODDS chk-p"></p>--}}
                    {{--</div>--}}
                    {{--<div class="form-group">--}}
                        {{--<input type='checkbox' class="chk-form" id='UNDER_ODDS' name='' value=''>--}}
                        {{--<p class="UNDER_ODDS chk-p"></p>--}}
                    {{--</div>--}}
                </div>
                <div class="form-footer">
                    <input type="button" class="btn btn-primary" value="Bet Type 1">
                    <input type="button" class="btn btn-success" value="Bet Type 2">
                    <input type="button" class="btn btn-info" value="Bet Type 3">
                </div>
            </form>
        </div>
        <div class="col-sm-4 col-content" id="col-bet"></div>
    </div>
</div>