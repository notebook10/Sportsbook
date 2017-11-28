$('document').ready(function(){
    var BASE_URL = $('#baseurl').val();
    loadExpensesDataTable();
    var table = $("#tblTeam").DataTable();

    $('input[type = search]').unbind().on('keyup', function() {
        var searchTerm = this.value.toLowerCase();
        $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            if (~data[0].toLowerCase().indexOf(searchTerm)) return true;
            if (~data[1].toLowerCase().indexOf(searchTerm)) return true;
            if (~data[4].toLowerCase().indexOf(searchTerm)) return true;
            return false;
        })
        table.draw();
        $.fn.dataTable.ext.search.pop();
    })

    table.column(6).data().unique().sort().each( function ( d, j ) {
        $("#radio-sports").append( '<label class="radio-inline"><input type="radio" name="optradio" value="'+d+'">'+d+'</label>' )

    } );

    $('#radio-sports input').change(function () {
        table.columns(6).search(this.value).draw();
        $('input[type = search]').val('').focus();
    });

    $('body').delegate('.btnTeam, .btnTeam2', 'click', function () {
        $('#TGAMENO').val($(this).parent().data('id'));
        $('#SPORT').val($(this).parent().find('td:last').html());
        var TGAMENO = $('#TGAMENO').val();
        var SPORT = $('#SPORT').val();
        // var thisTeam = $(this).val();
        // var checkTeam = $('#divSched .thumbnails').find(thisTeam).length;
        // if(checkTeam > 0){
        //     alert();
        // }
        if ($(this).hasClass('TEAM')) {
            $.ajax({
                'url' : BASE_URL + '/sportsbook/getSched',
                type : 'POST',
                data : {
                    _token : $('[name="_token"]').val(),
                    TGAMENO : TGAMENO,
                    SPORT : SPORT
                },
                success : function(data) {
                    var dLINE = "";
                    var dTOTAL = "";
                    var dTEAMODDS = "";
                    var noDisplay = "";
                    var overOdds = "";
                    var underOdds = "";
                    var noDisplay2 = "";
                    var noDisplay3 = "";
                    if(data['TEAM_ODDS'] == -110){
                        dTEAMODDS = ""
                    } else if (data['TEAM_ODDS'] > 900){
                        dTEAMODDS = ",NL";
                        noDisplay3 = "noDisplay";
                    } else {
                        dTEAMODDS = ',' + data['TEAM_ODDS'];
                    }
                    if(data['TOTAL'] > 900){
                        dTOTAL = "NL";
                        noDisplay = "noDisplay"
                    } else {
                        dTOTAL = data['TOTAL'];
                    }
                    if(data['LINE'] == 0.0){
                        if(data['SPORT'] == "PF" || data['SPORT'] == "CF" || data['SPORT'] == "PB" || data['SPORT'] == "CB"){
                            dLINE = "PK";
                        } else {
                            dLINE = data['LINE'];
                        }
                    } else if(data['LINE'] > 900) {
                        dLINE = "NL";
                    } else {
                        dLINE = data['LINE'];
                    }
                    if(data['OVER_ODDS'] == -110){overOdds = ""}else{overOdds = "," + data['OVER_ODDS']}
                    if(data['UNDER_ODDS'] == -110){underOdds = ""}else{underOdds = "," + data['UNDER_ODDS']}
                    if(data['SPORT'] == "RL"){noDisplay2 = "noDisplay"}else{noDisplay2 = ""}

                    var forcheck = "team" + data['TGAMENO'] + data['SPORT'];
                    var ifExist = $('#divSched').find("#"+forcheck).length;
                    if(ifExist > 0){
                        $.alert({
                            title: 'Error!',
                            content: data['TEAM']+' is already exist!',
                        });
                    } else {
                        if(data['SPORT'] == "BS"){
                            $('#divSched .sched-column-content-BS').append(
                                '<div class="thumbnails" id="team'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                // '<thead>'+ '<tr>' + '<th>Team</th>' +  '<th>Pitcher</th>' +  '<th>Line / Odds</th>' +  '<th>Over Total Odds</th>' +   '<th>Under Total Odds</th>' + '</tr>' +'</thead>'+
                                '<tbody>' +
                                '<tr class="BSRL">' +
                                '<td value="'+ data['SPORT'] + '">' + data['TEAM'] + '</td>' +
                                '<td class="pitchertd">' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['TPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="tpitcher tpwp" name="' + data['TGAMENO'] + '-teamteam' +'" type="radio" value="' + data['TPITCHER'] + '">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="tpitcher" name="' + data['TGAMENO'] + '-teamteam' +'" type="radio" value="" checked="checked">' + '</label>' + 'A' + '</div>' +'<br>' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['VSPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="vspitcher vswp" name="' + data['TGAMENO'] + '-teamvs' +'" type="radio" value="' + data['VSPITCHER'] + '">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="vspitcher" name="' + data['TGAMENO'] + '-teamvs' +'" type="radio" value="" checked="checked">' + '</label>' + 'A' + '</div>' +
                                '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['TEAM'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+' '+ data['SPORT'] +'  '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS +'">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['TEAM_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['TPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        } else if(data['SPORT'] == "RL"){
                            $('#divSched .sched-column-content-BS').append(
                                '<div class="thumbnails" id="team'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                // '<thead>'+ '<tr>' + '<th>Team</th>' +  '<th>Pitcher</th>' +  '<th>Line / Odds</th>' +  '<th>Over Total Odds</th>' +   '<th>Under Total Odds</th>' + '</tr>' +'</thead>'+
                                '<tbody>' +
                                '<tr class="BSRL">' +
                                '<td value="'+ data['SPORT'] + '">' + data['TEAM'] + '</td>' +
                                '<td class="pitchertd">' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['TPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="tpitcher" name="' + data['TGAMENO'] + '-teamteam' +'" type="radio" value="' + data['TPITCHER'] + '" checked="checked">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="tpitcher" name="' + data['TGAMENO'] + '-teamteam' +'" type="radio" value="">' + '</label>' + 'A' + '</div>' +'<br>' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['VSPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="vspitcher" name="' + data['TGAMENO'] + '-teamvs' +'" type="radio" value="' + data['VSPITCHER'] + '" checked="checked">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="vspitcher" name="' + data['TGAMENO'] + '-teamvs' +'" type="radio" value="">' + '</label>' + 'A' + '</div>' +
                                '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['TEAM'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+' '+ data['SPORT'] +'  '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS +'">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['TEAM_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['TPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        } else {
                            $('#divSched .sched-column-content').append(
                                '<div class="thumbnails" id="team'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                '<tbody>' +
                                '<tr>' +
                                '<td value="'+ data['SPORT'] + '">' + data['TEAM'] + '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['TEAM'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+' '+ data['SPORT'] +'  '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS +'">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['TEAM_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['TPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        }

                        $('.noDisplay, .NL').attr("disabled", true);
                        hideShow();
                    }


                },
                error : function(xhr,asd,error){
                    console.log(error);
                }
            });
        } else {
            $.ajax({
                'url' : BASE_URL + '/sportsbook/getSched',
                type : 'POST',
                data : {
                    _token : $('[name="_token"]').val(),
                    TGAMENO : TGAMENO,
                    SPORT : SPORT
                },
                success : function(data) {
                    var dLINE = "";
                    var dTOTAL = "";
                    var dTEAMODDS = "";
                    var noDisplay = "";
                    var overOdds = "";
                    var underOdds = "";
                    var noDisplay2 = "";
                    var noDisplay3 = "";
                    if(data['VS_ODDS'] == -110){
                        dTEAMODDS = ""
                    } else if(data['VS_ODDS'] > 900) {
                        dTEAMODDS = ",NL";
                        noDisplay3 = "noDisplay";

                    } else {
                        dTEAMODDS = ',' + data['VS_ODDS'];
                    }
                    if(data['TOTAL'] > 900){
                        dTOTAL = "NL";
                        noDisplay = "noDisplay"
                    } else {
                        dTOTAL = data['TOTAL'];
                    }
                    if(data['VS_LINE'] == 0.0){
                        if(data['SPORT'] == "PF" || data['SPORT'] == "CF" || data['SPORT'] == "PB" || data['SPORT'] == "CB"){
                            dLINE = "PK";
                        } else {
                            dLINE = data['VS_LINE'];
                        }
                    } else if(data['VS_LINE'] > 900){
                        dLINE = "NL";
                    } else {
                        dLINE = data['VS_LINE'];
                    }
                    if(data['OVER_ODDS'] == -110){overOdds = ""}else{overOdds = "," + data['OVER_ODDS']}
                    if(data['UNDER_ODDS'] == -110){underOdds = ""}else{underOdds = "," + data['UNDER_ODDS']}
                    if(data['SPORT'] == "RL"){noDisplay2 = "noDisplay"}else{noDisplay2 = ""}

                    var forcheck = "vs" + data['TGAMENO'] + data['SPORT'];
                    var ifExist = $('#divSched').find("#"+forcheck).length;
                    if(ifExist > 0){
                        $.alert({
                            title: 'Error!',
                            content: data['OPPONENT']+' is already exist!',
                        });
                    } else {
                        if(data['SPORT'] == "BS"){
                            $('#divSched .sched-column-content-BS').append(
                                '<div class="thumbnails" id="vs'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                // '<thead>'+ '<tr>' + '<th>Team</th>' +  '<th>Pitcher</th>' +  '<th>Line / Odds</th>' +  '<th>Over Total Odds</th>' +   '<th>Under Total Odds</th>' + '</tr>' +'</thead>'+
                                '<tbody>' +
                                '<tr  class="BSRL">' +
                                '<td value="'+ data['SPORT'] + '">' + data['OPPONENT'] + '</td>' +
                                '<td class="pitchertd">' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['VSPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="vspitcher vswp" name="' + data['TGAMENO'] + '-vsvs' +'" type="radio" value="' + data['VSPITCHER'] + '">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="vspitcher" name="' + data['TGAMENO'] + '-vsvs' +'" type="radio" value="" checked="checked">' + '</label>' + 'A' + '</div>' +'<br>' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['TPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="tpitcher tpwp" name="' + data['TGAMENO'] + '-vsteam' +'" type="radio" value="' + data['TPITCHER'] + '">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="tpitcher" name="' + data['TGAMENO'] + '-vsteam' +'" type="radio" value="" checked="checked">' + '</label>' + 'A' + '</div>' +
                                '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['OPPONENT'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'  '+ data['SPORT'] +' '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds +'</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['VS_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['VSPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        } else if(data['SPORT'] == "RL"){
                            $('#divSched .sched-column-content-BS').append(
                                '<div class="thumbnails" id="vs'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                // '<thead>'+ '<tr>' + '<th>Team</th>' +  '<th>Pitcher</th>' +  '<th>Line / Odds</th>' +  '<th>Over Total Odds</th>' +   '<th>Under Total Odds</th>' + '</tr>' +'</thead>'+
                                '<tbody>' +
                                '<tr  class="BSRL">' +
                                '<td value="'+ data['SPORT'] + '">' + data['OPPONENT'] + '</td>' +
                                '<td class="pitchertd">' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['VSPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="vspitcher" name="' + data['TGAMENO'] + '-vsvs' +'" type="radio" value="' + data['VSPITCHER'] + '" checked="checked">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="vspitcher" name="' + data['TGAMENO'] + '-vsvs' +'" type="radio" value="">' + '</label>' + 'A' + '</div>' +'<br>' +
                                '<div class="ptname">'+'<p class="dpInline">'+ data['TPITCHER'] +'</p>'+'</div>'+'<div class="ptAL '+noDisplay2+'">'+'<label class="radio-inline">' + '<input class="tpitcher" name="' + data['TGAMENO'] + '-vsteam' +'" type="radio" value="' + data['TPITCHER'] + '" checked="checked">'  + '</label>' + 'L' +'<label class="radio-inline">' +  '<input class="tpitcher" name="' + data['TGAMENO'] + '-vsteam' +'" type="radio" value="">' + '</label>' + 'A' + '</div>' +
                                '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['OPPONENT'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'  '+ data['SPORT'] +'  '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds +'</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['VS_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['VSPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        } else {
                            $('#divSched .sched-column-content').append(
                                '<div class="thumbnails" id="vs'+ data['TGAMENO'] + data['SPORT'] +'">' +
                                '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                                '<table class="table table-bordered ">' +
                                '<tbody>' +
                                '<tr>' +
                                '<td value="'+ data['SPORT'] + '">' + data['OPPONENT'] + '</td>' +
                                '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['OPPONENT'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'  '+ data['SPORT'] +'  '+ noDisplay3 +' " type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' o-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + overOdds +'</label>' + '</td>' +
                                '<td>' + '<label class="radio-inline">' + '<input class="thisOU '+ data['SPORT'] +' u-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + underOdds +'</label>' + '</td>' +
                                '<td style="display: none">' + '<input type="hidden" name="game-date" value="'+data['GAME_DATE_TIME']+'" >' + '<input type="hidden" name="game-time" value="'+data['']+'" >' + '<input type="hidden" name="team-grade" value="'+data['VS_GRADE']+'" >' + '<input type="hidden" name="team-pitcher" value="'+data['VSPITCHER']+'" >' + '<input type="hidden" name="over-odds" value="'+data['OVER_ODDS']+'" >' + '<input type="hidden" name="under-odds" value="'+data['UNDER_ODDS']+'" >' + '</td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>'
                            )
                        }


                        $('.noDisplay, .NL').attr("disabled", true);
                        hideShow();
                    }

                },
                error : function(xhr,asd,error){
                    console.log(error);
                }
            });
        }
    });



    $('body').delegate('.remove-thumbnail', 'click', function () {
        var thisDiv = $(this).parent();
        thisDiv.remove();
        hideShow();
    });

    $('#btnCancelBet').on('click', function(){
        $('#tblConfirm tbody').html('');
        $('#tblConfirm tbody.parlayGroup').remove();
        $('#saveBet').hide();
        hideShow();
    });

    $('#saveBet').hide();
    hideShow();
    function hideShow(){
        if ($('#divSched').find('.sched-column-content .thumbnails').length > 0){
            $('#tblSColumn').show();
        } else {
            $('#tblSColumn').hide();
            $("#buyPoint").val(0);
        }

        if ($('#divSched').find('.thumbnails').length > 0){
            $('.column-footer').show();
        } else {
            $('.column-footer').hide();
            $('#amountID').val("");
            $("#buyPoint").val(0);
        }

        if ($('#divSched').find('.BSRL').length > 0){
            $('#tblSColumnforBS').show();
        } else {
            $('#tblSColumnforBS').hide();
        }
    }

    $('#clearSelect').on('click', function () {
        $('#divSched .sched-column-content input:radio, #divSched input:checkbox').prop('checked', false);
    })


});



function loadExpensesDataTable(){
    $("#tblTeam").DataTable({
        "pagingType": "simple",
        "iDisplayLength": 15,
        "order": [[ 2, "asc" ]],
        "aoColumnDefs" : [ {
            'bSortable' : false,
            'aTargets' : [ 0, 1, 2, 3, 4, 5],
        } ]
    });
}