var $$ = jQuery;  //jQuery
// var $$ = $;  //zepto


$$(function(){
  // $$("#group").click(function(){
  //模块集合的初始化,将需要的模块路径按 ['path1','path2',...] 的格式写入
  var aUrl=[
    '../../parts/footer/footer5/底部.html',
    // '',
    // ''
  ],
  aPage=[];
  var oCofnig={ //可升级,
    //是否引用注释--注释容错,<!--...<link..><script..>-->
    //公用的css和js路径
    error:{
      bHasError:false,

    },
  }

  for(iPageNum = 0;iPageNum<aUrl.length;iPageNum++){
    var oP = aPage[iPageNum] = {};//处理第n个模块,同时也是当前模块
    oP.path=aUrl[iPageNum];

    $$.ajax({
      url:oP.path,
      type:"GET",
      error:function(){//可升级,思路:一本地测试,二路径错误时存变量,并在for结束后统一回馈
        document.write("<p style='color:red'>第"+(iPageNum+1)+"个路径有误,请检查.</p><p>如果是在本机测试(没有架设服务器),请参照 <a target='_blank' href='http://blog.sina.com.cn/s/blog_a76aa1590101eams.html' >这里</a></p>")//中贡文
      },
      success:function (response, stutas, xhr) {
        var res = response.replace(/<!--[\s\S]*?-->/mg,'') //可升级, 删除注释

        isHtml();

        //为兼容不同位置出现的css和js文件,在收到的整个html文档中搜索
        oP.css = res.match(/<link.*?>/ig)
        res = res.replace(/<link.*?>/ig,'')
        oP.js = res.match(/<script[\s\S]*?<\/script>/igm)
        res = res.replace(/<script[\s\S]*?<\/script>/igm,'')

        // oP.head = res.match(/<head[\s\S]+<body/im)
        oP.body = res.match(/<body[\s\S]+<\/body/im)
        //可升级,body如有属性,设置到新页面



        alert(oP.body)

        //css不为null时,输出到组合页面的head末尾
        if(oP.css){
          var rCom = /common\/css\/common\.css/
          $$(oP.css).each(function(i){
            //重复common.css的处理,防止公用css覆盖项目专用css
            if(!rCom.test(oP.css[i])){
              $$("head").append(oP.css[i])
            }
          })
        }


        //js不为null时,输出到组合页面的body末尾
        if(oP.js){
          var rCom = /common\/js\/zepto-1\.16\.min\.js/
          $$(oP.js).each(function(i){
            //重复zepto.js的处理,zepto的多次引用会造成脚本问题
            if(!rCom.test(oP.js[i])){
              $$("body").append(oP.js[i])
            }
          })
        }

      },//success结束

    })//ajax结束


  }//多个模块的for循环结束

  //对引用模块的html文件进行基本验证,head/body标签有且只有1 body的属性
  function isHtml(){

  }
  //
  function exportError(){
    
  }


 // })
})
