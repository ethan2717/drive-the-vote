// toggle 
$(document).ready(function() {
    $('.search-toggle').click(function() {
        $('.search-wrapper').toggleClass('show');
    });

    $('.modal-toggle').click(function() {
        $('.modalBox').toggleClass('show');
    })

    $('.modalBox').click(function() {
        $(this).removeClass('show');
    });

    $('.spinner').click(function() {
        $(".theme-selector").toggleClass('show');
    });
    $('.light').click(function() {
        $('body').addClass('light-theme');
        $('body').removeClass('dark-theme');
    });
    $('.dark').click(function() {
        $('body').toggleClass('dark-theme');
        $('body').removeClass('light-theme');
    });
});

// smooth scroll
$(document).ready(function() {
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function() {
                window.location.hash = hash;
            });
        }
    });
});

function email(){
    fetch("/email?full-name=" + document.getElementById("full-name").value + "&email-address=" + document.getElementById("email-address").value,
    {
        method: "POST",
    });
}

function chat() {
    fetch("/chat?input=" + document.getElementById("chat").value + "?key=" + document.getElementById("chat"),
    {
        method: "POST",
    }).then((response) => response.text())
    .then((text) => {
      document.getElementById("chat-responce").innerHTML = text;
    });
}