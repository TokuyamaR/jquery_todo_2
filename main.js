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
                    '<p class="todo-title js-title_text">' + titleVal + '</p>\n' +
                    '<p class="todo-content js-content_text">' + contentVal + '</p>\n' +
                    '<input type="text" placeholder="Title" class="edit-title js-title_text-edit" value="' + titleVal + '">' +
                    '<textarea class="edit-content js-content_text-edit">' + contentVal + '</textarea>' +
                    '<div class="todo-icons">\n' +
                    '<p class="edit"><i class="icon far fa-lg fa-edit"></i></p>\n' +
                    '<p class="delete"><i class="icon far fa-lg fa-trash-alt"></i></p>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    '</li>';
                todoListNode.prepend(todoItem);
                $('.todo').show();

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

    // 編集ボタンをクリックしたらtodoモーダルが表示されて編集可能な状態とする
    $(document).on('click', '.edit', function () {
        var jsTitleTextNode = $(this).closest('.right').children('.js-title_text');
        var jsContentTextNode = $(this).closest('.right').children('.js-content_text');

        jsTitleTextNode.hide().siblings('.js-title_text-edit').show();
        jsContentTextNode.hide().siblings('.js-content_text-edit').show();
    });

    // 編集後に、textarea内でshift + enterを押下することで編集完了状態とする
    $(document).on('keyup', '.js-content_text-edit', function (e) {
        if (e.keyCode === 13 && e.shiftKey === true) {
            var titleEdit = $(this).siblings('.js-title_text-edit');
            var contentEdit = $(this);
            var titleEditVal = titleEdit.val();
            var contentEditVal = contentEdit.val();
            titleEdit.hide().siblings('.js-title_text').text(titleEditVal).show()
                .closest('.todo').attr('data-title', titleEditVal);
            contentEdit.hide().siblings('.js-content_text').text(contentEditVal).show()
                .closest('.todo').attr('data-content', contentEditVal);
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

    // 選択した進捗のTodoだけ表示する
    // unstartedタスク
    $(document).on('click', '.js-unstarted', function () {
        $('.todo').show().each(function (i, elm) {
            var unstartedNode = $(elm).hasClass('js-todo-unstarted');

            if (unstartedNode) {
                return true;
            }

            $(elm).hide();
        });
    });
    // In Progressタスク
    $(document).on('click', '.js-progress', function () {
        $('.todo').show().each(function (i, elm) {
            var unstartedNode = $(elm).hasClass('js-todo-progress');

            if (unstartedNode) {
                return true;
            }

            $(elm).hide();
        });
    });
    // Doneタスク
    $(document).on('click', '.js-done', function () {
        $('.todo').show().each(function (i, elm) {
            var unstartedNode = $(elm).hasClass('js-todo-done');

            if (unstartedNode) {
                return true;
            }

            $(elm).hide();
        });
    });
});