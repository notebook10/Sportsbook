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
                        '<tbody>' +
                        '<tr>' +
                        '<td value="'+ data['SPORT'] + '">' + data['TEAM'] + '</td>' +
                        '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['TEAM'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'" type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
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
                            '<tbody>' +
                            '<tr>' +
                            '<td value="'+ data['SPORT'] + '">' + data['OPPONENT'] + '</td>' +
                            '<td>' + '<label class="checkbox-inline">' + '<input type="hidden" name="sportsType" value="'+ data['SPORT'] +'"> ' + '<input type="hidden" name="sportsTeam" value="'+ data['OPPONENT'] +'"> ' + '<input type="hidden" name="dLine" value="'+dLINE+'"> ' + '<input class="'+dLINE+'" type="checkbox" value="' + dTEAMODDS + '">' + dLINE + dTEAMODDS + '</label>' + '</td>' +
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