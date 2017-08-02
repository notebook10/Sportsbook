$('document').ready(function(){

    $('.btnBet').on('click', function(){
        var betType = $(this).val();
        var amount = $('#amountID').val();
        if ($('.thumbnails input:checked').length > 0){
            if($('#amountID').val() !== ""){
                var values = [];
                var values2 = [];
                if($('.thumbnails input:checkbox:checked').length > 0 && $('.thumbnails input:radio:checked').length == 0){
                    $("input:checkbox:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            dOdds : $(this).val() || " ",
                            dLine  : $(row).find("input[name=dLine]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                        });
                    });
                    console.log(values);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    if(betType == "Parlay"){
                        var PCounter = $('.betSelect').val('parlayCounter').length;
                        if($("input:checked").length > 1 && $("input:checked").length < 7){
                            firstlist +="<tr class='betSelect' value='parlayCounter'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds +"<td>"+ amount + '<button type="button" class="remove-parlay">' + '&times;' + '</button>' + "</td>"+"</tr>";
                            $.each(values.slice(1), function (index, val) {
                                Plist +="<tr class='betSelect'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                            });
                            $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                            $('#saveBet').show();
                        } else {
                            $.alert({
                                title: 'Error!',
                                content: 'Please select 2 to 6 teams!',
                            });
                        }

                    } else {
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td>"+ amount +'<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    }

                } else if($('.thumbnails input:radio:checked').length > 0 && $('.thumbnails input:checkbox:checked').length == 0 ) {
                    $("input:radio:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            radio       :  $(row).find('input[type=radio]:checked').val() || " "
                        });
                    });
                    console.log(values);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    if(betType == "Parlay"){
                        var PCounter = $('.betSelect').val('parlayCounter').length;
                        if($("input:checked").length > 1 && $("input:checked").length < 7){
                            firstlist +="<tr class='betSelect' value='parlayCounter'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].radio +"<td>"+ amount +'<button type="button" class="remove-parlay">' + '&times;' + '</button>' +"</td>"+"</tr>";
                            $.each(values.slice(1), function (index, val) {
                                Plist +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                            });
                            $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                            $('#saveBet').show();
                        } else {
                            $.alert({
                                title: 'Error!',
                                content: 'Please select 2 to 6 teams!',
                            });
                        }
                    } else {
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    }

                } else if ($('.thumbnails input:radio:checked').length > 0 && $('.thumbnails input:checkbox:checked').length > 0 ) {
                    $("input:checkbox:checked").each(function(){
                        row = $(this).closest("tr");
                        values.push({
                            dOdds : $(this).val() || " ",
                            dLine  : $(row).find("input[name=dLine]").val(),
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                        });
                    });
                    $("input:radio:checked").each(function(){
                        row = $(this).closest("tr");
                        values2.push({
                            sportsType  : $(row).find("input[name=sportsType]").val(),
                            sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                            radio       :  $(row).find('input[type=radio]:checked').val() || " "
                        });
                    });
                    console.log(values);
                    console.log(values2);
                    var firstlist = "";
                    var list = "";
                    var Plist = "";
                    if(betType == "Parlay"){
                        var PCounter = $('.betSelect').val('parlayCounter').length;
                        if($("input:checked").length > 1 && $("input:checked").length < 7){
                            firstlist +="<tr class='betSelect' value='parlayCounter'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds  +"<td>"+ amount +'<button type="button" class="remove-parlay">' + '&times;' + '</button>' +"</td>"+"</tr>";
                            $.each(values, function (index, val) {
                                Plist +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                            });
                            $.each(values2.slice(1), function (index, val) {
                                Plist +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                            });
                            $("#tblConfirm").append('<tbody class="parlayGroup" id="parlay'+PCounter+'">' +firstlist + Plist +'</tbody>');
                            $('#saveBet').show();
                        } else {
                            $.alert({
                                title: 'Error!',
                                content: 'Please select 2 to 6 teams!',
                            });
                        }
                    } else {
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $.each(values2, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    }

                }
                $("#tblConfirm tbody.main").append(list);
                $('input:radio, input:checkbox').prop('checked', false);
                $('#amountID').val("");
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

    $('#btnSaveBet').on('click', function(){

        var array = [];
        var headers = [];
        $('#tblConfirm th').each(function(index, item) {
            headers[index] = $(item).html();
        });
        $('#tblConfirm tr').has('td').each(function() {
            var arrayItem = {};
            $('td', $(this)).each(function(index, item) {
                arrayItem[headers[index]] = $(item).html();
            });
            array.push(arrayItem);
        });

        console.log(array);
        var od = JSON.stringify(array);
        var obj = JSON.parse(od);
        $.each(obj, function (index, value) {
            // var countParlay = obj[index].Type(Parlay).length;
            // alert(countParlay);
            // Betslist +="<tr>"+"<td>"+ obj[index].bet_type  +"</td>"+"<td>"+ obj[index].team +"</td>"+"<td>"+ obj[index].line +"</td>"+"<td>"+ obj[index].odds +"</td>"+"<td>"+ obj[index].result +"</td>"+"<td>"+ obj[index].score +"</td>"+"<td>"+ timeString +"</td>"+"<td>"+ obj[index].bet_id +"</td>"+"</tr>";
        });

    });
    $('body').delegate('.remove-bet', 'click', function () {
        var thisDiv = $(this).parent().parent();
        thisDiv.remove();
        hideShowbet();
    });

    $('body').delegate('.remove-parlay', 'click', function () {
        var thisDivP = $(this).parents('tbody');
        thisDivP.remove();
        hideShowbet();
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