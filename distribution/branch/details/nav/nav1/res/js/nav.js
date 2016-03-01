var $$ = jQuery;
//c = console.log.bind(console)
;(function ($) {

  //$('body').click(function(){console.log('body')})

  var config = {
      minX: 20, //最小触发位移
      maxDiv: 4, //可见块数
    },
    oNav = $$('.n-shops'),
    oLeft = oNav.find('.a-left'),
    oRight = oNav.find('.a-right'),
    oSwiper = oNav.find('.d-swiper'),
    oUl = oSwiper.find('ul'),
    oLi = oSwiper.find('li'),
    nLiWid = oSwiper.width() / config.maxDiv + 1,
    //+1是为兼容微信
    //    一行容纳四个导航块;
    iCount = 0, //第N个滑块
    temp = {}

  oLi.on('click tap', function (e) {
    e.preventDefault()
    oLi.removeClass('act')
    $$(this).addClass('act')

    //与lists模块的交互脚本
    if ($$('.stn-lists').length) {
      //        for (var k = oLi.length - 1; k--; k >= 0) {
      //            oLi.eq(k).on('click', {index: k}, function (e) {


      //没找到,伪ajax
      var tempClass = 'ul-' + ($$(this).index('li') + 1)
        //                var tempClass = 'ul-' + (e.data.index + 1)
      if ($$('.stn-lists').find('.' + tempClass).length == 0) {
        var tempNode = lists.eq(0).clone()
        tempNode.class = tempNode.attr('class').replace(/ul-\d+/, tempClass)
        tempNode.attr('class', tempNode.class)
        $$('.stn-lists').append(tempNode)
      }
      //显隐 //因为有新加载的ul重新获取
      $$('.stn-lists').find('ul').hide();
      $$('.stn-lists').find('.' + tempClass).show()
    }
    //        }
  })



  var touchX = []; //touch事件X坐标集

  oLi.width(nLiWid)
  oUl.width(oLi.length * nLiWid)
    //    temp.maxRight = -(oLi.length - 4) * nLiWid

  //调整到整数块的动画
  var slide = function (num) {
      oSwiper
        .stop(true, true)
        .animate({
          'scrollLeft': num * nLiWid
        })
    }
    //左btn
  oLeft.on('tap click', function left() {
      if (iCount > 0 && iCount <= oLi.length - config.maxDiv)
        slide(--iCount)
    })
    //右btn
  oRight.on('tap click', function right() {
    if (iCount >= 0 && iCount < oLi.length - config.maxDiv)
      slide(++iCount)
  })

  //触摸结束处理,主要是判断所在区间,按整数块显示分级内容
  //    oSwiper[0].addEventListener("touchend", function (event) {
  //
  //        temp.left = parseInt(oUl.css('left'))
  //        temp.last = event.changedTouches[0].clientX || event.touches[0].clientX
  //        temp.ltof = temp.last - temp.first
  //        iCount = temp.left / nLiWid

  //        //滑动距离小于一格分块的距离,又大于设定的最小距,当作滑一格
  //        //小右滑
  //        if (config.minX < temp.ltof && temp.ltof < nLiWid) {
  //            iCount = Math.ceil(iCount)
  //        }
  //        //小左滑
  //        else if (-nLiWid < temp.ltof && temp.ltof < -config.minX) {
  //            iCount = Math.floor(iCount)
  //        }
  //        //大滑动,或者小于触发距离的碰触
  //        else {
  //            iCount = Math.round(iCount)
  //        }
  //        slide(iCount)
  //
  //        //重置
  //        touchX = [];
  //
  //
  //    });


  temp.outLeft = oSwiper.offset().left

  var touchTimeout
    //延时,为了处理大滑动时手离开后仍在滚动的情况
  var fnTouchend = function () {
    touchTimeout = setTimeout(function () {
      iCount = Math.round((temp.outLeft - oUl.offset().left) / nLiWid)
      slide(iCount)
    }, 300)
  }

  oSwiper.on("touchstart", function () {
    //缓解连续滑动的卡顿
    clearTimeout(touchTimeout)
  })

  //微信 听touchend有缺陷,需禁touchmove(这里不允许禁),所以听了touchcancel
  oSwiper.on("touchend touchcancel", function () {
    fnTouchend()
  })


})(jQuery);
