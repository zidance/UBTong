var $$ = jQuery;  //jQuery 需交出$
// var $$ = window.Zepto;  //zepto

//zepto与jQuery的$$冲突问题
//其它js不生效问题


$$(function(){
  //默认的初始化 其中部分可配置,属全局pageGroup={}
  var defaultPageGroup={ //可升级,
    title:'组合页面',//组合页面的标题
//    //公用的css和js路径
    hasError:false,
    errors:{
      page:[],
      pageCount:0,
    
//
    },
    
  };


      
  var aPage=[];
  var iPageNum = 0;
    $$("head").prepend("<title>"+(pageGroup.title||defaultPageGroup.title)) 
  var main = function(){//主循环函数,不采用for是避免异步ajax造成变量的混乱
    

  if(iPageNum<pageUrl.length){
    var oP = aPage[iPageNum] = {};//处理第n个模块,同时也是循环中的当前模块
    oP.url = pageUrl[iPageNum]
    
    //允许路径采用反斜杠 '..\\footer\\footer5\\底部.html'
    oP.url = oP.url.replace(/\\/g,'\/')

    $$.ajax({
      url:oP.url,
      type:"GET",
//      async:true,
      error:function(){//可升级,思路:一本地测试,二路径错误时存变量,并在for结束后统一回馈
        $$("body").prepend("<div class='errorInfo'><p style='color:red'>第<span>"+(iPageNum+1)+"</span>个路径有误,请检查.</p><p>如果是在本机测试(没有架设服务器),请参照 <a target='_blank' href='http://blog.sina.com.cn/s/blog_a76aa1590101eams.html' >这里</a></p>")
        
//        pageGroup.hasError=true;
//        pageGroup.errors.page[pageGroup.errors.pageCount] = iPageNum;
//        pageGroup.errors.pageCount++;
//        alert(typeof pageGroup.errors.page)
        iPageNum++
        main()
      },
      success:function (res, stutas, xhr) {
        
        isHtml();
        
        
        res=res
          .replace(/<link.*?common\/css\/common\.css.*?>/img,'')//去公用css
          .replace(/<script.*?common\/js\/zepto-1\.16\.min\.js.*?<\/script>/img,'')//去公用zepto
        
        

        oP.head = res.match(/<head[\s\S]+<body/im).toString()
        oP.head = oP.head.substring(0,oP.head.length-5)
        oP.head = oP.head
          .replace(/<\/?head>/im,'')
          .replace(/<title.*?<\/title>/img,'')
          .replace(/<meta.*?>/img,'')
          .replace(/([\r\n]\s*)+/mg,'\n')
 
        oP.body = res.match(/<body[\s\S]+<\/body/im).toString()
        oP.body = oP.body.substring(0,oP.body.length-6)
        oP.body = oP.body
          .replace(/<\/?body.*?>/im,'')//去掉了body属性
          .replace(/([\r\n]\s*)+/mg,'\n')
        
        var wrapTemp = "pageGroupTemp"+iPageNum
        $$("body").append('<div class="'+wrapTemp+'">')
        wrapTemp = '.'+wrapTemp
        $$(wrapTemp)
          .append(oP.head)
          .append(oP.body)
          .append('<div class="pageGroupTempChild">')
        
        //body属性值设置,可升级,body如有属性,设置到新页面
        //方案1，body改为div　问题：可能对一些css设置和js获取dom树产生影响，如body>h1
        //方案2，div生成后，再获取其属性赋予到body并脱掉div壳，id,class,style属性，id的处理，再升级就是遍历属性了
        //方案3，对body直接查找到">"，将字段传递给新body，也要处理body多id
//        alert($$(".pageGroupBody").html())
        
        
        
        //url判断和处理 
        oP.path = oP.url.replace(/(.*\/).*/,'$1')
        if(oP.url.substring(0,2)===".."){
          oP.urlType = "relative"
        }else{//绝对路径,可能是 /xxx,或http://
          oP.urlType = "absolute"
        }
        
   //资源的路径重写 对DOM属性操作 缺乏对相对的判断
        $$(wrapTemp).find('*').each(function(i){
          if($$(this).attr('href')){//存在href属性
            $$(this).attr('href',oP.path+$$(this).attr('href'))
          }
          if($$(this).attr('src')){//存在 src
            if((/:\/\//m.test($$(this).attr('src')))||($$(this).attr('src').substring(0,1)==='/')||($$(this).attr('src').substring(0,1)==='\\')){//资源绝对路径
               }else{//资源相对路径
                 $$(this).attr('src',oP.path+$$(this).attr('src'))
               }
            
          }
        })
        
        //删除额外的节点
//     $$('.pageGroupTempChild').unwrap().remove()
     
      iPageNum++
      main()
//      if(iPageNum=pageUrl.length){
//        exportError()
//      }
      },//success结束

    })//ajax结束


  }//多个模块的for循环结束
      
       
}//main
  main()   
  

  //对引用模块的html文件进行基本验证,head/body标签有且只有1 body的属性
  function isHtml(){

  }
    
  //错误输出
  function exportError(){
//    setTimeout(function(){
////    if(pageGroup.hasError){
//
//      $$("body").prepend("<div class='errorInfo'><p style='color:red'>第<span></span>个路径有误,请检查.</p><p>如果是在本机测试(没有架设服务器),请参照 <a target='_blank' href='http://blog.sina.com.cn/s/blog_a76aa1590101eams.html' >这里</a></p>")//中贡文
//      var errorPage=''
////      alert(typeof pageGroup.errors.page)
//      for(var i in pageGroup.errors.page){
//        
//        alert(pageGroup.errors.page[i])
//      }
//     
//     $$('.errorInfo').find("span").text(errorPage)
//      
////    }
//      },2000)
  }



  
  
})



/* 
/([\r\n]\s*)+/mg连空格
/[\r\n]+/mg  只删空白行,不删带空格的行

*/