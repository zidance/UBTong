/*功能说明,将该文件放在某目录下,用node启动,将遍历目录下的所有html文档形成一个数组,以配合pageGroup使用*/
var fs = require('fs')

function scan(path) {
  var fileList = [],
    folderList = [],
      linkData = '',
    count = 0,
    layer = 0,
    walk = function (path, fileList, folderList) {
      files = fs.readdirSync(path); //这里没有太多记数器,必须采用同步
      files.forEach(function (item) {
        var tmpPath = path + '/' + item,
          stats = fs.statSync(tmpPath);


        if (stats.isDirectory()) { //遍历到目录

          walk(tmpPath, fileList, folderList);

          folderList.push(tmpPath);
        } else { //遍历到文件

          if (/\.html/.test(item)) { //只收集html文件 node自身并不提供详细类型
            //                    fileList.push('"'+tmpPath+'"');
            fileList.push(tmpPath);
            linkData += '\n<p>'+ (++count) + '、　' + '<a href="' + tmpPath + '">' + tmpPath + '</a></p>'
          }
        }
      });
    };

  walk(path, fileList, folderList);

  console.log('位于'+__dirname+'的HTMLArray 组件运行正常')
//console.log(fileList)
//console.log(linkData)
  return {
          file:fileList,
          linkData:linkData
//          fold:folderList
        }

}

var path = __dirname

module.exports = scan(path)


//var scanResult = JSON.stringify(scan(path)) //待写入文件的内容
//
//var statDir = path.match(/.*\\(.*)/)
//jsonPath = 'F:/lzz/work/UBTong/other/demo/各目录html集合/' + RegExp.$1 + '.json'
//fs.writeFileSync(jsonPath, scanResult)
//
////继续处理,如写入到组合页的数组中
