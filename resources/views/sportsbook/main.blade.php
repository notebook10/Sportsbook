

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
                </tr>
                </thead>
                <tbody>
                @foreach($sched as $value)
                    <tr data-id="{{ $value->TGAMENO }}" >
                        <td>{{ $value->LINE < 0 ? $value->TGAMENO : $value->VSGAMENO }}</td>
                        <td class="btnTeam {{ $value->LINE < 0 ? "TEAM" :"OPPONENT" }}">{{ $value->LINE < 0 ? $value->TEAM : $value->OPPONENT }}</td>
                        <td>{{ $value->LINE < 0 ? $value->LINE : $value->VS_LINE }}</td>
                        <td>{{ $value->TOTAL > 900 ? "NL" : $value->TOTAL }}</td>
                        <td class="btnTeam {{ $value->VS_LINE < 0 ? "TEAM" :"OPPONENT" }}">{{ $value->VS_LINE < 0 ? $value->TEAM : $value->OPPONENT }}</td>
                        <td>{{ Carbon\Carbon::parse($value->GAME_DATE)->format('M-d-Y') }} / {{ $value->GAME_TIME }}</td>
                        <td style="text-align: center; display: none;">{{ $value->SPORT }}</td>
                    </tr>
                @endforeach
                @foreach($schedall as $key => $value)
                    <tr data-id="{{ $value->TGAMENO }}" >
                        <td>{{ $value->TGAMENO }}</td>
                        <td class="btnTeam2 TEAM">{{ $value->TEAM  }}</td>
                        @if($value->SPORT == "PF" || $value->SPORT == "PB" || $value->SPORT == "CF" || $value->SPORT == "CB")
                            <td>{{ $value->LINE == 0 ? "PK" : "NL" }}</td>
                        @else
                            <td>{{ $value->LINE == 0 ? 0 : "NL" }}</td>
                        @endif
                        <td>{{ $value->TOTAL > 900 ? "NL" : $value->TOTAL }}</td>
                        <td class="btnTeam2 OPPONENT">{{ $value->OPPONENT }}</td>
                        <td>{{ Carbon\Carbon::parse($value->GAME_DATE)->format('M-d-Y') }} / {{ $value->GAME_TIME }}</td>
                        <td style="text-align: center; display: none">{{ $value->SPORT }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <div class="col-sm-6 col-content" id="col-content">
            <div class="2nd-column">
                <div id='divSched'>
                    <div class="column-body">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
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
                        <div class="sched-column-content">

                        </div>
                    </div>
                    <div class="column-footer">
                        <div class="col-xs-5">
                            <input type="text" class="form-control" placeholder="Amount" required onkeypress='validate(event)'  id="amountID">
                        </div>
                        <div class="col-xs-7">
                            <input type="button" class="btnBet btn btn-primary" id="btnStraight" value="Straight">
                            <input type="button" class="btnBet btn btn-success" id="btnParlay" value="Parlay">
                            <input type="button" class="btnBet btn btn-info" id="btnTeaser" value="Teaser">
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="3rd-column">
                <form id="saveBet">
                    <div class="form-body">
                        <table id="tblConfirm" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Sports</th>
                                <th>Team</th>
                                <th>Spread</th>
                                <th>Payoff</th>
                            </tr>
                            </thead>
                            <tbody class="main">
                            </tbody>
                        </table>
                    </div>
                    <div class="form-footer buttonDiv">
                        <input type="button"  data-toggle="modal" data-target="#modalSubmitBet" class=" btn btn-success" id="btnSaveBet" value="Submit">
                        <input type="button" class=" btn btn-danger" id="btnCancelBet" value="Cancel">
                    </div>
                </form>

            </div>

        </div>
    </div>
</div>

<div id="modalSubmitBet" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">Read Back Bets</h3>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <input type="submit" id="btnConfirm" class="btn btn-primary" value="Confirm">
                <input type="button" id="btnNotConfirm" class="btn btn-danger" value="Cancel">
            </div>
        </div>

    </div>
</div>