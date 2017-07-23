/**
 * Created by Samuel on 7/24/2017.
 */
$('document').ready(function(){

    var BASE_URL = $('#baseurl').val();

    $( "#custName" ).autocomplete({
        source: function(request, response) {
            $.ajax({
                'url':  BASE_URL + "/autocomplete",
                dataType: "json",
                data: {
                    term : request.term
                },
                success: function(data) {
                    response(data);

                }
            });
        },
        minLength: 2,
    });

});
