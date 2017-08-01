$('document').ready(function(){
    var BASE_URL = $('#baseurl').val();
    loadExpensesDataTable();
    var table = $("#tblTeam").DataTable();

    $('input[type = search]').unbind().on('keyup', function() {
        var searchTerm = this.value.toLowerCase();
        $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            //search only in column 1 and 2
            if (~data[0].toLowerCase().indexOf(searchTerm)) return true;
            if (~data[1].toLowerCase().indexOf(searchTerm)) return true;
            if (~data[4].toLowerCase().indexOf(searchTerm)) return true;
            // if (~data[4].toLowerCase().indexOf(searchTerm)) return true;
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
        // $('.noDisplay, .NL').attr("disabled", true);
        $('#TGAMENO').val($(this).parent().data('id'));
        $('#SPORT').val($(this).parent().find('td:last').html());
        // alert($(this).parent().find('td:last').html());
        var TGAMENO = $('#TGAMENO').val();
        var SPORT = $('#SPORT').val();
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
                    if(data['TEAM_ODDS'] == -110){
                        dTEAMODDS = ""
                    } else {
                        dTEAMODDS = ' , ' + data['TEAM_ODDS'];
                    }
                    if(data['TOTAL'] > 900){
                        dTOTAL = "NL";
                        noDisplay = "noDisplay"
                    } else {
                        dTOTAL = data['TOTAL'];
                    }
                    if(data['LINE'] == 0){
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
                    $('#divSched .sched-column-content').append(
                        '<div class="thumbnails" id="'+ data['TGAMENO'] + data['SPORT'] +'">' +
                        '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                        '<table class="table table-bordered ">' +
                        // '<thead>' +
                        // '<tr>' +
                        // '<th>' + 'Team' + '</th>' +
                        // '<th>' + 'Line - Odds' + '</th>' +
                        // // '<th>' + 'Total' + '</th>' +
                        // '<th>' + 'Over Total Odds' + '</th>' +
                        // '<th>' + 'Under Total Odds' + '</th>' +
                        // '</tr>' +
                        // '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td value="'+ data['SPORT'] + '">' + data['TEAM'] + '</td>' +
                        '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['TEAM'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'" type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                        // '<td>' + '<label class="checkbox-inline">' + '<input type="checkbox" value="">' + data['TOTAL'] + '</label></p>' + '</td>' +
                        '<td>' + '<label class="radio-inline">' + '<input class="o-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + '</label>' + '</td>' +
                        '<td>' + '<label class="radio-inline">' + '<input class="u-odds '+noDisplay+'" name="total-odds-' + data['TGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL + '</label>' + '</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</div>'
                    )
                    $('.noDisplay, .NL').attr("disabled", true);
                    hideShow();
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
                    if(data['VS_ODDS'] == -110){
                        dTEAMODDS = ""
                    } else {
                        dTEAMODDS = ' , ' + data['VS_ODDS'];
                    }
                    if(data['TOTAL'] > 900){
                        dTOTAL = "NL";
                        noDisplay = "noDisplay"
                    } else {
                        dTOTAL = data['TOTAL'];
                    }
                    if(data['VS_LINE'] == 0){
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
                        $('#divSched .sched-column-content').append(
                            '<div class="thumbnails" id="'+ data['TGAMENO'] + data['SPORT'] +'">' +
                            '<button type="button" class="remove-thumbnail">' + '&times;' + '</button>' +
                            '<table class="table table-bordered ">' +
                            // '<thead>' +
                            // '<tr>' +
                            // '<th>' + 'Team' + '</th>' +
                            // '<th>' + 'Line - Odds' + '</th>' +
                            // // '<th>' + 'Total' + '</th>' +
                            // '<th>' + 'Over Total Odds' + '</th>' +
                            // '<th>' + 'Under Total Odds' + '</th>' +
                            // '</tr>' +
                            // '</thead>' +
                            '<tbody>' +
                            '<tr>' +
                            '<td value="'+ data['SPORT'] + '">' + data['OPPONENT'] + '</td>' +
                            // '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input  class="'+dLINE+'" type="checkbox" value="' + data['OPPONENT'] + ' , '+ dLINE + dTEAMODDS + '">'+ dLINE + dTEAMODDS + '</label>' + '</td>' +
                            '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['OPPONENT'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'" type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
                            // '<td>' + '<label class="checkbox-inline">' + '<input type="checkbox" value="">' + data['TOTAL'] + '</label></p>' + '</td>' +
                            '<td>' + '<label class="radio-inline">' + '<input class="o-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "O " + dTOTAL + '">' + "O " + dTOTAL + '</label>' + '</td>' +
                            '<td>' + '<label class="radio-inline">' + '<input class="u-odds '+noDisplay+'" name="total-odds-' + data['VSGAMENO'] + '" type="radio" value="' + "U " + dTOTAL + '">' + "U " + dTOTAL+ '</label>' + '</td>' +
                            '</tr>' +
                            '</tbody>' +
                            '</table>' +
                            '</div>'
                        )
                    $('.noDisplay, .NL').attr("disabled", true);
                    hideShow();
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
    })
    $('body').delegate('.remove-bet', 'click', function () {
        // var betData = $("#tblConfirm tbody tr.parlayTR:first td:last").html();
        var thisDiv = $(this).parent().parent();
        thisDiv.remove();
        hideShow();
        // $("#tblConfirm tbody tr.parlayTR:first td:last").removeClass('hidenAmt').html(betData);
        // $("#tblConfirm tbody tr.parlayTR:first td:first").removeClass('hidenbetType').html('Parlay');
        // $('table#tblConfirm > tbody > tr.parlayTR').not(':first').find('.hidenAmt').html('<button type="button" class="remove-bet">' + '&times;' + '</button>');
    });

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
                             // radio       :  $(row).find('input[type=radio]:checked').val() || " "
                         });
                     });
                     console.log(values);
                     var firstlist = "";
                     var list = "";
                     if(betType == "Parlay"){
                         if($("input:checked").length > 1 && $("input:checked").length < 7){
                             firstlist +="<tr class='betSelect'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' + "</td>"+"</tr>";
                             $.each(values.slice(1), function (index, val) {
                                 list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                             });
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
                             // selectedTeam : $(this).val() || " ",
                             sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                             sportsType  : $(row).find("input[name=sportsType]").val(),
                             radio       :  $(row).find('input[type=radio]:checked').val() || " "
                         });
                     });
                     console.log(values);
                     var firstlist = "";
                     var list = "";
                     if(betType == "Parlay"){
                         if($("input:checked").length > 1 && $("input:checked").length < 7){
                             firstlist +="<tr class='betSelect'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].radio +"<td>"+ amount +'<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                             $.each(values.slice(1), function (index, val) {
                                 list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                             });
                             $('#saveBet').show();
                         } else {
                             $.alert({
                                 title: 'Error!',
                                 content: 'Please select 2 to 6 teams!',
                             });
                         }
                     } else {
                         $.each(values, function (index, val) {
                             // list +="<tr class='betSelect'>"+"<td>"+ betType + ' , ' + val.sportsType +  ' , ' + val.radio +"</td>"+"<td>"+ amount +"</td>"+"</tr>";
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
                             // radio       :  $(row).find('input[type=radio]:checked').val() || " "
                         });
                     });
                     $("input:radio:checked").each(function(){
                         row = $(this).closest("tr");
                         values2.push({
                             // selectedTeam : $(this).val() || " ",
                             sportsType  : $(row).find("input[name=sportsType]").val(),
                             sportsTeam  : $(row).find("input[name=sportsTeam]").val(),
                             radio       :  $(row).find('input[type=radio]:checked').val() || " "
                         });
                     });
                     console.log(values);
                     console.log(values2);
                     var firstlist = "";
                     var list = "";
                     if(betType == "Parlay"){
                         if($("input:checked").length > 1 && $("input:checked").length < 7){
                             firstlist +="<tr class='betSelect'>"+"<td>"+ betType+"</td>"+"<td>"+ values[0].sportsType +"</td>"+"<td>"+ values[0].sportsTeam +"</td>"+"<td>"+ values[0].dLine + values[0].dOdds  +"<td>"+ amount +'<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                             $.each(values, function (index, val) {
                                 list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                             });
                             $.each(values2.slice(1), function (index, val) {
                                 list +="<tr class='betSelect parlayTR'>"+"<td class='hidenbetType'>"+ "" +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+"</td>"+"<td class='hidenAmt'>"+ "" +"</td>"+"</tr>";
                             });
                             $('#saveBet').show();
                         } else {
                             $.alert({
                                 title: 'Error!',
                                 content: 'Please select 2 to 6 teams!',
                             });
                         }
                     } else {
                         $.each(values, function (index, val) {
                             // list +="<tr class='betSelect'>"+"<td>"+ betType + ' , ' + val.sportsType +  ' , ' + val.selectedTeam +"</td>"+"<td>"+ amount +"</td>"+"</tr>";
                             list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.dLine + val.dOdds +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                         });
                         $.each(values2, function (index, val) {
                             // list +="<tr class='betSelect'>"+"<td>"+ betType + ' , ' + val.sportsType +  ' , ' + val.radio +"</td>"+"<td>"+ amount +"</td>"+"</tr>";
                             list +="<tr class='betSelect'>"+"<td>"+ betType +"</td>"+"<td>"+ val.sportsType +"</td>"+"<td>"+ val.sportsTeam +"</td>"+"<td>"+ val.radio +"<td>"+ amount + '<button type="button" class="remove-bet">' + '&times;' + '</button>' +"</td>"+"</tr>";
                         });
                         $('#saveBet').show();
                     }

                 }
                 // $('#saveBet').show();
                 $("#tblConfirm tbody").append(firstlist);
                 $("#tblConfirm tbody").append(list);
                 // $("#tblConfirm tbody tr.parlayTR:first td:last").removeClass('hidenAmt');
                 // $("#tblConfirm tbody tr.parlayTR:first td:first").removeClass('hidenAmt');
                 // $('table#tblConfirm > tbody > tr.parlayTR').not(':first').find('.hidenAmt').html('<button type="button" class="remove-bet">' + '&times;' + '</button>');
                 // $('table#tblConfirm > tbody > tr.parlayTR').not(':first').find('.hidenbetType').html('');
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

    $('#btnCancelBet').on('click', function(){
        $('#tblConfirm tbody').html('');
        $('#saveBet').hide();
        hideShow();
    });

    $('#saveBet').hide();
    hideShow();
    function hideShow(){
        if ($('#divSched').find('.thumbnails').length > 0){
            $('.column-footer').show();
        } else {
            $('.column-footer').hide();
            $('#amountID').val("");
        }
    }
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
