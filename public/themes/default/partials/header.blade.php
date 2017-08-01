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
                    <li class="dataClass"><p class="PcustName">Username : </p><p id="PcustName"></p></li>
                    <li class="dataClass"><p class="Ppassword">Password : </p><p id="Ppassword"></p></li>
                    <li class="dataClass"><p class="Pbalance">Balance : </p><p id="Pbalance"></p></li>
                    <li><a data-toggle="modal" data-target="#modalPast" id="viewPast">Past Bets</a></li>
                    <li>
                        <a data-toggle="modal" data-target="#modalCurrent" id="viewCurrent">Pending Bets</a>
                    </li>
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