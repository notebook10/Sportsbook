/**
 * Created by Samuel on 8/17/2017.
 */

$('document').ready(function(){
    $('body').delegate('.thumbnails input[type=radio],.thumbnails input[type=checkbox]','click', function() {
        var forT10Pts = $('.thumbnails input:checked').filter('.SC , .TN , .B1 , .BS , .RL , .HK , .PL , .AR , .GF , .BX, .PB, .CB').length;
        if (forT10Pts > 0) {
            $('#btnTeaser10').attr('disabled','disabled');
        } else if(forT10Pts == 0){
            $('#btnTeaser10').removeAttr('disabled');
        }
    });
   $('.btnBetTeaser').on('click', function(){
       var SPType = $('.thumbnails input:checked').filter('.SC , .TN , .B1 , .BS , .RL , .HK , .PL , .AR , .GF , .BX').length;
       if ($('.thumbnails input:checked').length > 0){
           if(SPType > 0){
               $.alert({
                   title: 'Error!',
                   content: 'You must select Football and Basketball only!',
               });
           } else {
               if($('#amountID').val() !== ""){
                   var TeaserPts = $(this).attr('id');
                   var amount = $('#amountID').val();
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
                           });
                       });
                       // console.log(values);
                       var firstlist = "";
                       var list = "";
                       var Tlist = "";
                       var TCounter= $('tbody.teaserGroup').length + 1;
                       if($("#divSched input:checked").length > 1 && $("#divSched input:checked").length < 7){
                           var faddPts = "", fafterPts = "";
                           if(TeaserPts == "btnTeaser46"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6;}else{faddPts = 4;}
                           }else if(TeaserPts == "btnTeaser4565"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6.5;}else{faddPts = 4.5;}
                           }else if(TeaserPts == "btnTeaser57"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 7;}else{faddPts = 5;}
                           }else if(TeaserPts == "btnTeaser10"){
                               faddPts = 10;
                           }
                           var checkDL = "";
                           if(values[0].dLine == "PK"){checkDL = 0}else{checkDL = values[0].dLine}
                           var fconvertPts = parseFloat(checkDL) + faddPts
                               , frounded = Math.floor(Math.abs(fconvertPts))
                               , frest  = Math.abs(fconvertPts) - Math.floor(Math.abs(fconvertPts));
                           var f1 = new Fraction(1, frest);
                           var Ffra = "", fround = "";
                           if(f1.denominator == 1 && f1.numerator == 1){Ffra = ""} else {Ffra = f1.denominator + '/' + f1.numerator;}
                           if(frounded == 0 && f1.denominator == 1 && f1.numerator == 1){fround = 0}else if(frounded != 0){fround = frounded+ ' ';}
                           var ftotalPts = fround + Ffra;
                           if(fconvertPts >= 0){fafterPts = ftotalPts;}else if(fconvertPts < 0){fafterPts ="-"+ ftotalPts;}
                           firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td  style='display: none'>"+ faddPts +"</td>"+"<td class='TPoint' value='"+faddPts+"'>"+ "Teaser "+faddPts+" pts" +"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ fafterPts +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";

                           $.each(values.slice(1), function (index, val) {
                               var addPts = "", afterPts = "";
                               if(TeaserPts == "btnTeaser46"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6;}else{addPts = 4;}
                               }else if(TeaserPts == "btnTeaser4565"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6.5;}else{addPts = 4.5;}
                               }else if(TeaserPts == "btnTeaser57"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 7;}else{addPts = 5;}
                               }else if(TeaserPts == "btnTeaser10"){
                                   addPts = 10;
                               }
                               var checkDL = "";
                               if(val.dLine == "PK"){checkDL = 0}else{checkDL = val.dLine}
                               var convertPts = parseFloat(checkDL) + addPts
                                   , rounded = Math.floor(Math.abs(convertPts))
                                   , rest  = Math.abs(convertPts) - Math.floor(Math.abs(convertPts));
                               var f = new Fraction(1, rest);
                               var fra = "", round = "";
                               if(f.denominator == 1 && f.numerator == 1){fra = ""} else {fra = f.denominator + '/' + f.numerator;}
                               if(rounded == 0 && f.denominator == 1 && f.numerator == 1){round = 0}else if(rounded != 0){round = rounded+ ' ';}
                               var totalPts = round + fra;
                               if(convertPts >= 0){afterPts = totalPts;}else if(convertPts < 0){afterPts ="-"+ totalPts;}
                               Tlist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td  style='display: none'>"+ addPts +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ afterPts +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                           });

                           $("#tblConfirm").append('<tbody class="teaserGroup" id="Teaser'+TCounter+'">' +firstlist + Tlist +'</tbody>');
                           $('#saveBet').show();
                           $('#amountID').val("");
                           $("#buyPoint").val(0);
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
                               radio       :  $(row).find('input[type=radio]:checked').val() || " "
                           });
                       });
                       // console.log(values);
                       var firstlist = "";
                       var list = "";
                       var Tlist = "";
                       var TCounter= $('tbody.teaserGroup').length + 1;
                       if($("input:checked").length > 1 && $("input:checked").length < 7){
                           var faddPts = "", fafterPts = "";
                           if(TeaserPts == "btnTeaser46"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6;}else{faddPts = 4;}
                           }else if(TeaserPts == "btnTeaser4565"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6.5;}else{faddPts = 4.5;}
                           }else if(TeaserPts == "btnTeaser57"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 7;}else{faddPts = 5;}
                           }else if(TeaserPts == "btnTeaser10"){
                               faddPts = 10;
                           }
                           var fsplitradio = values[0].radio.split(" ");
                           var fconvertPts = parseFloat(fsplitradio[1]) + faddPts
                               , frounded = Math.floor(Math.abs(fconvertPts))
                               , frest  = Math.abs(fconvertPts) - Math.floor(Math.abs(fconvertPts));
                           var f1 = new Fraction(1, frest);
                           var Ffra = "", fround = "";
                           if(f1.denominator == 1 && f1.numerator == 1){Ffra = ""} else {Ffra = f1.denominator + '/' + f1.numerator;}
                           if(frounded == 0 && f1.denominator == 1 && f1.numerator == 1){fround = 0}else if(frounded != 0){fround = frounded+ ' ';}
                           var ftotalPts = fround + Ffra;
                           if(fconvertPts >= 0){fafterPts = ftotalPts;}else if(fconvertPts < 0){fafterPts ="-"+ ftotalPts;}
                           firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td  style='display: none'>"+ faddPts +"</td>"+"<td class='TPoint' value='"+faddPts+"'>"+ "Teaser "+faddPts+" pts" +"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ fsplitradio[0]+" "+fafterPts +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";

                           $.each(values.slice(1), function (index, val) {
                               var addPts = "", afterPts = "";
                               if(TeaserPts == "btnTeaser46"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6;}else{addPts = 4;}
                               }else if(TeaserPts == "btnTeaser4565"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6.5;}else{addPts = 4.5;}
                               }else if(TeaserPts == "btnTeaser57"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 7;}else{addPts = 5;}
                               }else if(TeaserPts == "btnTeaser10"){
                                   addPts = 10;
                               }
                               var convertPts = "";
                               var splitradio = val.radio.split(" ");
                               if(splitradio[0] == "O"){convertPts = parseFloat(splitradio[1]) - addPts;}else{convertPts = parseFloat(splitradio[1]) + addPts;}
                               var rounded = Math.floor(Math.abs(convertPts));
                               var rest  = Math.abs(convertPts) - Math.floor(Math.abs(convertPts));
                               var f = new Fraction(1, rest);
                               var fra = "", round = "";
                               if(f.denominator == 1 && f.numerator == 1){fra = ""} else {fra = f.denominator + '/' + f.numerator;}
                               if(rounded == 0 && f.denominator == 1 && f.numerator == 1){round = 0}else if(rounded != 0){round = rounded+ ' ';}
                               var totalPts = round + fra;
                               if(convertPts >= 0){afterPts = totalPts;}else if(convertPts < 0){afterPts ="-"+ totalPts;}
                               Tlist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td  style='display: none'>"+ addPts +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ splitradio[0] +" "+ afterPts +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                           });

                           $("#tblConfirm").append('<tbody class="teaserGroup" id="Teaser'+TCounter+'">' +firstlist + Tlist +'</tbody>');
                           $('#saveBet').show();
                           $('#amountID').val("");
                           $("#buyPoint").val(0);
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
                               radio       :  $(row).find('input[type=radio]:checked').val() || " "
                           });
                       });
                       // console.log(values);
                       // console.log(values2);
                       var firstlist = "";
                       var list = "";
                       var Tlist = "";
                       var TCounter= $('tbody.teaserGroup').length + 1;
                       if($("#divSched input:checked").length > 1 && $("#divSched input:checked").length < 7){
                           var faddPts = "", fafterPts = "";
                           if(TeaserPts == "btnTeaser46"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6;}else{faddPts = 4;}
                           }else if(TeaserPts == "btnTeaser4565"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 6.5;}else{faddPts = 4.5;}
                           }else if(TeaserPts == "btnTeaser57"){
                               if(values[0].sportsType == "PF" || values[0].sportsType == "CF"){faddPts = 7;}else{faddPts = 5;}
                           }else if(TeaserPts == "btnTeaser10"){
                               faddPts = 10;
                           }
                           var checkDL = "";
                           if(values[0].dLine == "PK"){checkDL = 0}else{checkDL = values[0].dLine}
                           var fconvertPts = parseFloat(checkDL) + faddPts
                               , frounded = Math.floor(Math.abs(fconvertPts))
                               , frest  = Math.abs(fconvertPts) - Math.floor(Math.abs(fconvertPts));
                           var f1 = new Fraction(1, frest);
                           var Ffra = "", fround = "";
                           if(f1.denominator == 1 && f1.numerator == 1){Ffra = ""} else {Ffra = f1.denominator + '/' + f1.numerator;}
                           if(frounded == 0 && f1.denominator == 1 && f1.numerator == 1){fround = 0}else if(frounded != 0){fround = frounded+ ' ';}
                           var ftotalPts = fround + Ffra;
                           if(fconvertPts >= 0){fafterPts = ftotalPts;}else if(fconvertPts < 0){fafterPts ="-"+ ftotalPts;}
                           firstlist +="<tr class='betSelect parlayCounter'>"+"<td style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ values[0].gameDate + "</td>"+"<td style='display: none'>"+ values[0].gradeNo +"</td>"+"<td  style='display: none'>"+ faddPts +"</td>"+"<td class='TPoint' value='"+faddPts+"'>"+ "Teaser "+faddPts+" pts" +"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ fafterPts +"<td class='TAmount'>"+ amount +"</td>"+"<td>" + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";
                           $.each(values.slice(1), function (index, val) {
                               var addPts = "", afterPts = "";
                               if(TeaserPts == "btnTeaser46"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6;}else{addPts = 4;}
                               }else if(TeaserPts == "btnTeaser4565"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6.5;}else{addPts = 4.5;}
                               }else if(TeaserPts == "btnTeaser57"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 7;}else{addPts = 5;}
                               }else if(TeaserPts == "btnTeaser10"){
                                   addPts = 10;
                               }
                               var checkDL = "";
                               if(val.dLine == "PK"){checkDL = 0}else{checkDL = val.dLine}
                               var convertPts = parseFloat(checkDL) + addPts
                                   , rounded = Math.floor(Math.abs(convertPts))
                                   , rest  = Math.abs(convertPts) - Math.floor(Math.abs(convertPts));
                               var f = new Fraction(1, rest);
                               var fra = "", round = "";
                               if(f.denominator == 1 && f.numerator == 1){fra = ""} else {fra = f.denominator + '/' + f.numerator;}
                               if(rounded == 0 && f.denominator == 1 && f.numerator == 1){round = 0}else if(rounded != 0){round = rounded+ ' ';}
                               var totalPts = round + fra;
                               if(convertPts >= 0){afterPts = totalPts;}else if(convertPts < 0){afterPts ="-"+ totalPts;}
                               Tlist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td  style='display: none'>"+ addPts +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ afterPts +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                           });
                           $.each(values2, function (index, val) {
                               var addPts = "", afterPts = "";
                               if(TeaserPts == "btnTeaser46"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6;}else{addPts = 4;}
                               }else if(TeaserPts == "btnTeaser4565"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 6.5;}else{addPts = 4.5;}
                               }else if(TeaserPts == "btnTeaser57"){
                                   if(val.sportsType == "PF" || val.sportsType == "CF"){addPts = 7;}else{addPts = 5;}
                               }else if(TeaserPts == "btnTeaser10"){
                                   addPts = 10;
                               }
                               var convertPts = "";
                               var splitradio = val.radio.split(" ");
                               if(splitradio[0] == "O"){convertPts = parseFloat(splitradio[1]) - addPts;}else{convertPts = parseFloat(splitradio[1]) + addPts;}
                               var rounded = Math.floor(Math.abs(convertPts));
                               var rest  = Math.abs(convertPts) - Math.floor(Math.abs(convertPts));
                               var f = new Fraction(1, rest);
                               var fra = "", round = "";
                               if(f.denominator == 1 && f.numerator == 1){fra = ""} else {fra = f.denominator + '/' + f.numerator;}
                               if(rounded == 0 && f.denominator == 1 && f.numerator == 1){round = 0}else if(rounded != 0){round = rounded+ ' ';}
                               var totalPts = round + fra;
                               if(convertPts >= 0){afterPts = totalPts;}else if(convertPts < 0){afterPts ="-"+ totalPts;}
                               Tlist +="<tr class='betSelect'>"+"<td  style='display: none'>"+ "TeaserNo"+TCounter +"</td>"+"<td style='display: none'>"+ val.gameDate + "</td>"+"<td style='display: none'>"+ val.gradeNo +"</td>"+"<td  style='display: none'>"+ addPts +"</td>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ splitradio[0] +" "+ afterPts +"</td>"+"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                           });
                           $("#tblConfirm").append('<tbody class="teaserGroup" id="teaser'+TCounter+'">' +firstlist + Tlist +'</tbody>');
                           $('#saveBet').show();
                           $('#amountID').val("");
                           $("#buyPoint").val(0);
                       } else {
                           $.alert({
                               title: 'Error!',
                               content: 'Please select 2 to 6 teams!',
                           });
                       }

                   }

               }else{
                   $.alert({
                       title: 'Error!',
                       content: 'Please enter amount!',
                   });
                   $('#amountID').focus();
               }
           }
       } else {
           $.alert({
               title: 'Error!',
               content: 'You must select bet first!',
           });
       }

   });



    Fraction = function(numerator, denominator)
    {
        /* double argument invocation */
        if (numerator && denominator) {
            if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
                this.numerator = numerator;
                this.denominator = denominator;
            } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
                // what are they?
                // hmm....
                // assume they are ints?
                this.numerator = parseInt(numerator);
                this.denominator = parseInt(denominator);
            }
            /* single-argument invocation */
        } else if (!denominator) {
            num = numerator; // swap variable names for legibility
            if (typeof(num) === 'number') {  // just a straight number init
                this.numerator = num;
                this.denominator = 1;
            } else if (typeof(num) === 'string') {
                var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                           // or a = '2/3' and b = undefined if we are just passed a single-part number
                [a, b] = num.split(' ');
                /* compound fraction e.g. 'A B/C' */
                //  if a is an integer ...
                if (a % 1 === 0 && b && b.match('/')) {
                    return (new Fraction(a)).add(new Fraction(b));
                } else if (a && !b) {
                    /* simple fraction e.g. 'A/B' */
                    if (typeof(a) === 'string' && a.match('/')) {
                        // it's not a whole number... it's actually a fraction without a whole part written
                        var f = a.split('/');
                        this.numerator = f[0]; this.denominator = f[1];
                        /* string floating point */
                    } else if (typeof(a) === 'string' && a.match('\.')) {
                        return new Fraction(parseFloat(a));
                        /* whole number e.g. 'A' */
                    } else { // just passed a whole number as a string
                        this.numerator = parseInt(a);
                        this.denominator = 1;
                    }
                } else {
                    return undefined; // could not parse
                }
            }
        }
        this.normalize();
    }


    Fraction.prototype.clone = function()
    {
        return new Fraction(this.numerator, this.denominator);
    }


    /* pretty-printer, converts fractions into whole numbers and fractions */
    Fraction.prototype.toString = function()
    {
        var wholepart = Math.floor(this.numerator / this.denominator);
        var numerator = this.numerator % this.denominator
        var denominator = this.denominator;
        var result = [];
        if (wholepart != 0)
            result.push(wholepart);
        if (numerator != 0)
            result.push(numerator + '/' + denominator);
        return result.length > 0 ? result.join(' ') : 0;
    }


    /* destructively rescale the fraction by some integral factor */
    Fraction.prototype.rescale = function(factor)
    {
        this.numerator *= factor;
        this.denominator *= factor;
        return this;
    }


    Fraction.prototype.add = function(b)
    {
        var a = this.clone();
        if (b instanceof Fraction) {
            b = b.clone();
        } else {
            b = new Fraction(b);
        }
        td = a.denominator;
        a.rescale(b.denominator);
        b.rescale(td);

        a.numerator += b.numerator;

        return a.normalize();
    }


    Fraction.prototype.subtract = function(b)
    {
        var a = this.clone();
        if (b instanceof Fraction) {
            b = b.clone();  // we scale our argument destructively, so clone
        } else {
            b = new Fraction(b);
        }
        td = a.denominator;
        a.rescale(b.denominator);
        b.rescale(td);

        a.numerator -= b.numerator;

        return a.normalize();
    }


    Fraction.prototype.multiply = function(b)
    {
        var a = this.clone();
        if (b instanceof Fraction)
        {
            a.numerator *= b.numerator;
            a.denominator *= b.denominator;
        } else if (typeof b === 'number') {
            a.numerator *= b;
        } else {
            return a.multiply(new Fraction(b));
        }
        return a.normalize();
    }

    Fraction.prototype.divide = function(b)
    {
        var a = this.clone();
        if (b instanceof Fraction)
        {
            a.numerator *= b.denominator;
            a.denominator *= b.numerator;
        } else if (typeof b === 'number') {
            a.denominator *= b;
        } else {
            return a.divide(new Fraction(b));
        }
        return a.normalize();
    }

    Fraction.prototype.equals = function(b)
    {
        if (!(b instanceof Fraction)) {
            b = new Fraction(b);
        }
        // fractions that are equal should have equal normalized forms
        var a = this.clone().normalize();
        var b = b.clone().normalize();
        return (a.numerator === b.numerator && a.denominator === b.denominator);
    }


    /* Utility functions */

    /* Destructively normalize the fraction to its smallest representation.
     * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
     * This is called after all math ops.
     */
    Fraction.prototype.normalize = (function()
    {

        var isFloat = function(n)
        {
            return (typeof(n) === 'number' &&
                ((n > 0 && n % 1 > 0 && n % 1 < 1) ||
                (n < 0 && n % -1 < 0 && n % -1 > -1))
            );
        }

        var roundToPlaces = function(n, places)
        {
            if (!places) {
                return Math.round(n);
            } else {
                var scalar = Math.pow(10, places);
                return Math.round(n*scalar)/scalar;
            }
        }

        return (function() {

            // XXX hackish.  Is there a better way to address this issue?
            //
            /* first check if we have decimals, and if we do eliminate them
             * multiply by the 10 ^ number of decimal places in the number
             * round the number to nine decimal places
             * to avoid js floating point funnies
             */
            if (isFloat(this.denominator)) {
                var rounded = roundToPlaces(this.denominator, 9);
                var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
                this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
                //this.numerator *= scaleup;
                this.numerator *= scaleup;
            }
            if (isFloat(this.numerator)) {
                var rounded = roundToPlaces(this.numerator, 9);
                var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
                this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
                //this.numerator *= scaleup;
                this.denominator *= scaleup;
            }
            var gcf = Fraction.gcf(this.numerator, this.denominator);
            this.numerator /= gcf;
            this.denominator /= gcf;
            return this;
        });

    })();


    /* Takes two numbers and returns their greatest common factor.
     */
    Fraction.gcf = function(a, b)
    {

        var common_factors = [];
        var fa = Fraction.primeFactors(a);
        var fb = Fraction.primeFactors(b);
        // for each factor in fa
        // if it's also in fb
        // put it into the common factors
        fa.forEach(function (factor)
        {
            var i = fb.indexOf(factor);
            if (i >= 0) {
                common_factors.push(factor);
                fb.splice(i,1); // remove from fb
            }
        });

        if (common_factors.length === 0)
            return 1;

        var gcf = (function() {
            var r = common_factors[0];
            var i;
            for (i=1;i<common_factors.length;i++)
            {
                r = r * common_factors[i];
            }
            return r;
        })();

        return gcf;

    };


// Adapted from:
// http://www.btinternet.com/~se16/js/factor.htm
    Fraction.primeFactors = function(n)
    {

        var num = n;
        var factors = [];
        var _factor = 2;  // first potential prime factor

        while (_factor * _factor <= num)  // should we keep looking for factors?
        {
            if (num % _factor === 0)  // this is a factor
            {
                factors.push(_factor);  // so keep it
                num = num/_factor;  // and divide our search point by it
            }
            else
            {
                _factor++;  // and increment
            }
        }

        if (num != 1)                    // If there is anything left at the end...
        {                                // ...this must be the last prime factor
            factors.push(num);           //    so it too should be recorded
        }

        return factors;                  // Return the prime factors
    }
});