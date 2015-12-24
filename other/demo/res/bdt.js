//此文件做为HTMLArray.js 针对公司微商城项目打的补丁

//保留zepto的$符权限
var $$ = jQuery || Zepto; //测试中zepto的ajax页面不加载js
jQuery.noConflict();


//default.js的路径
$$('script').each(function(){
    if($$(this).attr('src').match(/(.*)other\/demo\/res\/bdt\.js/))
        window.tempRootDir = RegExp.$1
})


setTimeout(function () {
    /*add加入到base,isArray表参数是否需要Array格式*/
    function set(base, add, isArray) {
        //第一种情况,用户未定义,采用该补丁的默认设置
        if (typeof base == 'undefined')
            return base = add
                //第二种,用户已定义,且定义的项目涉及到数组格式,将用户与默认合并
        else if (isArray) {
            //先将a变成数组(如果是字符串或正则)
            if ((typeof base == 'string') || (base instanceof RegExp)) {
                base = [base]
            }
            if (add instanceof Array)
                Array.prototype.push.apply(base, add)
            else if ('string' == typeof add)
                base.push(add)
            else if (add instanceof RegExp)
                base.push(add)

            return base
        }
        //第三种,用户已定义,且不涉及到数组格式,直接用用户定义覆盖默认
        else {
            return base
        }
    }


    //参考各选项
    //    HtmlArray.config = {
    //      title: 'MyPages',//组合页面的标题
    //      debug: false, //调试模式，默认false,设为true时提供分页的控制模块，帮助快速定位问题页面
    //      fixed: true, //允许fixed定位,默认true,当元素重叠严重时可以用false尝试
    //      src: [], //自定义的资源路径属性,将加入到原有数组['src', 'href']中,接受格式为数组(多个字符串)或单个字符串
    //      nullHref: '###', //改变href="#"路径,使空链接不跳转到头部,默认不改变,只有设'###'时会改变
    //      disable: ['zepto-1.16.min.js','common.css','default.js'], //禁用文件集,接受格式为数组或单个字符串,推荐只写文件名不带路径.用来禁用引发错误的文件,可用来禁用多次引入会引起问题的脚本,如zepto(这一类需要在本组合页头部去引入一次).
    //      lazyload: ['../../common/js/default.js'], //加强延迟文件集,把一些脚本有意地再延迟.接受格式为数组或单个字符串,必须是完整的正确路径
    //    }

    //默认初始化配置
    if (typeof HtmlArray == 'undefined') {
        HtmlArray = []
    }
    HtmlArray.config = set(HtmlArray.config, {})
    HtmlArray.config.nullHref = set(HtmlArray.config.nullHref, '###')
    HtmlArray.config.disable = set(HtmlArray.config.disable, ['zepto-1.16.min.js', 'common.css', 'default.js'], true)
    HtmlArray.config.lazyload = set(HtmlArray.config.lazyload, [tempRootDir + 'common/js/default.js'], true)

    setTimeout(function () {
        //公用文件及HtmlArray.js的引入
        $$('head').append('<link href="'+tempRootDir+'common/css/common.css"  rel="stylesheet"  type="text/css" />')
        $$('head').append('<script type="text/javascript" src="' + tempRootDir + 'common/js/zepto-1.16.min.js"></script>')
        $$('head').append('<script type="text/javascript" src="' + tempRootDir + 'common/js/default.js"></script>')

        $$('head').append('<script type="text/javascript" src="' + tempRootDir + 'other/demo/res/HtmlArray.js"></script>')
    }, 200)


}, 500)
