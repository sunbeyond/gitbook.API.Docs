/**
 * @page 多语言选择
 * @author hongguang.wang
 * @Date 2018/9/11
 */

// 渲染语言列表
function languagePickerGrid(gitbook, langData) {
    var $picker = $('.lang-picker');
    var $ul = $("<ul>");
    for (var i = 0; i < langData.length; i++) {
        var $li = $("<li>");
        var l = $("<a>");
        l.attr("href", gitbook.state.bookRoot.replace(/([^\/])$/, "$1/") + langData[i][0] +"/");
        l.attr("data-lang", langData[i][0]);
        if (langData[i][0] == gitbook.state.innerLanguage) {
            $li.addClass("current");
            $picker.find('span').html(langData[i][1]);
        }
        l.html(langData[i][1]);
        $li.append(l);
        $ul.append($li);
    }
    $picker.append($ul);
}

// 获取语言列表
function parseLanguages(gitbook) {
    if (location.protocol == "file:") {
        var langData = [];
        langData.push(["en", "English"]);
        languagePickerGrid(gitbook, langData);
    }
    else {
        $.get(gitbook.state.bookRoot +"index.html", function(data) {
            var list = data.match(/<ul class=\"languages\">([\s\S]+?)<\/ul>/);
            if (list) {
                var langData = [];
                list[1].replace(/<a href=\"([^\/]+)[^>]+>(.+?)<\/a>/g, function(a, b, c) {
                    langData.push([b, c]);
                });
                languagePickerGrid(gitbook, langData);
            }
        }, "html");
    }
}

require(["gitbook", "jQuery"], function(gitbook, $) {
    gitbook.events.bind("start", function() {
        $(function() {
            // parseLanguages(gitbook);
            // 修复根目录失效问题
            $('.with-root').attr('href', function( i, val ) {
                return '/' + val;
            });
        });
    });
});
