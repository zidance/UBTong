var $$ = jQuery;

//目前还未封装position(目标是用来区分水平向或垂直)
var slide = function (container, list, position) {
    var config = {
        minMove: 8, //最小触发位移
        maxDiv: 4, //可见块数
        delay: 300, //滚动监测间隔,实测当数字小于300时,容易产生问题(pc端鼠标一直拉着滚动条时,闪得太快)
        maxDelay: 3, //如果用户一直按着不动或使用中键滚动,时间达到滚动监测delay的几倍时,当作此次操作结束
      },
      temp = {},
      oCont = $$(container),
      oLists = oCont.find(list),
      oLi = oLists.find('li'),
      oLi1 = oLi.first()

    if(oLi.length<config.maxDiv){
      config.maxDiv = oLi.length
    }

    temp.liHei = oLi1.height()

    //设置高度
    oLists.height(temp.liHei * oLi.length)
    oCont.height(temp.liHei * config.maxDiv)


    //判断是否还处于按住不拖动的状态,不包括中键
    oCont.on('touchend', function () {
      temp.isUse = false
      monitor()
    })
    oCont.on('mouseup', function (e) {
        if (1 == e.which) {
          temp.isUse = false
          monitor()
        }
      })
      //补充:由于微信的兼容问题,touchstart必须preventDefualt() 后,touchend才有效,与放开原生滚动相冲突,所以temp.isUse的true改由scroll触发

    /*动画*/
    var animate = function(num){
      oCont.stop(true, true)
      oCont.animate({'scrollTop': temp.liHei * num})
    }

    /*选中行为 选中不再调整动画*/
    oLi.on('choose', function() {
     /*使用prop取代attr,jQuery新版中对布尔型属性的用法修改*/    $(this).siblings().find('input').prop('checked',false)
      $(this).find('input').prop('checked', true)
    })



    /*判断滚动停止及滚动方向*/
    temp.scroll = 0 // 上次滚动条到顶部的距离
    var interval = null; // 定时器
    temp.isScrollFirst = true

    oCont.on('scroll', function () {
      temp.isUse = true
      if (interval == null)
        interval = setInterval(monitor, config.delay); //判定间隔时间
    })

    function monitor() {

      temp.scrollEnd = oCont.scrollTop()
      if (temp.isScrollFirst) {
        temp.isScrollFirst = false
        temp.scrollFirst = oCont.scrollTop()
      }

      //每一次的对比
      temp.everyY = temp.scrollEnd - temp.scroll

      //temp.everyY==0代表不再滚动
      if (temp.everyY == 0) {
        //用户按住不拖动的情况
        if (temp.isUse) {
          //记一次,达到最大次数时中止,用于中键滚动
          if (config.maxDelay == temp.isUse++) {
            temp.isUse = false
          }
        }
        //不再滚动且达到停止条件
        else {
          temp.userY = temp.scrollEnd - temp.scrollFirst

        /*调整到整数*/
        temp.iCount = oCont.scrollTop() / temp.liHei

        //小滑动,正方向(右/下)
        if (config.minMove < temp.userY && temp.userY < temp.liHei) {
          temp.iCount = Math.ceil(temp.iCount)
        }
        //小滑动,反方向(左/上)
        else if (-temp.liHei < temp.userY && temp.userY < -config.minMove) {
          temp.iCount = Math.floor(temp.iCount)
        }
        //大滑动,或者小于触发距离的碰触
        else {
          temp.iCount = Math.round(temp.iCount)
        }

          //动画
          animate(temp.iCount)

        //选中间项--条件:如果选中项不在视野范围内 此句依赖于现有的html结构
          temp.checked = oLi.find('input:checked').parent().index()

          if(temp.iCount> temp.checked || temp.checked >= (temp.iCount+config.maxDiv)){
          temp.actNum = temp.iCount + Math.ceil(config.maxDiv/2)-1
          oLi.eq(temp.actNum).trigger('choose')
          }

          //重置
          clearInterval(interval);
          interval = null;
          temp.isScrollFirst = true
        }
      }
      temp.scroll = temp.scrollEnd;
    } //monitor循环
  } //slide结束

