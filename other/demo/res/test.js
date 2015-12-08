//地址转换,接受字符串参数
      var pathChange = function(path){
        var toPath = {}
        //兼容采用双反斜杠的路径 去掉行首空格(好根据行首进行路径类型判断)
        toPath.dir = path.replace(/\\/g, '\/').replace(/^ */,'')

        //绝对路径,不转换
        if(/^\//.test(toPath.dir)) toPath.type = 'absolute'
        else{
          //防止空路径,尤其是用户设置空路径会引起中断
          if(toPath.dir===''){
          toPath.type = null
          }
          else{
            toPath.type = 'relative'
            //兼容node方式的相对路径写法
            if(toPath.dir.substring(0,2)==='./'){
              toPath.dir = '.' + toPath.dir
            }

          }
        }
        console.log(toPath)
        return toPath
      }

          pathChange('  .\\../other/mileage/mileage1/行驶里程.html')
          pathChange('')
          pathChange('  ')
          pathChange(' . /e')
          pathChange('e12 / ..')
          pathChange('./oth')


//绝对 /
//相对  ../ 头可能 xx  //# ###  归入相对
//node 相对 ./

//空
