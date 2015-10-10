//var $$ = jQuery;  //jQuery
 var $$ = $;  //zepto


$$(function(){
  // $$("#group").click(function(){
    
  //模块集合的初始化,将需要的模块路径按 ['url1','url2',...] 的格式写入 本地时只能是相对 只接受斜杠,不接受反斜杠是因引号内需转义
  var title='',//组合页面的标题
      aUrl=[
        '../footer/footer5/底部.html',
//         '..\\..\\index\\layout1\\header\\header4\\头部.html',
        // ''
      ],
      aPage=[];
  var oCofnig={ //可升级,
    //是否引用注释--注释容错,<!--...<link..><script..>-->
    //公用的css和js路径
      //css，js，写入位置的开关
    error:{
      bHasError:false,

    },
  }
  for(var iPageNum = 0;iPageNum<aUrl.length;iPageNum++){
    var oP = aPage[iPageNum] = {};//处理第n个模块,同时也是循环中的当前模块
    oP.url = aUrl[iPageNum]
    
    //允许路径采用反斜杠 '..\\footer\\footer5\\底部.html'
    oP.url = oP.url.replace(/\\/g,'\/')

    $$.ajax({
      url:oP.url,
      type:"GET",
      error:function(){//可升级,思路:一本地测试,二路径错误时存变量,并在for结束后统一回馈
        document.write("<p style='color:red'>第"+(iPageNum+1)+"个路径有误,请检查.</p><p>如果是在本机测试(没有架设服务器),请参照 <a target='_blank' href='http://blog.sina.com.cn/s/blog_a76aa1590101eams.html' >这里</a></p>")//中贡文
      },
      success:function (res, stutas, xhr) {
        isHtml();
        
        res=res
          .replace(/<link.*?common\/css\/common\.css.*?>/img,'')//去公用css
          .replace(/<script.*?common\/js\/zepto-1\.16\.min\.js.*?<\/script>/img,'')//去公用zepto
        
        

        oP.head = res.match(/<head[\s\S]+<body/im).toString()
        oP.head = oP.head.substring(0,oP.head.length-5)
        oP.head = oP.head
        oP.head = oP.head
          .replace(/<\/?head>/img,'')
          .replace(/<title.*?<\/title>/img,'')
          .replace(/<meta.*?>/img,'')
          .replace(/([\r\n]\s*)+/mg,'\n')

        oP.body = res.match(/<body[\s\S]+<\/body/im).toString()
        oP.body = oP.body.substring(0,oP.body.length-6)
        oP.body = oP.body.replace(/([\r\n]\s*)+/mg,'\n')
        
        
        $("body").append("<div  class='pageGroupTemp'>")
        $('.pageGroupTemp').append(oP.head).append(oP.body).append("<div class='pageGroupTempChild'>")      
        //body属性值设置,可升级,body如有属性,设置到新页面
        //方案1，body改为div　问题：可能对一些css设置和js获取dom树产生影响，如body>h1
        //方案2，div生成后，再获取其属性赋予到body并脱掉div壳，id,class,style属性，id的处理，再升级就是遍历属性了
        //方案3，对body直接查找到">"，将字段传递给新body，也要处理body多id
        
        
        
        
        //url判断和处理 
        
        oP.path = oP.url.replace(/(.*\/).*/,'$1')
        if(oP.url.substring(0,2)===".."){
          oP.urlType = "relative"
        }else{//绝对路径,可能是 /xxx,也可以http://
          oP.urlType = "absolute"
        }
        
   //资源的路径重写 对DOM属性操作 缺乏对相对的判断
        $('.pageGroupTemp').find('*').each(function(i){
          if($(this).attr('href')){//存在href属性
            $(this).attr('href',oP.path+$(this).attr('href'))
          }
          if($(this).attr('src')){//存在 src
            $(this).attr('src',oP.path+$(this).attr('src'))
          }
        })
        
        
        //直接对res字符串操作 只需处理相对 因重度依赖res/ 放弃 
//        oP.tempUrl = res.match(/(\.\.\/)+/)[0]//匹配当前第一个
//        oP.tempPath = function(){
//          
//        }
//        for(var i=1;i<=oP.tempUrl.match(/(\.\.\/)+?/g).length;i++){
//        }
//       
        
        
        //删除额外的节点
//     $('.pageGroupTempChild').unwrap().remove()   
        

      },//success结束

    })//ajax结束


  }//多个模块的for循环结束

  //对引用模块的html文件进行基本验证,head/body标签有且只有1 body的属性
  function isHtml(){

  }
  //错误输出
  function exportError(){
    
  }


 // })
})


/* 
/([\r\n]\s*)+/mg连空格
/[\r\n]+/mg  只删空白行,不删带空格的行

*/