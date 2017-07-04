$('document').ready(function(){
    var BASE_URL = $('#baseurl').val();
    loadExpensesDataTable();
    var table = $("#tblTeam").DataTable();

    $('input[type = search]').on( 'keyup', function () {
        table.search( '^' + this.value, true, true).draw();
    });

    table.column(3).data().unique().sort().each( function ( d, j ) {
        $("#radio-sports").append( '<label class="radio-inline"><input type="radio" name="optradio" value="'+d+'">'+d+'</label>' )

    } );
    $('#radio-sports input').change(function () {
        table.columns(3).search(this.value).draw();
        // alert($("#radio-sports input").val());
        $('input[type = search]').val('').focus();
    });



    $('body').delegate('.btnTeam', 'click', function () {
        $('#TEAM').val($(this).data('id'));
        $('#teamID').html($(this).data('id'));
        var TEAM = $('#TEAM').val();
        var appendSched = [
            "<div class='form-group'><p class='TEAMN'></p><p class='LINE'></p><p class='TEAM_ODDS'></p><p class='OVER_ODDS'></p> <br>" +
            " <p class='OPPONENT'></p><p class='VS_LINE'></p><p class='VS_ODDS'></p><p class='UNDER_ODDS'></p></div>"
        ]
        $('#frmSched .form-body').append(appendSched);
        $.ajax({
            'url' : BASE_URL + '/sportsbook/getSched',
            type : 'POST',
            data : {
                _token : $('[name="_token"]').val(),
                TEAM : TEAM,
            },
            success : function(data) {
                $('#TEAMN').val(data['TEAM']);
                $('.TEAMN').html(data['TEAM']);
                $('#OPPONENT').val(data['OPPONENT']);
                $('.OPPONENT').html(data['OPPONENT']);
                $('#TGAMENO').val(data['TGAMENO']);
                $('.TGAMENO').html(data['TGAMENO']);
                $('#GAME_TIME').val(data['GAME_TIME']);
                $('.GAME_TIME').html(data['GAME_TIME']);
                $('#LINE').val(data['LINE']);
                $('.LINE').html(data['LINE']);
                $('#VS_LINE').val(data['VS_LINE']);
                $('.VS_LINE').html(data['VS_LINE']);
                $('#OVER_ODDS').val(data['OVER_ODDS']);
                $('.OVER_ODDS').html(data['OVER_ODDS']);
                $('#UNDER_ODDS').val(data['UNDER_ODDS']);
                $('.UNDER_ODDS').html(data['UNDER_ODDS']);
                $('#TEAM_ODDS').val(data['TEAM_ODDS']);
                $('.TEAM_ODDS').html(data['TEAM_ODDS']);
                $('#VS_ODDS').val(data['VS_ODDS']);
                $('.VS_ODDS').html(data['VS_ODDS']);
            },
            error : function(xhr,asd,error){
                console.log(error);
            }
        });
    });
    // var dDataTable = $('#tblTeam').DataTable();
    // $('#selectSports').change( function () {
    //     dDataTable.fnFilter( $('#selectSports').val(),2);
    // });
});

function loadExpensesDataTable(){
    $("#tblTeam").DataTable({
        "pagingType": "simple",
        "iDisplayLength": 13,
    });
}
