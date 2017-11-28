/**
 * Created by Samuel on 8/17/2017.
 */

$('document').ready(function(){
    $('#btnParlay').on('click', function(){
        var betType = $(this).val();
        var amount = $('#amountID').val();
        if ($('.thumbnails input:checked').length > 0){
            if($('#amountID').val() !== ""){
                var values = [];
                var values2 = [];
                var cntChkTeam = parseInt($('.thumbnails input.thisOU:radio:checked').length) + parseInt($('.thumbnails input:checkbox:checked').length);
                // alert(cntChkTeam);
                if($('.thumbnails input:checkbox:checked').length > 0 && $('.thumbnails input.thisOU:radio:checked').length == 0){
                    $("#divSched input:checkbox:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            dOdds : $(this).val() || " ",
                            dLine  : $(row).find("input[name=dLine]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            gameDate  : $(row).find("input[name=game-date]").val(),
                            // gameTime  : $(row).find("input[name=game-time]").val(),
                            gradeNo  : $(row).find("input[name=team-grade]").val(),
                            pitcher  : $(row).find("input.tpitcher:radio:checked").val(),
                            vspitcher  : $(row).find("input.vspitcher:radio:checked").val(),
                        });
                    });
                    console.log(values);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    //btn Parlay button click
                    var PCounter= $('tbody.parlayGroup').length + 1;
                    if(cntChkTeam > 1 && cntChkTeam < 7){
                        var pitch = "";
                        var SPTeam = "";
                        if(values[0].sportsType == "BS" || values[0].sportsType == "RL"){
                            if(values[0].pitcher == "" && values[0].vspitcher != ""){pitch = " " + values[0].vspitcher;} else if(values[0].pitcher != "" && values[0].vspitcher == ""){pitch = " " + values[0].pitcher;}else if(values[0].pitcher != "" && values[0].vspitcher != ""){pitch = " " + values[0].pitcher+"/"+values[0].vspitcher;}else if(values[0].pitcher == "" && values[0].vspitcher == ""){pitch = "";}
                            SPTeam = values[0].sportsTeam + pitch;
                        }else{SPTeam = values[0].sportsTeam;}
                        firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";
                        $.each(values.slice(1), function (index, val) {
                            var pitch2 = "";
                            var SPTeam2 = "";
                            if(val.sportsType == "BS" || val.sportsType == "RL"){
                                if(val.pitcher == "" && val.vspitcher != ""){pitch2 = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch2 = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch2 = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch2 = "";}
                                SPTeam2 = val.sportsTeam + pitch2;
                            }else{SPTeam2 = val.sportsTeam;}
                            Plist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam2 +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                        });
                        $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'Please select 2 to 6 teams!',
                        });
                    }

                } else if($('.thumbnails input.thisOU:radio:checked').length > 0 && $('.thumbnails input:checkbox:checked').length == 0 ) {
                    $("#divSched input.thisOU:radio:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            gameDate  : $(row).find("input[name=game-date]").val(),
                            // gameTime  : $(row).find("input[name=game-time]").val(),
                            gradeNo  : $(row).find("input[name=team-grade]").val(),
                            pitcher  : $(row).find("input.tpwp").val(),
                            vspitcher  : $(row).find("input.vswp").val(),
                            overOdds  : $(row).find("input[name=over-odds]").val(),
                            underOdds  : $(row).find("input[name=under-odds]").val(),
                            radio       :  $(row).find('input.thisOU:radio:checked').val() || " "
                        });
                    });
                    // console.log(values);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    var OUSpread = "";
                    var OUSpread2 = "";
                    //btn Parlay button click
                    var PCounter= $('tbody.parlayGroup').length + 1;
                    if(cntChkTeam > 1 && cntChkTeam < 7){
                        var temp = values[0].radio.split(" ");
                        var tempOdds = "";
                        if(temp[0] == "O"){
                            tempOdds = values[0].overOdds;
                        } else {
                            tempOdds = values[0].underOdds;
                        }
                        if(values[0].sportsType == "PF" || values[0].sportsType == "CF" || values[0].sportsType == "PB" || values[0].sportsType == "CB"){
                            if(tempOdds == -110){OUSpread = values[0].radio}else{OUSpread = values[0].radio + "," + tempOdds}
                        }else{
                            OUSpread = values[0].radio + "," + tempOdds;
                        }
                        var pitch = "";
                        var SPTeam = "";
                        if(values[0].sportsType == "BS" || values[0].sportsType == "RL"){
                            if(values[0].pitcher == "" && values[0].vspitcher != ""){pitch = " " + values[0].vspitcher;} else if(values[0].pitcher != "" && values[0].vspitcher == ""){pitch = " " + values[0].pitcher;}else if(values[0].pitcher != "" && values[0].vspitcher != ""){pitch = " " + values[0].pitcher+"/"+values[0].vspitcher;}else if(values[0].pitcher == "" && values[0].vspitcher == ""){pitch = "";}
                            SPTeam = values[0].sportsTeam + pitch;
                        }else{SPTeam = values[0].sportsTeam;}
                        firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ OUSpread +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";
                        // console.log(values[0].sportsType);
                        $.each(values.slice(1), function (index, val) {
                            var temp2 = val.radio.split(" ");
                            var tempOdds2 = "";
                            if(temp2[0] == "O"){
                                tempOdds2 = val.overOdds;
                            } else {
                                tempOdds2 = val.underOdds;
                            }
                            if(val.sportsType == "PF" || val.sportsType == "CF" || val.sportsType == "PB" || val.sportsType == "CB"){
                                if(tempOdds2 == -110){OUSpread2 = val.radio}else{OUSpread2 = val.radio + "," + tempOdds2}
                            }else{
                                OUSpread2 = val.radio + "," + tempOdds2;
                            }
                            // var pitch2 = "";
                            var SPTeam2 = "";
                            if(val.sportsType == "BS" || val.sportsType == "RL"){
                                // if(val.pitcher == "" && val.vspitcher != ""){pitch2 = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch2 = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch2 = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch2 = "";}
                                var pitch2 = " " + val.pitcher+"/"+val.vspitcher;
                                SPTeam2 = val.sportsTeam + pitch2;
                            }else{SPTeam2 = val.sportsTeam;}
                            Plist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam2 +"</td>"+"<td>"+ OUSpread2 +"</td>"+"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                        });
                        $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'Please select 2 to 6 teams!',
                        });
                    }

                } else if ($('.thumbnails input.thisOU:radio:checked').length > 0 && $('.thumbnails input:checkbox:checked').length > 0 ) {
                    $("#divSched input:checkbox:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            dOdds : $(this).val() || " ",
                            dLine  : $(row).find("input[name=dLine]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            gameDate  : $(row).find("input[name=game-date]").val(),
                            // gameTime  : $(row).find("input[name=game-time]").val(),
                            gradeNo  : $(row).find("input[name=team-grade]").val(),
                            pitcher  : $(row).find("input.tpitcher:radio:checked").val(),
                            vspitcher  : $(row).find("input.vspitcher:radio:checked").val(),
                        });
                    });
                    $("#divSched input.thisOU:radio:checked").each(function(){
                        row = $(this).closest("tr");
                        values2.push({
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            gameDate  : $(row).find("input[name=game-date]").val(),
                            // gameTime  : $(row).find("input[name=game-time]").val(),
                            gradeNo  : $(row).find("input[name=team-grade]").val(),
                            pitcher  : $(row).find("input.tpwp").val(),
                            vspitcher  : $(row).find("input.vswp").val(),
                            overOdds  : $(row).find("input[name=over-odds]").val(),
                            underOdds  : $(row).find("input[name=under-odds]").val(),
                            radio       :  $(row).find('input.thisOU:radio:checked').val() || " "
                        });
                    });
                    console.log(values);
                    console.log(values2);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    var OUSpread2 = "";
                    //btn Parlay button click
                    var PCounter= $('tbody.parlayGroup').length + 1;
                    if(cntChkTeam > 1 && cntChkTeam < 7){
                        var pitch = "";
                        var SPTeam = "";
                        if(values[0].sportsType == "BS" || values[0].sportsType == "RL"){
                            if(values[0].pitcher == "" && values[0].vspitcher != ""){pitch = " " + values[0].vspitcher;} else if(values[0].pitcher != "" && values[0].vspitcher == ""){pitch = " " + values[0].pitcher;}else if(values[0].pitcher != "" && values[0].vspitcher != ""){pitch = " " + values[0].pitcher+"/"+values[0].vspitcher;}else if(values[0].pitcher == "" && values[0].vspitcher == ""){pitch = "";}
                            SPTeam = values[0].sportsTeam + pitch;
                        }else{SPTeam = values[0].sportsTeam;}
                        firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds  +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";
                        $.each(values.slice(1), function (index, val) {
                            var pitch2 = "";
                            var SPTeam2 = "";
                            if(val.sportsType == "BS" || val.sportsType == "RL"){
                                if(val.pitcher == "" && val.vspitcher != ""){pitch2 = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch2 = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch2 = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch2 = "";}
                                SPTeam2 = val.sportsTeam + pitch2;
                            }else{SPTeam2 = val.sportsTeam;}
                            Plist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam2 +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                        });
                        $.each(values2, function (index, val) {
                            var temp2 = val.radio.split(" ");
                            var tempOdds2 = "";
                            if(temp2[0] == "O"){
                                tempOdds2 = val.overOdds;
                            } else {
                                tempOdds2 = val.underOdds;
                            }
                            if(val.sportsType == "PF" || val.sportsType == "CF" || val.sportsType == "PB" || val.sportsType == "CB"){
                                if(tempOdds2 == -110){OUSpread2 = val.radio}else{OUSpread2 = val.radio + "," + tempOdds2}
                            }else{
                                OUSpread2 = val.radio + "," + tempOdds2;
                            }
                            // var pitch2 = "";
                            var SPTeam2 = "";
                            if(val.sportsType == "BS" || val.sportsType == "RL"){
                                // if(val.pitcher == "" && val.vspitcher != ""){pitch2 = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch2 = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch2 = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch2 = "";}
                                var pitch2 = " " + val.pitcher+"/"+val.vspitcher;
                                SPTeam2 = val.sportsTeam + pitch2;
                            }else{SPTeam2 = val.sportsTeam;}
                            Plist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "ParlayNo"+PCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam2 +"</td>"+"<td>"+ OUSpread2 +"</td>"+"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                        });
                        $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'Please select 2 to 6 teams!',
                        });
                    }

                }
                $("#tblConfirm tbody.main").append(list);
                // $('#divSched input:radio, #divSched input:checkbox').prop('checked', false);
                $('#amountID').val("");
                $("#buyPoint").val(0);
            } else {
                $.alert({
                    title: 'Error!',
                    content: 'Please enter amount!',
                });
                $('#amountID').focus();
            }
        } else {
            $.alert({
                title: 'Error!',
                content: 'You must select bet first!',
            });
        }

    });
});