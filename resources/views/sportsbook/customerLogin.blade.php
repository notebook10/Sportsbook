
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="col-md-4 col-md-offset-4">
    <section>
        <div class="panel panel-default top caja">
            <div class="panel-body">
                <h3 class="text-center">Customer Login</h3>

                <form class="login-form" id="frmLoginCustomer" method="get" action="customer/autocomplete">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    {{--<input type="hidden" name="custID" id="custID">--}}
                    <div class="input-group input-group-lg">
                        <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>
                        <input type="text" name="custName" id="custName" class="form-control" placeholder="Name" required>
                        <ul class='ulAgent'></ul>
                    </div>
                    <br>
                    <br>
                    <button type="button" id="smaplebutton" class="btn btn-success btn-block">Submit</button>

                </form>
            </div>
        </div>
    </section>
</div>

<style>
    .top{
        margin-top: 40%;
    }

    .caja{
        border-radius: 5px;
    }
</style>