$(function () {

    var modalTarget = $('.js-show-modal-target');
    var modalCover = $('.js-show-modal-cover');

    // todo作成フォーム用
    $('.create-btn').on('click', function () {
        var modalWidth = $('.js-show-modal-target').width();
        var windowWidth = $(window).width();
        var modalPositipn = (windowWidth / 2 - modalWidth / 2);
        modalTarget.attr('style', 'margin-left:' + modalPositipn + 'px');
        modalTarget.fadeIn(500);
        modalCover.fadeIn(500);
    });

    $('.js-hide-modal-btn').on('click', function () {
        modalTarget.fadeOut(500);
        modalCover.fadeOut(500);
    });
});