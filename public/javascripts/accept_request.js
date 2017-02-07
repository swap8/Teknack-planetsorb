
GameState.accept_request = {

    preload: function () {
        game.load.image('storybt', './images/storybt.png');
    },

    create: function () {

        var spaceback = game.add.sprite(0, 0, 'spaceback');
        spaceback.scale.setTo(0.92, 0.75);

        myGroup = game.add.group();
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x6A5E76, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();

        newbutton = game.add.button(1300, 500, 'storybt', accept_request, this, 2, 1, 0);
        newbutton.scale.setTo(0.3, 0.3);
        myGroup.add(newbutton);

        style = { fontSize: '20px', fill: '#ffffff' };

        mytext = game.add.text(480, 22, "Friends Request Panel : To Watch Friends Game Activity", style);
        //myGroup.add(mytext);


        $.ajax({
            type: 'POST',
            url: '/friend_request',
            dataType: 'json',
            success: function (response) {
                if (response.msg === "success") {
                    // window.location.href = "/game";
                }
                else {
                    $('#error-msg').html('');
                    $('#error-msg').append('<span>Login Failed!</span>');
                }
                console.log(response);

                style = { fontSize: '20px', fill: '#ffffff' }
                style1 = { fontSize: '20px', fill: '#000000' }

                var shift_height = 40;
                mytext = game.add.text(100, 120, "Friends Request Pending :", style);
                myGroup.add(mytext);


                for (var i = 0; i < response.data.length; i++) {
                    var border = game.add.sprite(50, 120 + shift_height, 'border');
                    border.scale.setTo(0.8, 0.15);
                    myGroup.add(border);
                    //border.anchor.setTo(0.5,0.5);
                    mytext = game.add.text(120, 135 + shift_height, response.data[i], style1);
                    myGroup.add(mytext);
                    shift_height += 60;
                }

            }
        });


    },

    update: function () {

    }

};


function accept_request() {
    swal({
        title: "Accept a Friend!",
        text: "Enter the name of your Friend :",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-bottom",
        inputPlaceholder: "eg. bill"
    },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            var username = inputValue;

            $.ajax({
                type: 'POST',
                url: '/accept_friend',
                data: { username: username },
                dataType: 'json',
                success: function (response) {
                    if (response.msg === "success") {
                        //console.log("hiii");
                        swal("Great!", "A Friend has been added succesfully", "success");
                        location.reload(forceGet);

                    }
                    else {
                        swal("Sorry!", "No username exist");
                        $('#error-msg').html('');
                        $('#error-msg').append('<span>Login Failed!</span>');
                    }
                    if (response.msg === "yourself") {
                        swal("Sorry!", "Please don't send Friend Request to Yourself");
                    }
                }
            });

        });
}
