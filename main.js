$(function () {

    var modalTarget = $('.js-show-modal-target');
    var modalCover = $('.js-show-modal-cover');
    var todoListNode = $('.todos');

    /*-------------- todo作成 操作 -------------*/
    // todo作成フォーム表示
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

    $('form').submit(function (e) {
            e.preventDefault();
            var titleVal = $('.js-val-title').val();
            $('.js-val-title').val('');
            var contentVal = $('.js-val-content').val();
            $('.js-val-content').val('');
            $('.error-msg').text('');

            if (titleVal && contentVal) {
                todoItem =
                    '<li class="todo js-todo-unstarted" data-title="' + titleVal + '" data-content="' + contentVal + '">\n' +
                    '<div class="left">\n' +
                    '<i class="check-icon far fa-lg fa-square"></i>\n' +
                    '</div>\n' +
                    '<div class="right">\n' +
                    '<p class="todo-title">' + titleVal + '</p>\n' +
                    '<p class="todo-content">' + contentVal + '</p>\n' +
                    '<div class="todo-icons">\n' +
                    '<p class="edit"><i class="icon far fa-lg fa-edit"></i></p>\n' +
                    '<p class="delete"><i class="icon far fa-lg fa-trash-alt"></i></p>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '</li>';
                todoListNode.prepend(todoItem);

                modalTarget.fadeOut(500);
                modalCover.fadeOut(500);
            } else {
                $('.error-msg').text('Both title and content are required! ');
                return false;
            }
        }
    );


    /*-------------- todoリスト 操作 -------------*/

    // todoの完了・未完了の切り替え
    $(document).on('click', '.check-icon', function () {
        var todoNode = $(this).closest('.todo');

        if ($(this).hasClass('fa-square')) {
            $(this).removeClass('fa-square');
            $(this).addClass('fa-check-square');
            todoNode.removeClass('js-todo-unstarted');
            todoNode.removeClass('js-todo-progress');
            todoNode.addClass('js-todo-done');
        } else if ($(this).hasClass('fa-check-square')) {
            $(this).removeClass('fa-check-square');
            $(this).addClass('fa-square');
            todoNode.removeClass('js-todo-done');
            todoNode.addClass('js-todo-unstarted');
        }
    });

    // 削除ボタンをクリックしたらtodoが削除される機能
    $(document).on('click', '.delete', function () {
        var todoNode = $(this).closest('.todo');

        var result = confirm('本当に削除しますか');

        if (result) {
            todoNode.attr('style', 'display: none');
        } else {
            return $();
        }
    });
});