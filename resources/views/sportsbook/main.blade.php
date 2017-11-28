

<input type="hidden" name="_token" value="{{ csrf_token() }}">
<div class="container">

    @include('sportsbook/customerLogin')
    <div class="row sports-content">
        <div class="col-sm-6 col-content" id="col-team">
            <div id="radio-sports">
                <h5>Select Sports</h5>
            </div>
            <table  id="tblTeam" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th style="width: 3%; text-align: center">G No.</th>
                    <th style="width: 30%;">Favorites</th>
                    <th style="width: 4%; text-align: center">Line</th>
                    <th>Total</th>
                    <th style="width: 30%;">Opponent</th>
                    <th style="width: 25%; text-align: center">Date/Time</th>
                    <th style="width: 3%; text-align: center; display: none;">Sports</th>
                    {{--<th style="width: 3%; text-align: center; display: none;">Status</th>--}}
                </tr>
                </thead>
                <tbody>
                @foreach($sched as $value)
                    <tr data-id="{{ $value->tgameno }}" >
                        <td>{{ $value->line < 0 ? $value->tgameno : $value->vsgameno }}</td>
                        <td class="btnTeam {{ $value->line < 0 ? "TEAM" :"OPPONENT" }}">{{ $value->line < 0 ? $value->team : $value->opponent }}</td>
                        <td>{{ $value->line < 0 ? $value->line : $value->vs_line }}</td>
                        <td>{{ $value->total > 900 ? "NL" : $value->total }}</td>
                        <td class="btnTeam {{ $value->vs_line < 0 ? "TEAM" :"OPPONENT" }}">{{ $value->vs_line < 0 ? $value->team : $value->opponent }}</td>
                        <td>{{ Carbon\Carbon::parse($value->game_date_time)->format('M-d-Y h:i A') }}</td>
                        <td style="text-align: center; display: none;">{{ $value->sport }}</td>
                        {{--<td style="text-align: center; display: none;">{{ $value->status }}</td>--}}
                    </tr>
                @endforeach
                @foreach($schedall as $key => $value)
                    <tr data-id="{{ $value->tgameno }}" >
                        <td>{{ $value->tgameno }}</td>
                        <td class="btnTeam2 TEAM">{{ $value->team  }}</td>
                        @if($value->sport == "PF" || $value->sport == "PB" || $value->sport == "CF" || $value->sport == "CB")
                            <td>{{ $value->line == 0 ? "PK" : "NL" }}</td>
                        @else
                            <td>{{ $value->line == 0 ? 0 : "NL" }}</td>
                        @endif
                        <td>{{ $value->total > 900 ? "NL" : $value->total }}</td>
                        <td class="btnTeam2 OPPONENT">{{ $value->opponent }}</td>
                        <td>{{ Carbon\Carbon::parse($value->game_date_time)->format('M-d-Y h:i A') }}</td>
                        <td style="text-align: center; display: none">{{ $value->sport }}</td>
                        {{--<td style="text-align: center; display: none">{{ $value->status }}</td>--}}
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <div class="col-sm-6 col-content" id="col-content">
            <div class="2nd-column">
                <div id='divSched'>
                    <div class="column-body">
                        {{--<input type="hidden" name="_token" value="{{ csrf_token() }}">--}}
                        <input type="hidden" name="TGAMENO" id="TGAMENO">
                        <input type="hidden" name="SPORT" id="SPORT">
                        <table id="tblSColumn" class="table table-bordered">
                            <thead>
                            <tr>
                                <th>Team</th>
                                <th>Line / Odds</th>
                                <th>Over Total Odds</th>
                                <th>Under Total Odds</th>
                            </tr>
                            </thead>
                        </table>
                        <div class="sched-column-content"></div>
                        <table id="tblSColumnforBS" class="table table-bordered">
                            <thead>
                            <tr>
                                <th style="width: 18%">Team</th>
                                <th style="width: 28%">Pitcher</th>
                                <th style="width: 18%">Line / Odds</th>
                                <th style="width: 18%">Over Total</th>
                                <th style="width: 18%">Under Total</th>
                            </tr>
                            </thead>
                        </table>
                        <div class="sched-column-content-BS"></div>
                    </div>
                    <div class="column-footer">
                        <div class="col-xs-12">
                            <label class="wagerA">Wager Amount:</label><input type="text" class="form-control" placeholder="Amount" required onkeypress='validate(event)'  id="amountID">
                            <label for="sel1">Click to buy points:</label>
                            <select class="form-control" id="buyPoint">
                                <option value="0">zero point</option>
                                <option value="0.5">1/2 point</option>
                                <option value="1">1 point</option>
                                <option value="1.5">1 1/2 point</option>
                            </select>
                        </div>
                        <div class="col-xs-12 footer-btn">
                            <input type="button" class="btnBet btn btn-primary" id="btnStraight" value="Straight">
                            <input type="button" class="btnBet btn btn-success" id="btnParlay" value="Parlay">
                            <input type="button" class="btn btn-default" id="clearSelect" value="Clear Selection">
                            <br>
                            <input type="button" class="btnBetTeaser btnBet btn btn-info" id="btnTeaser46" value="Teaser 4 & 6 pts">
                            <input type="button" class="btnBetTeaser btnBet btn btn-info" id="btnTeaser4565" value="Teaser 4&frac12 & 6&frac12 pts">
                            <input type="button" class="btnBetTeaser btnBet btn btn-info" id="btnTeaser57" value="Teaser 5 & 7 pts">
                            <input type="button" class="btnBetTeaser btnBet btn btn-info" id="btnTeaser10" value="Teaser 10 pts">
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="3rd-column">
                <div id="saveBet">
                    <div class="form-body">
                        <table id="tblConfirm" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th style="display: none">pt_bought</th>
                                <th style="display: none">game_date_time</th>
                                <th style="display: none">grade_no</th>
                                {{--<th style="display: none">tpitcher</th>--}}
                                <th style="width: 20%">Type</th>
                                <th style="width: 10%">Sports</th>
                                <th style="width: 35%">Team</th>
                                <th style="width: 20%">Spread</th>
                                <th style="width: 10%">Payoff</th>
                            </tr>
                            <tr class="trForParlay">
                                <th style="display: none">PGroup</th>
                                <th style="display: none">game_date_time</th>
                                <th style="display: none">grade_no</th>
                                {{--<th style="display: none">tpitcher</th>--}}
                                <th style="width: 15%">Type</th>
                                <th style="width: 10%">Sports</th>
                                <th style="width: 35%">Team</th>
                                <th style="width: 25%">Spread</th>
                                <th style="width: 10%">Payoff</th>
                            </tr>
                            <tr class="trForTeaser">
                                <th style="display: none">TGroup</th>
                                <th style="display: none">game_date_time</th>
                                <th style="display: none">grade_no</th>
                                {{--<th style="display: none">tpitcher</th>--}}
                                <th style="display: none">addPts</th>
                                <th style="width: 15%">Type</th>
                                <th style="width: 10%">Sports</th>
                                <th style="width: 35%">Team</th>
                                <th style="width: 25%">Spread</th>
                                <th style="width: 10%">Payoff</th>
                            </tr>
                            </thead>
                            <tbody class="main">
                            </tbody>
                        </table>
                    </div>
                    <div class="form-footer buttonDiv">
                        <input type="button"  data-toggle="modal" class=" btn btn-success" id="btnSaveBet" value="Submit">
                        <input type="button" class=" btn btn-danger" id="btnCancelBet" value="Cancel">
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<div id="modalSubmitBet" data-backdrop="static" data-keyboard="false" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" id="CloseReadback" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">Read Back Bets</h3>
            </div>
            <div class="modal-body">
                <h4>Here is your backread:</h4>
                <table id="tblbackread" class="table">
                    <thead>
                    <tr>
                        <th style="width: 30%"></th>
                        <th style="width: 25%"></th>
                        <th style="width: 15%"></th>
                        <th style="width: 30%"></th>
                    </tr>
                    </thead>
                    <tbody class="forS"></tbody>
                    <tbody class="forP"></tbody>
                    <tbody class="forT"></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <label>If correct, I need your pin and password to confirm the play.</label>
                <input type="submit" id="btnConfirm" class="btn btn-primary" value="Confirm">
                <input type="button" id="btnNotConfirm" class="btn btn-danger" value="Cancel">
            </div>
        </div>

    </div>
</div>

<div id="hiddenmodal" data-backdrop="static" data-keyboard="false" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <table id="hiddenBetstb">
                <thead>
                <tr class="forSt">
                    {{--<th>PGroup</th>--}}
                    <th>bet_type</th>
                    <th>player</th>
                    <th>team</th>
                    <th>win</th>
                    <th>bet_amt</th>
                    <th>lose</th>
                    <th>sport</th>
                    <th>line</th>
                    <th>odds</th>
                    <th>game_date_time</th>
                    <th>grade_no</th>
                    <th>tpitcher</th>
                    <th>vspitcher</th>
                    <th>subtype</th>
                    <th>pt_bought</th>
                </tr>
                <tr class="forPl">
                    <th>PGroup</th>
                    <th>bet_type</th>
                    <th>player</th>
                    <th>team</th>
                    <th>win</th>
                    <th>bet_amt</th>
                    <th>lose</th>
                    <th>sport</th>
                    <th>line</th>
                    <th>odds</th>
                    <th>game_date_time</th>
                    <th>grade_no</th>
                    <th>tpitcher</th>
                    <th>vspitcher</th>
                    <th>noofteams</th>
                    <th>subtype</th>
                </tr>
                <tr class="forTs">
                    <th>TGroup</th>
                    <th>bet_type</th>
                    <th>player</th>
                    <th>team</th>
                    <th>win</th>
                    <th>bet_amt</th>
                    <th>lose</th>
                    <th>sport</th>
                    <th>line</th>
                    <th>odds</th>
                    <th>game_date_time</th>
                    <th>grade_no</th>
                    <th>tpitcher</th>
                    <th>vspitcher</th>
                    <th>teaser_pt</th>
                    <th>noofteams</th>
                    <th>subtype</th>
                </tr>
                </thead>
                <tbody id="forSt"></tbody>
                <tbody id="forPl"></tbody>
                <tbody id="forTs"></tbody>
            </table>
        </div>

    </div>
</div>

