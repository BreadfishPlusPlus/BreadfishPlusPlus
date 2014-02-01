$(function () {
    "use strict";
    GM_log('executing threads.js');

    function seperateStickyThreads() {
        var $topThreadsStatus = $('#topThreadsStatus'),
            $containerHead = $('<div class="containerHead"><div class="containerContent"><h3>Wichtige Themen</h3></div></div>'),
            $importantThreadsList = $('<table class="tableList"></table>'),
            $importantThreads = $topThreadsStatus.find('tbody tr').filter(function (index) {
                return $(this).find('.columnIcon img[src*="Important"]').length !== 0;
            });
        $topThreadsStatus.siblings('.titleBarPanel').first().find('.containerHead .containerContent h3').text('Ankündigungen');
        $importantThreads.remove();

        $containerHead.css('border-radius', 0);

        $topThreadsStatus.append($containerHead);

        $importantThreads.each(function () {
            $importantThreadsList.append($(this));
        });

        $topThreadsStatus.append($importantThreadsList);
    }

    function removeDeletedThreads() {
        $('#normalThreadsStatus tbody > tr .columnIcon > img[src="icon/threadTrashM.png"]').closest('tr').remove();

        setTimeout(function () {
            $('#normalThreadsStatus tbody > tr').each(function (index) {
                $(this).attr('class', (index % 2 === 0) ? 'container-1' : 'container-2');
            });
        }, 1000);
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplBoard')) {
            if (GM_getValue('option_threads_extension_sticky', false)) {
                seperateStickyThreads();
            }
            if (GM_getValue('option_threads_filter_deleted', false)) {
                removeDeletedThreads();
            }
        }
    });
});