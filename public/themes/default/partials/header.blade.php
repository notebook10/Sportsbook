<header>
    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav" id="divLoginDisplay">
                    <li class="dataClass">
                        <p class="PcustName">Username : </p><p id="PcustName"></p><br>
                        <p class="Ppassword">Password : </p><p id="Ppassword"></p><br>
                        <p class="Pbalance">Available Balance : </p><p id="ABalance"></p>
                    </li>
                    {{--<li class="dataClass"><p class="Ppassword">Password : </p><p id="Ppassword"></p></li>--}}
                    {{--<li class="dataClass"><p class="Pbalance">Balance : </p><p id="ABalance"></p></li>--}}
                    <li>
                        <a data-toggle="modal" data-target="#modalCurrent" id="viewCurrent">Pending Bets: <p id="pcurrentbet"></p></a>
                    </li>
                    <li><a data-toggle="modal" data-target="#modalPast" id="viewPast">Past Bets</a></li>
                    <li><a class="pLogout">Logout Player</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Welcome Admin: {{ Auth::user()->INITIALS }}<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="hidePlayerInfo">
        <input type="hidden" id="TempTotalWager">
        <input type="hidden" id="custid">
        <input type="hidden" id="Pbalance">
        <input type="hidden" id="standing">
        <input type="hidden" id="siteID">
        <input type="hidden" id="mon_rslt">
        <input type="hidden" id="tue_rslt">
        <input type="hidden" id="wed_rslt">
        <input type="hidden" id="thu_rslt">
        <input type="hidden" id="fri_rslt">
        <input type="hidden" id="sat_rslt">
        <input type="hidden" id="sun_rslt">
        <input type="hidden" id="thisWeek_rslt">
        <input type="hidden" id="cap_game">
        <input type="hidden" id="cap">
        <input type="hidden" id="chart">
        <input type="hidden" id="currentbet">
        <input type="hidden" id="int_pf">
        <input type="hidden" id="int_pf_t">
        <input type="hidden" id="int_cf">
        <input type="hidden" id="int_cf_t">
        <input type="hidden" id="int_pb">
        <input type="hidden" id="int_pb_t">
        <input type="hidden" id="int_cb">
        <input type="hidden" id="int_cb_t">
        <input type="hidden" id="int_hk">
        <input type="hidden" id="int_hk_t">
        <input type="hidden" id="int_bs">
        <input type="hidden" id="int_bs_t">
        <input type="hidden" id="int_pr">
        <input type="hidden" id="int_prly4">
        <input type="hidden" id="parlay_teams">
        <input type="hidden" id="int_teaser">
        <input type="hidden" id="int_rev">
        <input type="hidden" id="last_mon">
        <input type="hidden" id="last_tue">
        <input type="hidden" id="last_wed">
        <input type="hidden" id="last_thu">
        <input type="hidden" id="last_fri">
        <input type="hidden" id="last_sat">
        <input type="hidden" id="last_sun">
    </div>
</header>

<style>
    nav.navbar.navbar-inverse {
        background: #00724b !important;
        border: none !important;;
        border-radius: 0 !important;;
    }
    .navbar-inverse .navbar-nav>li>a {
        color: #ffffff !important;;
    }
    .navbar-inverse .navbar-nav>.open>a, .navbar-inverse .navbar-nav>.open>a:focus, .navbar-inverse .navbar-nav>.open>a:hover {
        color: #fff !important;;
        background-color: transparent !important;;
    }
</style>