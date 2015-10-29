/*功能说明,遍历目录,生成对应的HTML组合文档*/
/*直接生成目录的方法,需要拷贝BuildHtml.js,copyFile.js,组合1.html,组合2.html到目录下,workDir配置为空'',命令行进入该目录,再输入 node BuildHtml.js */


//初始化,只配以下三个参数
var workDir = 'F:/lzz/work/UBTong'; //需要遍历的目录,不填为本文件所在目录,并且只生成一个总文件  格式F:/git/UBTong
var demoDir = '';//存放组合1.html和组合2.html的位置 为空时默认与本js文件同目录
var childFolder = true; //是否按第一层子文件夹的数量批量生成 false时只生成一个总文件

//参数重解析
demoDir = demoDir||__dirname;
//如果workDir未定义,或目录下不存在copyFile  childFolder = false
if(workDir==false){
  childFolder = false;
  workDir = __dirname;
}

var fs = require('fs');

var str1 = fs.readFileSync(demoDir + '/组合1.html')
var str2 = fs.readFileSync(demoDir + '/组合2.html')

if (childFolder) {
  //workDir下是否存在所需的文件夹

  var copyFile = require('./copyFile'),
    childDir = copyFile(workDir); //返回子文件夹数组

  //每一个子文件夹循环一次以下操作
  for (var i = childDir.length - 1; i >= 0; i--) {
    //childDir[i]子目录  childName子目录的名称(文件夹名)
    childName = childDir[i].match(/.*[\/\\](.*)/)
    childName = RegExp.$1

    var tempHtmlArray = require(workDir + '/' + childName + '/HTMLArray.js') //返回该文件夹下html文件数组
    var scanResult = JSON.stringify(tempHtmlArray) //数组json化

    //生成json 目前取消
//    jsonPath = workDir + '/other/demo/各目录html集合/' + childName + '.json'
//    fs.writeFileSync(jsonPath, scanResult)

    //  //删除各子文件夹下的HTMLArray.js
    fs.unlink(childDir[i] + '/HTMLArray.js')

      //  //生成组合html
    htmlPath = workDir + '/other/demo/' + childName + '.html';
    fs.writeFileSync(htmlPath, str1 + scanResult + str2)
  }
  console.log(workDir + '目录遍历成功,按子文件夹的数目生成了对应的html组合页面,位于' + workDir + '/other/demo/')
}
else {
    var tempHtmlArray = require('./HTMLArray.js') //返回该文件夹下html文件数组
    var scanResult = JSON.stringify(tempHtmlArray) //数组json化
    fs.writeFileSync(__dirname+'/组合页面.html', str1 + scanResult + str2)

  //如果该HTML文件存在
  console.log(__dirname + '目录遍历成功,集合了该目录下的html页面,位于' + __dirname+'/组合页面.html')
}

//如果workDir未定义,或目录下不存在copyFile  childFolder = false
//对已存在的提醒 组合1.html等不存在的提醒