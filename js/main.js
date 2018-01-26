// modifications of background / containers / width (init and resize)


$(window).on('load', function () {
    initWindow();
    $(window).on('resize', function (event) {
        initWindow();

        var width = event.target.innerWidth;
        var height = event.target.innerHeight;
        var baseWidth = 1920;
        var baseHeight = 1080;

        $('.bg').css({
            "left": -((baseWidth - width) / 2) + 'px',
            "top": -((baseHeight - height) / 2) + 'px'
        });

        baseWidth = window.innerWidth;
        width = parseInt($('.add-album-popup').css('width'));
        $('.add-album-popup').css({'left': ((baseWidth - width) / 2) + 'px'})
    });
    $(window).trigger('resize');
});

$(document).ready(function () {
    $('.modal-close').on('click', function () {
        $(this).parents('[data-modal]').hide();
        $('.bg-overlay').hide();
    });

});

function isEmpty(val) {
    return val === "";
}

function maxLength(val, max) {
    return val.length > max;
}


function initWindow() {
    $('body').css({
        width: $(window).width(),
        height: $(window).height()
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}