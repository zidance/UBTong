;$(function () {
  var oUl = $(".d-popup").find('.choose')
  var oLi = oUl.find('li')
  var nLiHei = parseInt(oLi.css('height'))
  var nLiLen = oLi.length
  var nLiView = Math.max(Math.floor(parseInt(oUl.css('height')) / nLiHei), 3) //可见li个数,最小三2个
  var temp;
  //显示
//  $('.selectShow').click(function () {
//      $(".d-popup").show()
//      $('.d-popup-bg').show()
//  })
var arr = ["与业主的关系","1111","2222"];
  $.each($('.selectShow'),function(i,e){
	   var _this = $(e);
	   _this.click(function(){
			 $(".d-popup").show()
         	$('.d-popup-bg').show(); 
			$('#p-name').html(arr[i]);
			$('.choose').hide();
			$('.choose').eq(i).show();
			oUl = $('.choose').eq(i);
			$('.choose').eq(i).find('li').eq(1).addClass('active');
			$('.selectShow').removeClass('show');
			$(this).addClass('show');
		})
  })
  

	
	
	
    //隐藏
  $('.d-popup-bg,.d-popup .fr').click(function () {
    $(".d-popup").hide()
    $('.d-popup-bg').hide()
  })

  

  //切换红包
  oLi.click(function () {
    oLi.removeClass('active');
    $(this).addClass('active');
  })


  //滚动 如果需要pc端,做scrollEnd的判断较合适
  oUl.on('touchcancel touchend', function () {
    clearTimeout(scrollSetT)
    fnScroll()
  })


  //自动选择
  var scrollSetT
  var nUlHei = parseInt(oUl.css('height')) - nLiHei / 2
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
