/**
 * Created by Samuel on 8/17/2017.
 */

$('document').ready(function() {
    var BASE_URL = $('#baseurl').val();

    $('#btnStraight').on('click', function(){
        var betType = $(this).val();
        var amount = $('#amountID').val();
        var BuyPoints = $('#buyPoint').find(':selected').val();
        if ($('.thumbnails input:checked').length > 0){
            if($('#amountID').val() !== ""){
                var values = [];
                var values2 = [];
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
                    var adjustedOdds = "";
                    var tempOdds = "";
                    var finalLine = "";
                    //Straight bet button
                    $.each(values, function (index, val) {
                        if(val.dOdds.indexOf(" ") >= 0){tempOdds = -110}else{tempOdds = val.dOdds.replace(/,/g, '')}
                        // alert(tempOdds);
                        if(val.sportsType == "PF" || val.sportsType == "CF"){
                            finalLine = parseFloat(BuyPoints) + parseFloat(val.dLine);
                            if(BuyPoints == 0.5){
                                if(val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -3.5 || val.dLine == -7.5){
                                    adjustedOdds = ","+ (-20 + parseInt(tempOdds));
                                } else {adjustedOdds = ","+ (-10 + parseInt(tempOdds))}
                            }else if(BuyPoints == 1){
                                if(val.dLine == 2 || val.dLine == 6 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -4 || val.dLine == -8){
                                    adjustedOdds = ","+ (-30 + parseInt(tempOdds));
                                } else if(val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == -3.5 || val.dLine == -7.5){
                                    adjustedOdds = ","+ (-40 + parseInt(tempOdds));
                                }else {adjustedOdds = ","+ (-20 + parseInt(tempOdds))}
                            }else if(BuyPoints == 1.5){
                                if(val.dLine == 1.5 || val.dLine == 5.5 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -4.5 || val.dLine == -8.5){
                                    adjustedOdds = ","+ (-40 + parseInt(tempOdds));
                                }else if(val.dLine == 2 || val.dLine == 6 || val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == -3.5 || val.dLine == -7.5 || val.dLine == -4 || val.dLine == -8){
                                    adjustedOdds = ","+ (-50 + parseInt(tempOdds));
                                }else {adjustedOdds = ","+ (-30 + parseInt(tempOdds))}
                            }else{
                                finalLine = val.dLine;
                                adjustedOdds = val.dOdds;
                            }
                        } else if(val.sportsType == "PB" || val.sportsType == "CB"){
                            finalLine = parseFloat(BuyPoints) + parseFloat(val.dLine);
                            if(BuyPoints == 0.5){
                                adjustedOdds = ","+ (-10 + parseInt(tempOdds));
                            }else if(BuyPoints == 1){
                                adjustedOdds = ","+ (-20 + parseInt(tempOdds));
                            }else if(BuyPoints == 1.5){
                                adjustedOdds = ","+ (-30 + parseInt(tempOdds));
                            }else{
                                finalLine = val.dLine;
                                adjustedOdds = val.dOdds;
                            }
                        } else {
                            finalLine = val.dLine;
                            adjustedOdds = val.dOdds;
                        }
                        var pitch = "";
                        var SPTeam = "";
                        if(val.sportsType == "BS" || val.sportsType == "RL"){
                            if(val.pitcher == "" && val.vspitcher != ""){pitch = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch = "";}
                            SPTeam = val.sportsTeam + pitch;
                        }else{SPTeam = val.sportsTeam;}
                        list +="<tr class='betSelect'>"+"<td style='display: none'>"+ BuyPoints +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ finalLine + adjustedOdds +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-bet">' + '&times;' + '</button>' + "</td>"+"</tr>";
                    });
                    $('#saveBet').show();

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
                    var finalLine = "";
                    var adjustedOdds = "";
                    var OUSpread = "", tempOdds = "";
                    //Straight bet button
                    $.each(values, function (index, val) {
                        if(val.sportsType == "PF" || val.sportsType == "CF" || val.sportsType == "PB" || val.sportsType == "CB"){
                            var temp = val.radio.split(" ");
                            if(temp[0] == "O"){
                                tempOdds = val.overOdds;
                                finalLine = temp[0] + " " + (parseFloat(temp[1]) - parseFloat(BuyPoints));
                            } else {
                                tempOdds = val.underOdds;
                                finalLine = temp[0] + " " + (parseFloat(BuyPoints) + parseFloat(temp[1]));
                            }
                            if(BuyPoints == 0.5){
                                adjustedOdds = ","+ (-10 + parseInt(tempOdds));
                            }else if(BuyPoints == 1){
                                adjustedOdds = ","+ (-20 + parseInt(tempOdds));
                            }else if(BuyPoints == 1.5){
                                adjustedOdds = ","+ (-30 + parseInt(tempOdds));
                            }else{
                                finalLine = temp[0] + " " + temp[1];
                                if(tempOdds == -110){adjustedOdds = ""}else{adjustedOdds = ","+ tempOdds}
                            }
                            OUSpread = finalLine + adjustedOdds;
                        }else{
                            var temp = val.radio.split(" ");
                            if(temp[0] == "O"){
                                tempOdds = val.overOdds;
                            } else {
                                tempOdds = val.underOdds;
                            }
                            if(tempOdds == -110){finalLine = val.radio}else{finalLine = val.radio + "," + tempOdds}
                            OUSpread = finalLine;
                        }
                        // var pitch = "";
                        var SPTeam = "";
                        if(val.sportsType == "BS" || val.sportsType == "RL"){
                            // if(val.pitcher == "" && val.vspitcher != ""){pitch = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch = "";}
                            var pitch = " " + val.pitcher+"/"+val.vspitcher;
                            SPTeam = val.sportsTeam + pitch;
                        }else{SPTeam = val.sportsTeam;}
                        list +="<tr class='betSelect'>"+"<td style='display: none'>"+ BuyPoints +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ OUSpread +"</td>"+"<td class='TAmount'>"+ amount + "</td>"+"<td>" + '<button type="button" class="remove-bet">' + '&times;' + '</button>' + "</td>"+"</tr>";
                    });
                    $('#saveBet').show();

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
                    var finalLine = "";
                    var adjustedOdds = "";
                    var OUSpread = "", tempOdds2 = "";
                    var adjustedOdds = "";
                    var tempOdds = "";
                    var finalLine = "";
                     //Straight bet button
                    $.each(values, function (index, val) {
                        if(val.dOdds.indexOf(" ") >= 0){tempOdds = -110}else{tempOdds = val.dOdds.replace(/,/g, '')}
                        // alert(tempOdds);
                        if(val.sportsType == "PF" || val.sportsType == "CF"){
                            finalLine = parseFloat(BuyPoints) + parseFloat(val.dLine);
                            if(BuyPoints == 0.5){
                                if(val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -3.5 || val.dLine == -7.5){
                                    adjustedOdds = ","+ (-20 + parseInt(tempOdds));
                                } else {adjustedOdds = ","+ (-10 + parseInt(tempOdds))}
                            }else if(BuyPoints == 1){
                                if(val.dLine == 2 || val.dLine == 6 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -4 || val.dLine == -8){
                                    adjustedOdds = ","+ (-30 + parseInt(tempOdds));
                                } else if(val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == -3.5 || val.dLine == -7.5){
                                    adjustedOdds = ","+ (-40 + parseInt(tempOdds));
                                }else {adjustedOdds = ","+ (-20 + parseInt(tempOdds))}
                            }else if(BuyPoints == 1.5){
                                if(val.dLine == 1.5 || val.dLine == 5.5 || val.dLine == 3 || val.dLine == 7 || val.dLine == -3 || val.dLine == -7 || val.dLine == -4.5 || val.dLine == -8.5){
                                    adjustedOdds = ","+ (-40 + parseInt(tempOdds));
                                }else if(val.dLine == 2 || val.dLine == 6 || val.dLine == 2.5 || val.dLine == 6.5 || val.dLine == -3.5 || val.dLine == -7.5 || val.dLine == -4 || val.dLine == -8){
                                    adjustedOdds = ","+ (-50 + parseInt(tempOdds));
                                }else {adjustedOdds = ","+ (-30 + parseInt(tempOdds))}
                            }else{
                                finalLine = val.dLine;
                                adjustedOdds = val.dOdds;
                            }
                        } else if(val.sportsType == "PB" || val.sportsType == "CB"){
                            finalLine = parseFloat(BuyPoints) + parseFloat(val.dLine);
                            if(BuyPoints == 0.5){
                                adjustedOdds = ","+ (-10 + parseInt(tempOdds));
                            }else if(BuyPoints == 1){
                                adjustedOdds = ","+ (-20 + parseInt(tempOdds));
                            }else if(BuyPoints == 1.5){
                                adjustedOdds = ","+ (-30 + parseInt(tempOdds));
                            }else{
                                finalLine = val.dLine;
                                adjustedOdds = val.dOdds;
                            }
                        } else {
                            finalLine = val.dLine;
                            adjustedOdds = val.dOdds;
                        }
                        var pitch = "";
                        var SPTeam = "";
                        if(val.sportsType == "BS" || val.sportsType == "RL"){
                            if(val.pitcher == "" && val.vspitcher != ""){pitch = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch = "";}
                            SPTeam = val.sportsTeam + pitch;
                        }else{SPTeam = val.sportsTeam;}
                        list +="<tr class='betSelect'>"+"<td style='display: none'>"+ BuyPoints +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ finalLine + adjustedOdds +"<td class='TAmount'>"+ amount + "</td>"+"<td>" + '<button type="button" class="remove-bet">' + '&times;' + '</button>' + "</td>"+"</tr>";
                    });
                    $.each(values2, function (index, val) {
                        if(val.sportsType == "PF" || val.sportsType == "CF" || val.sportsType == "PB" || val.sportsType == "CB"){
                            var temp = val.radio.split(" ");
                            if(temp[0] == "O"){
                                tempOdds2 = val.overOdds;
                                finalLine = temp[0] + " " + (parseFloat(temp[1]) - parseFloat(BuyPoints));
                            } else {
                                tempOdds2 = val.underOdds;
                                finalLine = temp[0] + " " + (parseFloat(BuyPoints) + parseFloat(temp[1]));
                            }
                            if(BuyPoints == 0.5){
                                adjustedOdds = ","+ (-10 + parseInt(tempOdds2));
                            }else if(BuyPoints == 1){
                                adjustedOdds = ","+ (-20 + parseInt(tempOdds2));
                            }else if(BuyPoints == 1.5){
                                adjustedOdds = ","+ (-30 + parseInt(tempOdds2));
                            }else{
                                finalLine = temp[0] + " " + temp[1];
                                if(tempOdds2 == -110){adjustedOdds = ""}else{adjustedOdds = ","+ tempOdds2}
                            }
                            OUSpread = finalLine + adjustedOdds;
                        }else{
                            var temp = val.radio.split(" ");
                            if(temp[0] == "O"){
                                tempOdds2 = val.overOdds;
                            } else {
                                tempOdds2 = val.underOdds;
                            }
                            if(tempOdds2 == -110){finalLine = val.radio}else{finalLine = val.radio + "," + tempOdds}
                            OUSpread = finalLine;
                        }
                        // var pitch = "";
                        var SPTeam = "";
                        if(val.sportsType == "BS" || val.sportsType == "RL"){
                            // if(val.pitcher == "" && val.vspitcher != ""){pitch = " " + val.vspitcher;} else if(val.pitcher != "" && val.vspitcher == ""){pitch = " " + val.pitcher;}else if(val.pitcher != "" && val.vspitcher != ""){pitch = " " + val.pitcher+"/"+val.vspitcher;}else if(val.pitcher == "" && val.vspitcher == ""){pitch = "";}
                            var pitch = " " + val.pitcher+"/"+val.vspitcher;
                            SPTeam = val.sportsTeam + pitch;
                        }else{SPTeam = val.sportsTeam;}
                        list +="<tr class='betSelect'>"+"<td style='display: none'>"+ BuyPoints +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ SPTeam +"</td>"+"<td>"+ OUSpread +"</td>"+"<td class='TAmount'>"+ amount + "</td>"+"<td>" + '<button type="button" class="remove-bet">' + '&times;' + '</button>' + "</td>"+"</tr>";
                    });
                    $('#saveBet').show();
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