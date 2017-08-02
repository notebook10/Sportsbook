/**
 * Created by Samuel on 7/24/2017.
 */
$('document').ready(function(){

    var BASE_URL = $('#baseurl').val();
    $( "#custName" ).autocomplete({
        source: function(request, response) {
            $.ajax({
                'url':  BASE_URL + "/autocomplete",
                dataType: "json",
                data: {
                    term : request.term
                },
                success: function(data) {
                    response(data);

                }
            });
        },
        delay: 0,
        autoFocus: true,
        // minLength: 2,
        select: function (event, ui) {
            $("#PcustName").text(ui.item.value); // save selected id to hidden input
            $("#custid").text(ui.item.id); // save selected id to hidden input
            $("#Ppassword").text(ui.item.password); // save selected password to hidden input
            $("#Pbalance").text(ui.item.balance); // save selected password to hidden input
        }
    });

    $('body').delegate('#btnSubmitPlayer', 'click', function(){
        if($('#PcustName').text().length > 0 && $('#Ppassword').text().length > 0){
            $('.sports-content').show();
            $( "#login-panel" ).hide();
            $( "#divLoginDisplay" ).show();
        }
    });

    $('body').delegate('#viewCurrent','click',function(){
        $('#player').val($("#divLoginDisplay #PcustName").text());
        var player = $('#player').val();
        $.ajax({
            'url' : BASE_URL + '/viewBets',
            type : 'POST',
            data : {
                _token : $('[name="_token"]').val(),
                player : player
            },
            success : function(response){
                console.log(response["alldata"]);
                var od = JSON.stringify(response["alldata"]);
                var obj = JSON.parse(od);
                var Betslist = "";
                var noData = "";
                if(obj.length > 0){
                    $.each(obj, function (index, value) {
                        var myDate = new Date(obj[index].game_date_time)
                        var locale = "en-us";
                        if(obj[index].game_date_time == "0000-00-00 00:00:00"){
                            var timeString = "Null";
                        } else {
                            var timeString = myDate.toLocaleString(locale, { month: "short" }) + '-' + (myDate.getDate()+1) + '-'
                                + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':'
                                + myDate.getSeconds();
                        }
                            Betslist +="<tr>"+"<td>"+ obj[index].bet_type  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].bet_amt +"</td>"+"<td>"+ obj[index].win  +"</td>"+"<td>"+ obj[index].lose  +"</td>"+"<td>"+ timeString +"</td>"+"<td>"+ obj[index].bet_id +"</td>"+"</tr>";
                    });
                    $("#tblPending tbody").html(Betslist);
                } else {
                    noData +="<h1 class='noData'>"+ "No Pending Bets" +"</h1>"
                    $("#modalCurrent .modal-body").html(noData);
                }
            },
            error : function(xhr,asd,error){
                console.log(error);
            }
        });
    });

    $('body').delegate('#viewPast', 'click', function(){
        $('#playerpast').val($("#divLoginDisplay #PcustName").text());
        var player = $('#playerpast').val();
        $.ajax({
            'url' : BASE_URL + '/viewPastBets',
            type : 'POST',
            data : {
                _token : $('[name="_token"]').val(),
                player : player
            },
            success : function(response){
                console.log(response["allpast"]);
                var od = JSON.stringify(response["allpast"]);
                var obj = JSON.parse(od);
                var Betslist = "";
                var noData = "";
                if(obj.length > 0){
                    $.each(obj, function (index, value) {
                        var myDate = new Date(obj[index].game_date_time)
                        var locale = "en-us";
                        if(obj[index].game_date_time == "0000-00-00 00:00:00"){
                            var timeString = "Null";
                        } else {
                            var timeString = myDate.toLocaleString(locale, { month: "short" }) + '-' + (myDate.getDate()+1) + '-'
                                + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':'
                                + myDate.getSeconds();
                        }
                        Betslist +="<tr>"+"<td>"+ obj[index].bet_type  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].result +"</td>"+"<td>"+ obj[index].score +"</td>"+"<td>"+ timeString +"</td>"+"<td>"+ obj[index].bet_id +"</td>"+"</tr>";
                    });
                    $("#tblPastBets tbody").html(Betslist);
                } else {
                    noData +="<h1 class='noData'>"+ "No Past Bets" +"</h1>"
                    $("#modalPast .modal-body").html(noData);
                }
            },
            error : function(xhr,asd,error){
                console.log(error);
            }
        });
    });

    $('.pLogout').on('click', function(){
        window.location.href = BASE_URL;
    });

});
