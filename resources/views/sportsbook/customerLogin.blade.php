
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<div id="login-panel" class="col-xs-12">
    <section class="sec-player">
        <div class="panel panel-default">
            <div id="divLogin" class="panel-body login-panel-body">
                <label class="text-center">Player Login</label>

                <div class="login-form">
                    <div class="input-group">
                        <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>
                        <input type="text" name="custName" id="custName" class="form-control" placeholder="Name" required>
                    </div>
                    <button type="button" id="btnSubmitPlayer" class="btn btn-success btn-block">Submit</button>

                </div>
            </div>

        </div>
    </section>
</div>

<!-- Modal view Current Bets-->
<div id="modalCurrent" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">Pending Bets</h3>
            </div>
            <div class="modal-body">
                <input type="hidden" name="sample123" id="sample123">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="player" id="player">
                <table id="tblPending" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Team</th>
                        <th>Line</th>
                        <th>Odds</th>
                        <th>Amount</th>
                        <th>Game Date/Time</th>
                        <th>Bet No.</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
<!-- Modal view Past Bets -->
<div id="modalPast" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">Past Bets</h3>
            </div>
            <div class="modal-body">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="playerpast" id="playerpast">
                <table id="tblPastBets" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Team</th>
                        <th>Line</th>
                        <th>Odds</th>
                        <th>Result</th>
                        <th>Game Date</th>
                        <th>Bet No.</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
