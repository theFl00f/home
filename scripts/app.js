const $form = $('form');
const $name = $('#name');
const $email = $('#email');
const $message = $('#message');
const $navButton = $('#nav');
const $navList = $('nav ul');
const $header = $('header');
const $navListItem = $('nav li')

const homeApp = {};

$form.on('submit', (e) => {
    e.preventDefault();
    if ($name.val() === '' || $email.val() === '' || $message.val() === '') {
        swal({
            icon: 'error',
            title: 'Sorry!',
            text: 'Please leave your name, email and message so I can get back to you!'
        })
    } else {
        homeApp.postEmail();
        homeApp.clearFields();
        swal({
            icon: 'success',
            buttons: false,
            timer: 1050
        })
    }
})

$navButton.on('click', (e) => {
    e.preventDefault();
    $navList.toggleClass('expand');
    $header.toggleClass('expand');
    $navListItem.toggleClass('expand');
    homeApp.showMenu();
})

$(window).on('resize', function() {
    homeApp.checkSize();
})



homeApp.clearFields = () => {
    $name.val('');
    $email.val('');
    $message.val('');
}

homeApp.postEmail = () => {
    $.ajax({
        url: 'https://formspree.io/xjvevydo',
        method: 'POST',
        data: {
            email: $email.val(),
            name: $name.val(),
            message: $message.val(),
        },
        dataType: 'json'
    })
}

homeApp.showMenu = () => {
    $navListItem.each(function(index) {
        $(this).stop()
        $(this).delay(200*index).fadeToggle(200);
    })
}


homeApp.checkSize = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    if(mediaQuery.matches) {
        $navListItem.css('display', 'none')
    } else {
        $navListItem.css('display', '')
    }
}

homeApp.init = () => {
    homeApp.clearFields();
    homeApp.checkSize();
}

homeApp.init();

