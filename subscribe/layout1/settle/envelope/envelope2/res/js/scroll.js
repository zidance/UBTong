;$(function () {

  //显示
  $('#selectShow').click(function () {
      $(".d-popup").show()
      $('.d-popup-bg').show()
    })
    //隐藏
  $('.d-popup-bg,.d-popup .fr').click(function () {
    $(".d-popup").hide()
    $('.d-popup-bg').hide()
  })

  var oUl = $(".d-popup").find('.choose')
  var oLi = oUl.find('li')
  var nLiHei = oLi.height()
  var nLiLen = oLi.length
  var nLiView = Math.max(Math.floor(oUl.height() / nLiHei), 3) //可见li个数,最小三2个

  //切换红包
  oLi.click(function () {
    oLi.removeClass('active')
    $(this).addClass('active')
  })


  //滚动 如果需要pc端,做scrollEnd的判断较合适
  oUl.on('touchcancel touchend', function () {
    clearTimeout(scrollSetT)
    fnScroll()
  })


  //自动选择
  var scrollSetT
  var nUlHei = oUl.height() - nLiHei / 2
  var fnScroll = function () {
    scrollSetT = setTimeout(function () {
      //激活的红包不在当前屏中,提前半个li的位置判断
      var topTo = oUl.find('li.active').offset().top - oUl.offset().top

      if (topTo < -nLiHei / 2 || topTo > nUlHei) {
        oLi.eq(Math.floor(oUl.scrollTop() / nLiHei + nLiView / 2)).trigger('click')
      }
    }, 300)
  }

})
