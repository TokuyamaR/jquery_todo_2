$(function () {

    var modalTarget = $('.js-show-modal-target');
    var modalCover = $('.js-show-modal-cover');
    var todoListNode = $('.todos');

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