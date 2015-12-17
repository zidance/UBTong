<<<<<<< HEAD
/*功能说明,指定一个目录如UBTong,将BuildArray.js拷贝到UBTong的所有第一级子目录下.
=======
/*功能说明,指定一个目录如UBTong,将HTMLArray.js拷贝到UBTong的所有第一级子目录下.
>>>>>>> origin/Develop
返回数组,含所有第一级子目录的路径
*/
var fs = require('fs')

function copyFile(to) {
  //三个配置参数
  var childDir = true, //传给第一层子文件夹内
<<<<<<< HEAD
    fromFile = './BuildArray.js',
=======
    fromFile = './HTMLArray.js',
>>>>>>> origin/Develop
    toDir = to || __dirname;


  var fileList = [],
    folderList = [];

  var Str = fs.readFileSync(fromFile)
    //  fromFile = fromFile.substring


  walk = function (path, fileList, folderList) {

    files = fs.readdirSync(path); //这里没有太多记数器,必须采用同步
    files.forEach(function (item) {
      var tmpPath = path + '/' + item,
        stats = fs.statSync(tmpPath);

      if (stats.isDirectory()) { //遍历到目录
        //                  walk(tmpPath, fileList, folderList);
        folderList.push(tmpPath);
        fs.writeFileSync(tmpPath + '/' + fromFile, Str)
      }
    });
  };

  walk(toDir, fileList, folderList);

  console.log('copyFile运行正常')
  return folderList
}

module.exports = copyFile
