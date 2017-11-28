$('document').ready(function(){
    var BASE_URL = $('#baseurl').val();
    var allDataArray = [];

    $('#btnSaveBet').on('click', function(){
        var sum = 0;
        $('.TAmount').each(function(){
            sum += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        });
        if(sum > $('#ABalance').text()){
            $.alert({
                title: 'Error!',
                content: 'Not enough balance! Please check you available Balance!',
            });
        } else {
            $('#TempTotalWager').val(sum);
            //************ for Straight bet******************
            var array = [];
            var headers = [];
            $('#tblConfirm th').each(function(index, item) {
                headers[index] = $(item).html();
            });
            $('#tblConfirm tbody.main tr').has('td').each(function() {
                var arrayItem = {};
                $('td', $(this)).each(function(index, item) {
                    arrayItem[headers[index]] = $(item).html();
                });
                array.push(arrayItem);
            });
            console.log(array);

            var od = JSON.stringify(array);
            var obj = JSON.parse(od);
            var Betslist = "";
            var hiddenBets = "";
            var PhiddenBets = "";
            var ThiddenBets = "";
            var PayoffDetails = "";
            $.each(obj, function (index, value) {
                var str = obj[index].Spread.split(",");
                // console.log("Odds :", str[1]);
                if(str[1] < 0){ //favorite
                    var PayoffFav = Math.abs(str[1]) * obj[index].Payoff / 100;
                    PayoffDetails = "Risk " + PayoffFav + " To Win " + obj[index].Payoff;
                    var forwin = obj[index].Payoff;
                    var forlose = PayoffFav;
                }else if(str[1] > 0) { //underdog
                    var PayoffUnd = Math.abs(str[1]) * obj[index].Payoff / 100;
                    PayoffDetails = "Risk " + obj[index].Payoff + " To Win " + PayoffUnd;
                    var forwin = PayoffUnd;
                    var forlose = obj[index].Payoff;
                }else if(str[1] == null) {
                    var PayoffEven = 110 * obj[index].Payoff / 100;
                    PayoffDetails = "Risk " + PayoffEven + " To Win " + obj[index].Payoff;
                    var forwin = obj[index].Payoff;
                    var forlose = PayoffEven;
                }

                Betslist +="<tr>"+"<td>"+ "STRAIGHT Bet on" +"</td>"+"<td>"+ obj[index].Team + "<td>"+ obj[index].Spread +"</td>" + "</td>"+"<td>"+ PayoffDetails +"</td>"+"<td class='HiddenTotalBet'>"+ forlose +"</td>"+"</tr>";

                var OUorNot = "";
                var OD = "";
                var ST = "";
                var ptBought = obj[index].pt_bought;
                var temp = str[0].split(" ");
                if(temp[0] == "O" || temp[0] == "U"){
                    if(temp[2] == "1/2"){OUorNot = temp[1] + ".5"}else{OUorNot = temp[1];}
                    ST = temp[0];
                    OD = -110;
                } else {
                    if(str[1] == null){OD = -110;} else {OD = str[1];}
                    if(str[0] == "PK" || str[0] == "PK "){OUorNot = 0}else{OUorNot = str[0];}
                    ST = "S";
                }

                var PT = "";
                if(obj[index].Type == "Straight"){ PT = "S";} else if(obj[index].Type == "Parlay"){PT = "P";} else if(obj[index].Type == "Teaser"){PT = "T";}else if(obj[index].Type == ""){PT = "P";}

                $('#savePlayer').val($('#PcustName').html());
                var pname = $('#PcustName').html();
                $('#saveBet_amt').val(obj[index].Payoff);
                $('#saveBet_type').val(PT);
                $('#saveWin').val(forwin);
                $('#saveLose').val(forlose);
                hiddenBets +="<tr>"+"<td name>"+ PT +"</td>"+"<td>"+ pname +"</td>"+"<td>"+ obj[index].Team +"</td>"+"<td>"+ forwin +"</td>"+"<td>"+ obj[index].Payoff +"</td>"+"<td>"+ forlose +"</td>"+"<td>"+ obj[index].Sports +"</td>"+"<td>"+ OUorNot +"</td>"+"<td>"+ OD +"</td>"+"<td>"+ obj[index].game_date_time  +"</td>"+"<td>"+ obj[index].grade_no +"</td>"+"<td>"+ obj[index].tpitcher  +"</td>"+"<td>"+ obj[index].tpitcher  +"</td>"+"<td>"+ ST +"</td>"+"<td>"+ ptBought +"</td>"+"</tr>";

            });
            var SRisk = 0;
            $('.TAmount').each(function(){
                SRisk += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
            });
            //************ for Straight bet******************

            //************** for Parlay bet****************************
            var Parlayarray = [];
            var Parlayheaders = [];
            $('#tblConfirm tr.trForParlay th').each(function(index, item) {
                Parlayheaders[index] = $(item).html();
            });
            $('#tblConfirm tbody.parlayGroup tr').has('td').each(function() {
                var ParlayarrayItem = {};
                $('td', $(this)).each(function(index, item) {
                    ParlayarrayItem[Parlayheaders[index]] = $(item).html();
                });
                Parlayarray.push(ParlayarrayItem);
            });

            // console.log(Parlayarray);
            var Pod = JSON.stringify(Parlayarray);
            var Pobj = JSON.parse(Pod);

            var other = {},letter,i;
            for (i=0; i < Pobj.length; i++) {
                letter = Pobj[i].PGroup;
                if (!(letter in other))
                    other[letter] = [];

                other[letter].push(Pobj[i]);
            }

            console.log(other);
            var OPod = JSON.stringify(other);
            var OPobj = JSON.parse(OPod);
            var PPayoffDetails = "";
            var ParlayType = "";
            var PBetslist = "";
            var PBetslistPayOff = "";
            var PBetslistfirst = "";
            var qwerty = "";
            $.each(OPobj, function (index, item){
                qwerty = OPobj[index].length;
                // console.log(item)
                var PF1= "";var PF2= "";var PF3= "";var PF4= "";var PF5= "";var PF6= "";
                var Odds1 = ""; var Odds2 = ""; var Odds3 = ""; var Odds4 = ""; var Odds5 = ""; var Odds6 = "";
                var SplitOdds1 = "";var SplitOdds2 = "";var SplitOdds3 = "";var SplitOdds4 = "";var SplitOdds5 = "";var SplitOdds6 = "";
                var BetUnits = ""
                $.each(item, function (x, y) {
                    // alert(item[1].Spread);
                    BetUnits = item[0].Payoff;
                    if(qwerty == 2){
                        SplitOdds1 = item[0].Spread.split(",");
                        SplitOdds2 = item[1].Spread.split(",");
                        if(SplitOdds1[1] == null){Odds1 = -110} else { Odds1 = SplitOdds1[1] }
                        if(SplitOdds2[1] == null){Odds2 = -110} else { Odds2 = SplitOdds2[1] }
                    }else if(qwerty == 3){
                        SplitOdds1 = item[0].Spread.split(",");
                        SplitOdds2 = item[1].Spread.split(",");
                        SplitOdds3 = item[2].Spread.split(",");
                        if(SplitOdds1[1] == null){Odds1 = -110} else { Odds1 = SplitOdds1[1] }
                        if(SplitOdds2[1] == null){Odds2 = -110} else { Odds2 = SplitOdds2[1] }
                        if(SplitOdds3[1] == null){Odds3 = -110} else { Odds3 = SplitOdds3[1] }
                    }else if(qwerty == 4){
                        SplitOdds1 = item[0].Spread.split(",");
                        SplitOdds2 = item[1].Spread.split(",");
                        SplitOdds3 = item[2].Spread.split(",");
                        SplitOdds4 = item[3].Spread.split(",");
                        if(SplitOdds1[1] == null){Odds1 = -110} else { Odds1 = SplitOdds1[1] }
                        if(SplitOdds2[1] == null){Odds2 = -110} else { Odds2 = SplitOdds2[1] }
                        if(SplitOdds3[1] == null){Odds3 = -110} else { Odds3 = SplitOdds3[1] }
                        if(SplitOdds4[1] == null){Odds4 = -110} else { Odds4 = SplitOdds4[1] }
                    }else if(qwerty == 5){
                        SplitOdds1 = item[0].Spread.split(",");
                        SplitOdds2 = item[1].Spread.split(",");
                        SplitOdds3 = item[2].Spread.split(",");
                        SplitOdds4 = item[3].Spread.split(",");
                        SplitOdds5 = item[4].Spread.split(",");
                        if(SplitOdds1[1] == null){Odds1 = -110} else { Odds1 = SplitOdds1[1] }
                        if(SplitOdds2[1] == null){Odds2 = -110} else { Odds2 = SplitOdds2[1] }
                        if(SplitOdds3[1] == null){Odds3 = -110} else { Odds3 = SplitOdds3[1] }
                        if(SplitOdds4[1] == null){Odds4 = -110} else { Odds4 = SplitOdds4[1] }
                        if(SplitOdds5[1] == null){Odds5 = -110} else { Odds5 = SplitOdds5[1] }
                    }else if(qwerty == 6){
                        SplitOdds1 = item[0].Spread.split(",");
                        SplitOdds2 = item[1].Spread.split(",");
                        SplitOdds3 = item[2].Spread.split(",");
                        SplitOdds4 = item[3].Spread.split(",");
                        SplitOdds5 = item[4].Spread.split(",");
                        SplitOdds6 = item[5].Spread.split(",");
                        if(SplitOdds1[1] == null){Odds1 = -110} else { Odds1 = SplitOdds1[1] }
                        if(SplitOdds2[1] == null){Odds2 = -110} else { Odds2 = SplitOdds2[1] }
                        if(SplitOdds3[1] == null){Odds3 = -110} else { Odds3 = SplitOdds3[1] }
                        if(SplitOdds4[1] == null){Odds4 = -110} else { Odds4 = SplitOdds4[1] }
                        if(SplitOdds5[1] == null){Odds5 = -110} else { Odds5 = SplitOdds5[1] }
                        if(SplitOdds6[1] == null){Odds6 = -110} else { Odds6 = SplitOdds6[1] }
                    }

                    if(Odds1 < 0){PF1 =(-(Odds1) + 100)/-(Odds1)} else if(Odds1 > 0){PF1 =(+(Odds1) + 100)/100;}else{PF1 = 1}
                    if(Odds2 < 0){PF2 =(-(Odds2) + 100)/-(Odds2)} else if(Odds2 > 0){PF2 =(+(Odds2) + 100)/100;}else{PF2 = 1}
                    if(Odds3 < 0){PF3 =(-(Odds3) + 100)/-(Odds3)} else if(Odds3 > 0){PF3 =(+(Odds3) + 100)/100;}else{PF3 = 1}
                    if(Odds4 < 0){PF4 =(-(Odds4) + 100)/-(Odds4)} else if(Odds4 > 0){PF4 =(+(Odds4) + 100)/100;}else{PF4 = 1}
                    if(Odds5 < 0){PF5 =(-(Odds5) + 100)/-(Odds5)} else if(Odds5 > 0){PF5 =(+(Odds5) + 100)/100;}else{PF5 = 1}
                    if(Odds6 < 0){PF6 =(-(Odds6) + 100)/-(Odds6)} else if(Odds6 > 0){PF6 =(+(Odds6) + 100)/100;}else{PF6 = 1}


                    var ParlayPayout = ((PF1 * PF2 * PF3 * PF4 * PF5 * PF6) - 1) * BetUnits;
                    // alert(BetUnits);
                    // alert(ParlayPayout);
                    var HPP = ""; var BU = "";
                    var PSplit = item[x].Spread.split(",");
                    var PSplitOdds = "";
                    var SplitOdds = "";
                    var OUorNOT = "";
                    var ST = "";
                    var HiddenTotalBets = "";
                    var temp = PSplit[0].split(" ");
                    if(temp[0] == "U" || temp[0] == "O"){
                        if(temp[2] == "1/2"){OUorNOT = temp[1] + ".5"}else{OUorNOT = temp[1];}
                        ST = temp[0];
                        SplitOdds = -110;
                    } else {
                        if(PSplit[1] == null){SplitOdds = -110}else{SplitOdds = PSplit[1];}
                        if(PSplit[0] == "PK" || PSplit[0] == "PK "){OUorNOT = 0;}else{OUorNOT = PSplit[0];}
                        ST = "S";
                    }
                    if(item[x].Type == ""){ PPayoffDetails = "";ParlayType = "" ; HiddenTotalBets = 0;} else {PPayoffDetails = "Risk " + BetUnits + " To Win " + Math.round(ParlayPayout); ParlayType = qwerty + " Team PARLAY on"; HiddenTotalBets = BetUnits;}
                    if(item[x].Type == ""){ HPP = ""; BU = "";} else { HPP = Math.round(ParlayPayout); BU = BetUnits}
                    // ParlayType =  qwerty + " Team Parlay on"
                    // PPayoffDetails = "Risk " + BetUnits + " To Win " + Math.round(ParlayPayout);
                    // PBetslist +="<tr>"+"<td>"+ item[x].Team +"</td>"+"<td>"+ item[x].Spread +"</td>"+"</tr>";

                    PBetslist +="<tr>"+ "<td>"+ ParlayType +"</td>" +"<td>"+ item[x].Team +"<td>"+ item[x].Spread +"</td>"+"<td>"+ PPayoffDetails +"</td>"+"<td class='HiddenTotalBet'>"+ HiddenTotalBets +"</td>"+"</tr>";
                    var ppname = $('#PcustName').html();
                    PhiddenBets +="<tr>"+"<td>"+ item[x].PGroup +"</td>"+"<td>"+ "P" +"</td>"+"<td>"+ ppname +"</td>"+"<td>"+ item[x].Team +"</td>"+"<td>"+ HPP +"</td>"+"<td>"+ item[x].Payoff +"</td>"+"<td>"+ BU +"</td>"+"<td>"+ item[x].Sports +"</td>"+"<td>"+ OUorNOT +"</td>"+"<td>"+ SplitOdds +"</td>"+"<td>"+ item[x].game_date_time  +"</td>"+"<td>"+ item[x].grade_no +"</td>"+"<td>"+ item[x].tpitcher  +"</td>"+"<td>"+ item[x].tpitcher  +"</td>"+"<td>"+ qwerty +"</td>"+"<td>"+ ST +"</td>"+"</tr>";
                });


            });
            // console.log(PN);
            //************** for Parlay bet****************************


            //************** for Teaser bet****************************
            var Teaserarray = [];
            var Teaserheaders = [];
            $('#tblConfirm tr.trForTeaser th').each(function(index, item) {
                Teaserheaders[index] = $(item).html();
            });
            $('#tblConfirm tbody.teaserGroup tr').has('td').each(function() {
                var TeaserarrayItem = {};
                $('td', $(this)).each(function(index, item) {
                    TeaserarrayItem[Teaserheaders[index]] = $(item).html();
                });
                Teaserarray.push(TeaserarrayItem);
            });

            // console.log(Teaserarray);
            var Tod = JSON.stringify(Teaserarray);
            var Tobj = JSON.parse(Tod);

            var Tother = {},letter,i;
            for (i=0; i < Tobj.length; i++) {
                letter = Tobj[i].TGroup;
                if (!(letter in Tother))
                    Tother[letter] = [];

                Tother[letter].push(Tobj[i]);
            }
            console.log(Tother);
            var TBetslist = "";
            var TeaserType = "";
            var TPayoffDetails = "";
            var TSplitOdds = "";
            var OTod = JSON.stringify(Tother);
            var OTobj = JSON.parse(OTod);
            var Tqwerty = "", TBetUnits = "", TPayOut="", TaddPTS = "";
            var SF = [];
            var SB = [];
            $.each(OTobj, function (index, item){
                Tqwerty = OTobj[index].length;
                // alert(Tqwerty);
                $.each(item, function (x, y) {
                    TBetUnits = item[0].Payoff;
                    if(y["Sports"] == "PF" || y["Sports"] == "CF"){
                        SF.push(x);
                    }else if(y["Sports"] == "PB" || y["Sports"] == "CB"){
                        SB.push(x);
                    }
                    if(Tqwerty == 2){
                        if(y["addPts"] == 4 || y["addPts"] == 6){
                            TPayOut = parseInt(TBetUnits * 10/11);
                        } else if(y["addPts"] == 4.5 || y["addPts"] == 6.5){
                            TPayOut = parseInt(TBetUnits * 10/12);
                        }else if(y["addPts"] == 5 || y["addPts"] == 7){
                            TPayOut = parseInt(TBetUnits * 10/13);
                        }
                    }else if(Tqwerty == 3){
                        if(y["addPts"] == 4 || y["addPts"] == 6){
                            TPayOut = parseInt(TBetUnits * 9/5);
                        } else if(y["addPts"] == 4.5 || y["addPts"] == 6.5){
                            TPayOut = parseInt(TBetUnits * 8/5);
                        }else if(y["addPts"] == 5 || y["addPts"] == 7){
                            TPayOut = parseInt(TBetUnits * 7/5);
                        }
                    }else if(Tqwerty == 4){
                        if(y["addPts"] == 4 || y["addPts"] == 6){
                            TPayOut = parseInt(TBetUnits * 3/1);
                        } else if(y["addPts"] == 4.5 || y["addPts"] == 6.5){
                            TPayOut = parseInt(TBetUnits * 5/2);
                        }else if(y["addPts"] == 5 || y["addPts"] == 7){
                            TPayOut = parseInt(TBetUnits * 2/1);
                        }
                    }else if(Tqwerty == 5){
                        if(y["addPts"] == 4 || y["addPts"] == 6){
                            TPayOut = parseInt(TBetUnits * 9/2);
                        } else if(y["addPts"] == 4.5 || y["addPts"] == 6.5){
                            TPayOut = parseInt(TBetUnits * 4/1);
                        }else if(y["addPts"] == 5 || y["addPts"] == 7){
                            TPayOut = parseInt(TBetUnits * 7/2);
                        }
                    }else if(Tqwerty == 6){
                        if(SF.length > SB.length){
                            if(y["addPts"] == 6){
                                TPayOut = parseInt(TBetUnits * 6/1);
                            } else if(y["addPts"] == 6.5){
                                TPayOut = parseInt(TBetUnits * 11/2);
                            }else if(y["addPts"] == 7){
                                TPayOut = parseInt(TBetUnits * 5/1);
                            }
                        } else {
                            if(y["addPts"] == 4){
                                TPayOut = parseInt(TBetUnits * 15/2);
                            } else if(y["addPts"] == 4.5){
                                TPayOut = parseInt(TBetUnits * 7/1);
                            }else if(y["addPts"] == 5){
                                TPayOut = parseInt(TBetUnits * 13/2);
                            }
                        }
                    }
                    var HiddenTotalBets = "";
                    if(item[x].Type == ""){ TPayoffDetails = "";TeaserType = ""; TaddPTS=""; HiddenTotalBets = 0; } else {TPayoffDetails = "Risk " + TBetUnits +" to win "+ TPayOut; TeaserType = Tqwerty + "-Team TEASER on"; TaddPTS = y["addPts"] + " Point "; HiddenTotalBets = TBetUnits;}
                    var TSplit = item[x].Spread.split(",");
                    var TSplitL = TSplit[0].split(" ");
                    var OUorNot = "";
                    var ST = "";
                    if(TSplitL[0] == "O" || TSplitL[0] == "U"){
                        if(TSplitL[2] == "1/2"){OUorNot = TSplitL[1] + ".5"}else{OUorNot = TSplitL[1];}
                        ST = TSplitL[0];
                        TSplitOdds = -110;
                    } else {
                        if(TSplit[1] == null){TSplitOdds = -110}else{TSplitOdds = TSplit[1];}
                        var temp = TSplit[0].split(" ");
                        if(temp[1] == "1/2"){OUorNot = temp[0] + ".5";}else{if(temp[0] == "1/2"){OUorNot = 0.5}else{OUorNot = temp[0];}}

                        ST = "S";
                    }

                    TBetslist +="<tr>"+ "<td>"+ TaddPTS + TeaserType +"</td>" +"<td>"+ item[x].Team +"<td>"+ item[x].Spread +"</td>"+"<td>"+ TPayoffDetails +"</td>"+"<td class='HiddenTotalBet'>"+ HiddenTotalBets +"</td>"+"</tr>";
                    var ppname = $('#PcustName').html();
                    ThiddenBets +="<tr>"+"<td>"+ item[x].TGroup +"</td>"+"<td>"+ "T" +"</td>"+"<td>"+ ppname +"</td>"+"<td>"+ item[x].Team +"</td>"+"<td>"+ TPayOut +"</td>"+"<td>"+ TBetUnits +"</td>"+"<td>"+ TBetUnits +"</td>"+"<td>"+ item[x].Sports +"</td>"+"<td>"+ OUorNot +"</td>"+"<td>"+ TSplitOdds +"</td>"+"<td>"+ item[x].game_date_time  +"</td>"+"<td>"+ item[x].grade_no +"</td>"+"<td>"+ item[x].tpitcher  +"</td>"+"<td>"+ item[x].tpitcher  +"</td>"+"<td>"+ y["addPts"]  +"</td>"+"<td>"+ Tqwerty +"</td>"+"<td>"+ ST +"</td>"+"</tr>";
                });
            });

            //************** for Teaser bet****************************

            // PBetslistfirst +="<tr>"+"<td>"+ ParlayType +"</td>"+"</tr>";
            // PBetslistPayOff +="<tr>"+"<td>"+ PPayoffDetails +"</td>"+"</tr>" +
            //                 "<tr>"+"<td>"+ "<br>" +"</td>"+"</tr>";
            $('#tblbackread tbody.forS').append(Betslist);
            $('#tblbackread tbody.forP').append(PBetslist);
            $('#tblbackread tbody.forT').append(TBetslist);
            $('#hiddenBetstb tbody#forSt').html(hiddenBets);
            $('#hiddenBetstb tbody#forPl').html(PhiddenBets);
            $('#hiddenBetstb tbody#forTs').html(ThiddenBets);
            $('#modalSubmitBet').modal("show");
        }

    });
    $('#CloseReadback, #btnNotConfirm').on('click', function(){
        $('#modalSubmitBet').modal("hide");
        $('#tblbackread tbody').html("");
    });
    $('body').delegate('.remove-bet', 'click', function () {
        var thisDiv = $(this).parent().parent();
        thisDiv.remove();
        hideShowbet();
    });

    $('body').delegate('.remove-parlay', 'click', function () {
        $(this).parents('tbody').empty();
        // thisDivP.remove();
        hideShowbet();
    });
    function computeAvaliableBalance(){
        var TotalWager = 0;
        var custid = $('#custid').text();
        var balance = $('#currentbet').text();
        var cap = $('#cap').text();
        var Pbalance = $('#Pbalance').text();
        $('.HiddenTotalBet').each(function(){
            TotalWager += parseFloat($(this).text());  // Or this.innerHTML, this.innerText
        });
        var TotalBet = parseFloat(balance)  + (parseFloat(-Math.abs(TotalWager)));
        var ABalance = parseFloat(cap) + parseFloat(Pbalance) + parseFloat(TotalBet);
        // alert(ABalance);
        $.ajax({
            "url" : BASE_URL + '/saveTotalWager',
            type : "POST",
            data : {
                _token : $('[name="_token"]').val(),
                TotalBet : TotalBet,
                custid : custid
            },
            success : function(response){
                $('#currentbet').text(TotalBet);
                $('#pcurrentbet').text(TotalBet);
                $('#ABalance').text(ABalance);
            },
            error : function(xhr,status,error){
                alert(error,"Please try again","error");
            }
        });
    }
    $("#btnConfirm").on("click",function(){

        //************save Straight Bet******************
        var arrayBet = [];
        var headersBet = [];
        $('#hiddenBetstb tr.forSt th').each(function(index, item) {
            headersBet[index] = $(item).html();
        });
        $('#hiddenBetstb tbody#forSt tr').has('td').each(function() {
            var arrayItem = {};
            $('td', $(this)).each(function(index, item) {
                arrayItem[headersBet[index]] = $(item).html();
            });
            arrayBet.push(arrayItem);
        });
        console.log(arrayBet);

        //************save Straight Bet******************

        //************save Parlay Bet******************
        var ParrayBet = [];
        var PheadersBet = [];
        $('#hiddenBetstb tr.forPl th').each(function(index, item) {
            PheadersBet[index] = $(item).html();
        });
        $('#hiddenBetstb tbody#forPl tr').has('td').each(function() {
            var arrayItem = {};
            $('td', $(this)).each(function(index, item) {
                arrayItem[PheadersBet[index]] = $(item).html();
            });
            ParrayBet.push(arrayItem);
        });
        // console.log(ParrayBet);

        var Pod = JSON.stringify(ParrayBet);
        var Pobj = JSON.parse(Pod);

        var SplitParlay = {},letter,i;
        for (i=0; i < Pobj.length; i++) {
            letter = Pobj[i].PGroup;
            if (!(letter in SplitParlay))
                SplitParlay[letter] = [];

            SplitParlay[letter].push(Pobj[i]);
        }
        console.log(SplitParlay);

        //************save Parlay Bet******************

        //************save Teaser Bet******************
        var TarrayBet = [];
        var TheadersBet = [];
        $('#hiddenBetstb tr.forTs th').each(function(index, item) {
            TheadersBet[index] = $(item).html();
        });
        $('#hiddenBetstb tbody#forTs tr').has('td').each(function() {
            var arrayItem = {};
            $('td', $(this)).each(function(index, item) {
                arrayItem[TheadersBet[index]] = $(item).html();
            });
            TarrayBet.push(arrayItem);
        });
        // console.log(TarrayBet);
        var Pod = JSON.stringify(TarrayBet);
        var Pobj = JSON.parse(Pod);

        var SplitTeaser = {},letter,i;
        for (i=0; i < Pobj.length; i++) {
            letter = Pobj[i].TGroup;
            if (!(letter in SplitTeaser))
                SplitTeaser[letter] = [];

            SplitTeaser[letter].push(Pobj[i]);
        }
        console.log(SplitTeaser);
        //************save Teaser Bet******************

        // if(arrayBet.length > 0 && ParrayBet.length == 0 && TarrayBet.length == 0){
        var params = {
            type: "POST",
            success : function(response){
                if(response == 0){
                    computeAvaliableBalance();
                    AfterSaveFunction();
                    $.alert({
                        title: 'Success!',
                        content: 'Successfully save Bet',
                    });
                }
            },
            error : function(xhr,status,error){
                alert(error,"Please try again","error");
            }
        };
        if(arrayBet.length > 0 && ParrayBet.length == 0 && TarrayBet.length == 0){//Straight
            params.url = BASE_URL + '/saveBets';
            params.data =  {
                     _token : $('[name="_token"]').val(),
                     dataArray : arrayBet
                 };

        }else if(arrayBet.length == 0 && ParrayBet.length > 0 && TarrayBet.length == 0){//Parlay
            params.url = BASE_URL + '/saveParlayBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                ParlayArray : SplitParlay
            };
        }else if(arrayBet.length == 0 && ParrayBet.length == 0 && TarrayBet.length > 0){//Teaser
            params.url = BASE_URL + '/saveTeaserBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                TeaserArray : SplitTeaser
            };
        }else if(arrayBet.length == 0 && ParrayBet.length > 0 && TarrayBet.length > 0){
            params.url = BASE_URL + '/savePTBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                ParlayArray : SplitParlay,
                TeaserArray : SplitTeaser
            };
        }else if(arrayBet.length > 0 && ParrayBet.length == 0 && TarrayBet.length > 0){
            params.url = BASE_URL + '/saveSTBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                dataArray : arrayBet,
                TeaserArray : SplitTeaser
            };
        }else if(arrayBet.length > 0 && ParrayBet.length > 0 && TarrayBet.length == 0){
            params.url = BASE_URL + '/saveSPBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                dataArray : arrayBet,
                ParlayArray : SplitParlay
            };
        }else if(arrayBet.length > 0 && ParrayBet.length > 0 && TarrayBet.length > 0){
            params.url = BASE_URL + '/saveAllBets';
            params.data =  {
                _token : $('[name="_token"]').val(),
                dataArray : arrayBet,
                ParlayArray : SplitParlay,
                TeaserArray : SplitTeaser
            };
        }
            $.ajax(params);
    });
});
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
// hideShowbet();
function hideShowbet(){
    if ($('#saveBet').find('.betSelect').length > 0){
        $('#saveBet').show();
    } else {
        $('#saveBet').hide();
    }
}
function hideShow(){
    if ($('#divSched').find('.thumbnails').length > 0){
        $('.column-footer').show();
    } else {
        $('.column-footer').hide();
        $('#amountID').val("");
    }
}
function AfterSaveFunction() {
    $("#modalSubmitBet").modal("hide");
    $("tbody.main").html("");
    $("tbody.parlayGroup").html("");
    $("tbody.teaserGroup").html("");
    $("#divSched .sched-column-content").html("");
    $('#tblbackread tbody').html("");
    hideShowbet();
    hideShow();
}