$('#sub-reg').click(function (e){
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: '/register_user',
        data: { username: username, password: password },
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                window.location.href = "/game";
            }
            else if(response.msg === "username_exist") {
                $('#error-msg').html('');
                $('#error-msg').append('<span>Username already exist!</span>');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
    });
});