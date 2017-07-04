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
                <ul class="nav navbar-nav">

                </ul>
                <ul class="nav navbar-nav navbar-right">
                    {{--<li class="dropdown">--}}
                        {{--<a class="dropdown-toggle" data-toggle="dropdown" href="#">Welcome <span class="caret"></span></a>--}}
                        {{--<ul class="dropdown-menu">--}}
                            {{--<li><a href="logout"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>--}}
                        {{--</ul>--}}
                    {{--</li>--}}
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