$('document').ready(function(){

    $('.btnBet').on('click', function(){
        var betType = $(this).val();
        var amount = $('#amountID').val();
        if ($('.thumbnails input:checked').length > 0){
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
                // for Parlay Button click
                if(betType == "Parlay"){
                    if($('#tblConfirm tbody tr').hasClass('parlayTR') == true){
                        if($('#amountID').val() == ""){
                            $.each(values, function (index, val) {
                                list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                            });
                        } else {
                            if($("input:checked").length > 1 && $("input:checked").length < 7){
                                $.each(values, function (index, val) {
                                    list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                                });
                                $('#saveBet').show();
                            } else {
                                $.alert({
                                    title: 'Error!',
                                    content: 'Please select 2 to 6 teams!',
                                });
                            }
                        }

                    } else {
                        if($('#amountID').val() !== ""){
                            if($("input:checked").length > 1 && $("input:checked").length < 7){
                                $.each(values, function (index, val) {
                                    list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                                });
                                $('#saveBet').show();
                            } else {
                                $.alert({
                                    title: 'Error!',
                                    content: 'Please select 2 to 6 teams!',
                                });
                            }
                        } else {
                            $.alert({
                                title: 'Error!',
                                content: 'Please enter amount!',
                            });
                        }
                    }
                } else {
                    if($('#amountID').val() !== ""){
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td>"+ amount +'<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'You must select bet first!',
                        });
                    }
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
                // for Parlay Button click
                if(betType == "Parlay"){
                    if($("input:checked").length > 1 && $("input:checked").length < 7){
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td class='hidenAmt'>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'Please select 2 to 6 teams!',
                        });
                    }
                } else {
                    if($('#amountID').val() !== ""){
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'You must select bet first!',
                        });
                    }

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
                // for Parlay Button click
                if(betType == "Parlay"){
                    if($("input:checked").length > 1 && $("input:checked").length < 7){
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $.each(values2, function (index, val) {
                            list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'Please select 2 to 6 teams!',
                        });
                    }
                } else {
                    if($('#amountID').val() !== ""){
                        $.each(values, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $.each(values2, function (index, val) {
                            list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                        });
                        $('#saveBet').show();
                    } else {
                        $.alert({
                            title: 'Error!',
                            content: 'You must select bet first!',
                        });
                    }
                }
            }
            $("#tblConfirm tbody").append(list);
            $("#tblConfirm tbody tr.parlayTR:first td:last").removeClass('hidenAmt');
            $("#tblConfirm tbody tr.parlayTR:first td:first").removeClass('hidenAmt');
            $('table#tblConfirm > tbody > tr.parlayTR').not(':first').find('.hidenAmt').html('<button type="button" class="remove-bet">' + '&times;' + '</button>');
            $('table#tblConfirm > tbody > tr.parlayTR').not(':first').find('.hidenbetType').html('');
            $('input:radio, input:checkbox').prop('checked', false);
            $('#amountID').val("");
        } else {
            $.alert({
                title: 'Error!',
                content: 'You must select bet first!',
            });
            $('#amountID').focus();
        }
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