if (typeof jQuery === "undefined") { //兼容无jQuery的情况,此时引入的子页面脚本不运行

  jQuery = 0
}
var $$ = jQuery || Zepto; //由于微商城项目主要采用zepto,jQuery交出$控制权
//jQuery.noConflict();
$ = Zepto; //如果jQuery采用不完整版,就需要


$$(function () {

    setTimeout(function () { //等待获取页面文件的参数
      //兼容pageGroup未定义的情况
      if (typeof pageGroup !== "object") {
        pageGroup = {}
      }
      //兼容pageUrl未定义的情况
      if (typeof pageUrl !== "object") {
        pageUrl = []
      }


      //默认的初始化,不推荐在此处进行配置. 可配置属性可在组合页配置全局pageGroup={}
      var iPageNum = 0, //第n个页面
        defaultPageGroup = {
          title: 'PageGroup', //组合页面的标题
          deleteTemp: false, //删除临时节点
        },
        errors = {
          hasError: false,
          pageCount: 0,
          pageError: function () { //路径错误
            errors.hasError = true;
            if (errors.pageCount === 0) {
              $$(".pgErrorInfo").find("span").append(iPageNum + 1)
              errors.pageCount = 1
            } else {
              $$(".pgErrorInfo").find("span").append('/' + (iPageNum + 1))
            }
          }
        };

      //页面标题
      $$("head").prepend("<title>" + (pageGroup.title || defaultPageGroup.title))


      var main = function () { //主循环函数,不采用for是避免异步造成的变量混乱
          var mainEnd = function () {
            iPageNum++
            main()
              //exportError()不适合在这里
          }

          if (iPageNum < pageUrl.length) {
            var oP = {}; //处理第n个子页面,同时也是循环中的当前子页面
            oP.url = pageUrl[iPageNum]
              //防止路径参数设置为''引起的中断
            if (oP.url === '') {
              errors.pageError()
              mainEnd()
            } else {

              //允许路径采用反斜杠 '..\\footer\\footer5\\底部.html'
              oP.url = oP.url.replace(/\\/g, '\/')

              //添加临时包裹节点页面中
              var wrapTemp = "pgWrapTemp" + iPageNum
              var childTemp = "pgChildTemp" + iPageNum
              $$("body").append('<div class="' + wrapTemp + '">')
              wrapTemp = '.' + wrapTemp

              $$.ajax({
                  url: oP.url,
                  type: "GET",
                  error: function () {
                    errors.pageError()
                    mainEnd()
                  },
                  success: function (res, stutas, xhr) {
                    res = res
                      .replace(/<link.*?common\/css\/common\.css.*?>/img, '') //去公用css
                      .replace(/<script.*?common\/js\/zepto-1\.16\.min\.js.*?<\/script>/img, '') //去公用zepto

                    oP.head = res.match(/<head[\s\S]+<body/im).toString()
                    oP.head = oP.head.substring(0, oP.head.length - 5)
                    oP.head = oP.head
                      .replace(/(<\/?head>)|(<title.*?<\/title>)|(<meta.*?>)/img, '')
                      .replace(/([\r\n]\s*)+/mg, '\n')


                    oP.body = res.match(/<body[\s\S]+<\/body/im).toString()
                    oP.body = oP.body.substring(0, oP.body.length - 6)
                    oP.body = oP.body
                      .replace(/<\/?body.*?>|<script[\s\S]*?<\/script>/img, '') //去掉了body属性/去除脚本
                      .replace(/([\r\n]\s*)+/mg, '\n')


                    $$(wrapTemp)
                      .append(oP.head)
                      .append(oP.body)
                      .append('<div class="' + childTemp + '">')

                    //资源的路径重写 对DOM属性操作 缺乏对相对的判断
                    if (/.*\//.test(oP.url)) { //当子页面与组合页位于不同目录
                      oP.path = oP.url.replace(/(.*\/).*/, '$1')
                    } else { //当子页面与组合页位于同一目录
                      oP.path = ''
                    }
                    $$(wrapTemp).find('*').each(function (i) {
                      if ($$(this).attr('href')) { //存在href属性
                        if ((/:\/\//m.test($$(this).attr('href'))) || ($$(this).attr('href').substring(0, 1) === '/') || ($$(this).attr('href').substring(0, 1) === '\\') ||(/^[#\s]*$/.test($$(this).attr('href')))) { //资源绝对路径 或 a链接#

                        } else { //资源相对路径
                        $$(this).attr('href', oP.path + $$(this).attr('href'))
                        }
                      }
                      if ($$(this).attr('src')) { //存在 src
                        if ((/:\/\//m.test($$(this).attr('src'))) || ($$(this).attr('src').substring(0, 1) === '/') || ($$(this).attr('src').substring(0, 1) === '\\')) { //资源绝对路径

                        } else { //资源相对路径
                          $$(this).attr('src', oP.path + $$(this).attr('src'))
                        }
                      }
                    })

                    //js脚本另处理
                    oP.js = res.match(/<script[\s\S]*?<\/script>/igm)

                    for (var i in oP.js) {
                      var pa = /<script.*?src.*?>/i
                      var _this = oP.js[i]
                      if (pa.test(_this)) { //有路径
                        _this = _this.replace(/src=[\'\"](.*?)[\'\"]/i, "src=" + oP.path + "$1")
                        $$(wrapTemp).append($$(_this))
                      } else { //行间js脚本
                        setTimeout(function () {
                          $$(wrapTemp).append($$(_this))
                        }, 500)
                      }
                    }

                    //删除临时节点
                    if (pageGroup.deleteTemp || defaultPageGroup.deleteTemp) {
                      $$('.' + childTemp).unwrap().remove()
                    } else {
                      $$('.' + childTemp).remove()
                    }

                    mainEnd()
                  }, //success结束

                }) //ajax结束

            } //if(oP.url==='')的else结束

          } //多个子页面间的if循环结束
          else if (iPageNum = pageUrl.length) {
            exportError()
          }


        } //main

      main()


      //错误输出
      function exportError() {
        setTimeout(function () {
          if (errors.hasError) {
            $$(".pgErrorInfo").css("display", "block")
            $$(".pgErrorBg").css("display", "block")
            $$(".pgErrorInfoPath").css("display", "block")
          }

          $$(".pgErrorBg").click(function () {
            $$(".pgErrorInfo").css("display", "none")
            $$(".pgErrorBg").css("display", "none")
          })
          $$(".pgErrorInfoClose").click(function () {
            $$(".pgErrorInfo").css("display", "none")
            $$(".pgErrorBg").css("display", "none")
          })
        }, 3000)
      }

    }, 300)
  }) //$(function(){})的结束