/*依赖于jQuery*/
;if (typeof jQuery === "undefined") {
  jQuery = {}
}
if (!window.Zepto) {
  Zepto = {}
}
var $$ = jQuery || Zepto; //测试中zepto的ajax页面不加载js
jQuery.noConflict();
$ = Zepto;

;$$(function () {

    setTimeout(function () { //等待获取页面文件的参数

        //兼容HtmlArray未定义的情况
        if (typeof HtmlArray !== "object") {
          HtmlArray = []
        }
        //兼容HtmlArray.config未定义的情况
        if (typeof HtmlArray.config !== "object") {
          HtmlArray.config = {}
        }

        /*默认的初始化,不推荐修改此处. 推荐在组合页配置全局HtmlArray.config={}*/
        var iPageNum = 0, //第n个页面
          init = {
            title: HtmlArray.config.title || 'HtmlArray',//组合页面的标题
            debug: HtmlArray.config.debug || false, //调试模式，默认false，设为true时将删除分页的包裹节点
            fixed: HtmlArray.config.fixed, //fixed定位
            src: ['src', 'href'], //自定义的资源路径属性
            disable: ['HtmlArray.js'], //禁用文件集
            nullHref: HtmlArray.config.nullHref || '#' //改变href="#"路径
          },
          errors = {
            hasError: false,
            pageCount: 0,
            pageNums:'',
            pageError: function () { //路径错误
              errors.hasError = true;
              if (errors.pageCount === 0) {
                errors.pageNums += (iPageNum + 1)
                errors.pageCount = 1
              }
              else {
                errors.pageNums += '/' + (iPageNum + 1)
              }
              return errors.pageNums
            }
          };
      var jsArray = [];

        /*参数重设*/
        //是否允许fixed,默认true
      if(undefined === init.fixed)
        init.fixed = true

        //集合用户参数和默认初始化
        var argsToArray = function (initarg, user) {
          if (user instanceof Array)
            Array.prototype.push.apply(initarg, user)
          else if ('string' == user)
            initarg.push(user)
          else if (user instanceof RegExp)
            initarg.push(user)
        }

        //源文件中的资源 前缀字符集,如href
        argsToArray(init.src, HtmlArray.config.src)

        //disable文件集
        argsToArray(init.disable, HtmlArray.config.disable)

        //资源路径的匹配原则,配合循环体中的replace用
        var srcReg = new RegExp('(' + init.src.join('|') + ')\\s*=\\s*[\'\"]((?!#|\/|(.*?:\/)).*?)[\'\"]', 'ig')

        //页面标题
        $$("head").prepend("<title>" + (init.title))

        //
       if(init.debug){
         $$('head').append('<style rel=\"stylesheet\" type=\"text/css\">/*分页控制样式*/h1.pgTitle{position:relative;z-index = 999999;font-size:.8rem;line-height: 1.5;text-align: center;} \n h1.pgTitle>*{display:inline-block;line-height: 1.5;margin:0 1em;word-break: break-all;}</style>')
       }

        //地址转换,接受字符串参数,返回值{dir:'xx',type:'xx'}
        var pathChange = function (path) {
          var toPath = {}
            //兼容采用双反斜杠的路径 去掉行首空格(好根据行首进行路径类型判断)
          if (undefined == path) path = '' //防止双逗号错误
          var dir = path.replace(/\\/g, '/').replace(/^[ 　]*/, '')

          //防止空路径(''和双逗号),尤其是用户设置空路径会引起中断
          if (dir === '') toPath.type = null
            //绝对路径,不转换 两种情况:首位'/',或带协议头(必带':/',包括ie直接返的盘符d:/)
          else if (/^\//.test(dir) || /file:\//.test(dir)) toPath.type = 'absolute'
          else if (/:\//.test(dir)) toPath.type = 'absolute_http'
            //本页内部锚点链接--文件名可带# 且资源路径已经改为独立处理
            //        else if (/^#/.test(dir)) toPath.type = 'anchor'
            //相对路径
          else {
            toPath.type = 'relative'
              //兼容node方式的相对路径写法
            if (/^.\//.test(dir)) {
              dir = dir.replace(/^.\//, '')
            }
          }
          toPath.url = dir
          return toPath
        }

        /*主循环函数,不采用for是避免异步造成的变量混乱*/
        var main = function () {
            var mainEnd = function () {
              iPageNum++

              //删除临时节点
              if (!init.debug) {
                  var temp = $$(oP.wrapTemp).html()
                  $$(oP.wrapTemp).replaceWith(temp)
              }



              main() //if中调用主函数的循环
                //exportError()不适合在这里
            }

            if (iPageNum < HtmlArray.length) {
              //处理第n个子页面,同时也是循环中的当前子页面
              var oP = pathChange(HtmlArray[iPageNum]);

              //包裹节点和控制节点
              (function wrap() {
                oP.wrapTemp = "pgwrapTemp" + iPageNum
                $$("body").append('<div class="' + oP.wrapTemp + '">')
                oP.wrapTemp = $$('.' + oP.wrapTemp)

                //按源文件路径加入标题字段
                if (init.debug) {
                  ('/' + oP.url).match(/.*\/(.*)\..*/)
                  oP.title = RegExp.$1
                  oP.wrapTemp.before('<h1 class="pgTitle">' + oP.title + '<a target="_blank" href="' + oP.url + '">' + oP.url + '</a><input type="button" value="隐藏" /><span title="删除后,恢复请刷新页面">删除该节点</span></h1>')
                  oP.wrapTempControl = oP.wrapTemp.prev('h1')
                  oP.wrapTempControl.on('click', 'input', function () {
                    if (oP.wrapTemp.css('display') == 'none') {
                      oP.wrapTemp.show()
                      $$(this).val('隐藏')
                    } else {
                      oP.wrapTemp.hide();
                      $$(this).val('显示')
                    }
                  })
                  oP.wrapTempControl.on('click', 'span', function () {
                    oP.wrapTemp.remove();
                    $$(this).html("已删除")
                    oP.wrapTempControl.find('input').remove();
                  })
                }
              })()

              //防止空路径参数设置为''引起的中断 及跨域型绝对路径
              if ((null == oP.type) || ('absolute_http' == oP.type)) {
                oP.wrapTemp.html('路径有误')
                errors.pageError()
                mainEnd()
              }
              //非空路径,执行ajax
              else {

                /*ajax主体*/
                $$.ajax({
                    url: oP.url,
                    type: "GET",
                    error: function () {
                      oP.wrapTemp.html('ajax失败')
                      errors.pageError()
                      mainEnd()
                    },
                    success: function (res, stutas, xhr) {
                      //源文件路径(不含文件名)
                      if (/.*\//.test(oP.url)) { //当子页面与组合页位于不同目录,包括绝对定位 和相对定位中出现'/'
                        oP.path = oP.url.replace(/(.*\/)(.*)\..*/, '$1')
                      } else { //当子页面与组合页位于同一目录
                        oP.path = ''
                      }

                      //源文件中的资源 路径处理
                      //禁用文件处理
                        for (var i = init.disable.length - 1; i >= 0; i--) {
                          res = res.replace(new RegExp('(' + init.src.join('|') + ')\\s*=\\s*[\'\"].*?' + init.disable[i] + '.*?[\'\"]', 'ig'), '')
                        }
                      //非禁用文件的通用处理
                      res = res.replace(srcReg, '$1="' + oP.path + '$2"')

                      //res处理, meta标签暂不删
                      res = res.replace(/(<\/?!doctype.*?>)|(<\/?html>)|(<\/?head>)|(<\/?body.*?>)|(<title.*?<\/title>)/ig, '').replace(/([\r\n]\s*)+/g, '\n')


                      oP.js = res.match(/<script[\s\S]*?<\/script>/ig)
                      if(oP.js != null)
                        argsToArray(jsArray,oP.js)

                      res = res.replace(/<script[\s\S]*?<\/script>/ig,'')
                      oP.wrapTemp.append(res)

                      mainEnd() //单页面加载结束,也是if中调用主函数的循环
                    }, //success结束

                  }) //ajax结束

              } //if(null == oP.type)的else结束



            } //多个子页面间的if循环结束
            //下面else 为iPageNum>=HtmlArray.length,即页面循环结束
            else {
              exportError()
            }
          } //main
        main()

        //错误输出
        function exportError() {
          setTimeout(function () {

            jsArray.join('\n')
            $$('body').append(jsArray)

            if (errors.hasError) {
              //插入错误样式和内容
              $$('head').append('<style rel=\"stylesheet\" type=\"text/css\">/*帮助报错的样式控制*/ \n .pgErrorInfo{display: none;position: fixed;width:100%;z-index: 99999;max-width:640px;left: 0;right: 0;margin:auto;background-color: #e6e6e6;padding-bottom:10px;} \n .pgErrorInfo>div{width:70%;margin:0 auto;} \n .pgErrorInfo div p{padding:3% 3% 0 5%;width:100%;} \n .pgErrorInfo button{display:block;width:20%;margin:0 auto;font-size: 1.3rem;padding:.2rem;} \n .pgErrorBg{display: none;position: fixed;top:0;left:0;width: 100%;height:100%;background-color: #000;opacity: 0.3;z-index: 99990;}</style>')
              $$('body').prepend('<!--报错区--> \n <div class=\"pgErrorInfo\"> \n <div class=\"pgErrorInfoPath\"> \n <p>第<span>'+errors.pageNums+'</span>个路径有误,请检查.</p> \n <p>如果是在本机测试(没有架设服务器),请参照 <a target=\"_blank\" href=\"http://blog.sina.com.cn/s/blog_a76aa1590101eams.html\">这里</a></p> \n </div> \n <button class=\"pgErrorInfoClose\">关闭</button> \n </div> \n <div class=\"pgErrorBg\"></div>')


              $$(".pgErrorInfo").css("display", "block")
              $$(".pgErrorBg").css("display", "block")
            }
            $$(".pgErrorBg").click(function () {
              $$(".pgErrorInfoClose").trigger('click')
            })
            $$(".pgErrorInfoClose").click(function () {
              $$(".pgErrorInfo").css("display", "none")
              $$(".pgErrorBg").css("display", "none")
            })

            //href="#"改写为"###"
            if ('###' == init.nullHref) {
              $$('*').each(function () {
                if ($$(this).attr('href') == '#') {
                  $$(this).attr('href', '###')
                }
              })
            }

            //固定定位改写为相对定位
            if (!init.fixed) {
              $$('*').each(function () {
                if ($$(this).css('position') == 'fixed') {
                  $$(this).css('position', 'relative')
                }
              })
            }

          }, 1000)
        }

      }, 300) //setTimeout //等待获取页面文件的参数



  }) //$$(function(){})的结束


/*h1.pgTitle{position:relative;z-index = 999999;font-size:.8rem;line-height: 1.5;text-align: center;}
    h1.pgTitle>*{display:inline-block;line-height: 1.5;margin:0 1em;word-break: break-all;}*/
