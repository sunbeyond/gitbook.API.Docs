/**
 * @page
 * 章节列表自动展开收起，指定章节显示编程语言转换按钮
 * use in a large page which scroll by anchor
 * @author hongguang.wang
 * @Date 2018/9/6
 */
require(['gitbook', 'jQuery'], function(gitbook, $) {
    var BODY_INNER='.body-inner',
        TOGGLE_CLASSNAME = 'expanded',
        CHAPTER = '.chapter',
        CHAPTER_ACTIVE = '.chapter.active',
        ARTICLES = '.articles',
        TRIGGER_TEMPLATE = '<i class="exc-trigger fa"></i>',
        LANG_SWITCH = '.lang-switcher';

    var init = function () {
        var showLangSwitcherRex = new RegExp(gitbook.state.config.pluginsConfig['show-lang-switcher'], 'i');
        // 在大章节前添加<i>，并绑定事件
        $(ARTICLES)
            .parent(CHAPTER)
            .children('a')
            .append(
                $(TRIGGER_TEMPLATE)
                    .on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle($(e.target).closest(CHAPTER));
                    })
            );
        //监听body-inner滚动，实时展开收起菜单
        $(BODY_INNER).on('scroll', function() {
            collapseAll();
            var activeChapter = $(CHAPTER_ACTIVE);
            expand(activeChapter);
            expand(activeChapter.parents(CHAPTER));
            if (showLangSwitcherRex.test(activeChapter.find('a').attr('href'))) {
                $(LANG_SWITCH).show();
            } else {
                $(LANG_SWITCH).hide();
            }
        });
    };
    var toggle = function ($chapter) {
        if ($chapter.hasClass(TOGGLE_CLASSNAME)) {
            collapse($chapter);
        } else {
            expand($chapter);
        }
    };
    var collapse = function ($chapter) {
        if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.removeClass(TOGGLE_CLASSNAME);
        }
    };
    var collapseAll = function () {
        $(ARTICLES).parent(CHAPTER).removeClass(TOGGLE_CLASSNAME);
    };
    var expand = function ($chapter) {
        if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.addClass(TOGGLE_CLASSNAME);
        }
    };
    gitbook.events.bind('page.change', function() {
        init();
    });
});
