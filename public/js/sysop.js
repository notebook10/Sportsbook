$('document').ready(function(){
    var BASE_URL = $('#baseurl').val();
    $('#btnGrade').on('click', function(){
       var beforeLoad = new Date();
        $.ajax({
            'url': BASE_URL + '/getTeamFinish',
            type: 'POST',
            data: {
                _token: $('[name="_token"]').val(),

            },
            success : function(response){
                if(response == 0){
                    var afterLoad = new Date();
                    var seconds = (afterLoad - beforeLoad) / 1000;
                    $.alert({
                        title: 'Success!',
                        content: 'Successfully grading!' +
                        '<br>' + seconds +' sec.',
                    });
                }
            },
            error : function(xhr,status,error){
                alert(error,"Please try again","error");
            }
        });
    });
});