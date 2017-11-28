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
            $("#ABalance").text((parseFloat(ui.item.cap) + parseFloat(ui.item.balance)) + parseFloat(ui.item.currentbet) + parseFloat(ui.item.mon_rslt) + parseFloat(ui.item.tue_rslt) + parseFloat(ui.item.wed_rslt) + parseFloat(ui.item.thu_rslt) + parseFloat(ui.item.fri_rslt) + parseFloat(ui.item.sat_rslt) + parseFloat(ui.item.sun_rslt)); // save selected id to hidden input
            $("#thisWeek_rslt").text(parseFloat(ui.item.mon_rslt) + parseFloat(ui.item.tue_rslt) + parseFloat(ui.item.wed_rslt) + parseFloat(ui.item.thu_rslt) + parseFloat(ui.item.fri_rslt) + parseFloat(ui.item.sat_rslt) + parseFloat(ui.item.sun_rslt));
            $("#PcustName").text(ui.item.value); // save selected id to hidden input
            $("#custid").text(ui.item.id); // save selected id to hidden input
            $("#Ppassword").text(ui.item.password); // save selected password to hidden input
            $("#Pbalance").text(ui.item.balance); // save selected password to hidden input
            $("#custid").text(ui.item.custid);
            $("#standing").text(ui.item.standing);
            $("#siteID").text(ui.item.siteID);
            $("#mon_rslt").text(ui.item.mon_rslt);
            $("#tue_rslt").text(ui.item.tue_rslt);
            $("#wed_rslt").text(ui.item.wed_rslt);
            $("#thu_rslt").text(ui.item.thu_rslt);
            $("#fri_rslt").text(ui.item.fri_rslt);
            $("#sat_rslt").text(ui.item.sat_rslt);
            $("#sun_rslt").text(ui.item.sun_rslt);
            $("#cap_game").text(ui.item.cap_game);
            $("#cap").text(ui.item.cap);
            $("#chart").text(ui.item.chart);
            $("#currentbet").text(ui.item.currentbet);
            $("#pcurrentbet").text(ui.item.currentbet);
            $("#int_pf").text(ui.item.int_pf);
            $("#int_pf_t").text(ui.item.int_pf_t);
            $("#int_cf").text(ui.item.int_cf);
            $("#int_cf_t").text(ui.item.int_cf_t);
            $("#int_pb").text(ui.item.int_pb);
            $("#int_pb_t").text(ui.item.int_pb_t);
            $("#int_cb").text(ui.item.int_cb);
            $("#int_cb_t").text(ui.item.int_cb_t);
            $("#int_hk").text(ui.item.int_hk);
            $("#int_hk_t").text(ui.item.int_hk_t);
            $("#int_bs").text(ui.item.int_bs);
            $("#int_bs_t").text(ui.item.int_bs_t);
            $("#int_pr").text(ui.item.int_pr);
            $("#int_prly4").text(ui.item.int_prly4);
            $("#parlay_teams").text(ui.item.parlay_teams);
            $("#int_teaser").text(ui.item.int_teaser);
            $("#int_rev").text(ui.item.int_rev);
            $("#last_mon").text(ui.item.last_mon);
            $("#last_tue").text(ui.item.last_tue);
            $("#last_wed").text(ui.item.last_wed);
            $("#last_thu").text(ui.item.last_thu);
            $("#last_fri").text(ui.item.last_fri);
            $("#last_sat").text(ui.item.last_sat);
            $("#last_sun").text(ui.item.last_sun);
        }
    }).focus(function(){
        $(this).autocomplete("search");
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
                // console.log(response["alldata"]);
                var od = JSON.stringify(response["alldata"]);
                var obj = JSON.parse(od);
                console.log(obj);
                var Betslist = "";
                var noData = "";
                if(obj.length > 0){
                    var bilang = 0;
                    $.each(obj, function (index, value) {
                        var count = obj.length;
                        bilang++;
                        // console.log(obj[index + 1].bet_id);
                        var myDate = new Date(obj[index].game_date_time)
                        var locale = "en-us";
                        // if(obj[index].game_date_time == "0000-00-00 00:00:00"){
                        //     var timeString = "Null";
                        // } else {
                        //     var timeString = myDate.toLocaleString(locale, { month: "short" }) + '-' + (myDate.getDate()+1) + '-'
                        //         + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':'
                        //         + myDate.getSeconds();
                        // }
                        if(bilang != count){
                            if(obj[index].bet_id == obj[index + 1].bet_id){
                                Betslist +="<tr>"+"<td>"+ ""  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].game_date_time +"</td>"+"<td>"+ "" +"</td>"+"<td>"+ ""  +"</td>"+"<td>"+ "" +"</td>"+"<td>"+ "" +"</td>"+"</tr>";
                            } else {
                                Betslist +="<tr>"+"<td>"+ obj[index].bet_type  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].game_date_time +"</td>"+"<td>"+ obj[index].bet_amt +"</td>"+"<td>"+ obj[index].win  +"</td>"+"<td>"+ obj[index].lose  +"</td>"+"<td>"+ obj[index].bet_id +"</td>"+"</tr>";
                            }
                        } else {

                        }

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
                        // if(obj[index].game_date_time == "0000-00-00 00:00:00"){
                        //     var timeString = "Null";
                        // } else {
                        //     var timeString = myDate.toLocaleString(locale, { month: "short" }) + '-' + (myDate.getDate()+1) + '-'
                        //         + myDate.getFullYear() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':'
                        //         + myDate.getSeconds();
                        // }
                        Betslist +="<tr>"+"<td>"+ obj[index].bet_type  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].result +"</td>"+"<td>"+ obj[index].score +"</td>"+"<td>"+ obj[index].game_date_time +"</td>"+"<td>"+ obj[index].bet_id +"</td>"+"</tr>";
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
