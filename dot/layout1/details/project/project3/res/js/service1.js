// JavaScript Document
/*加减*/
function Settlement(){
	var _obj = $('.edit');
	var _reduct = _obj.find('.red');
	var _add = _obj.find('.add');
	var _inp = _obj.find('.num');
	var _sum = 0;
	var _num = 0;
	var _fixb = $('#fix-bottom');
	$.each(_add,function(i,e){
		var _this = $(e);
		_this.click(function(){
			var _parent = _this.parent('.edit');
			var _price = _parent.prev('.p-price').html();
			_price = _price.replace(/￥/gm,'');
			if(_parent.hasClass('show')){
				var _n = parseInt(_parent.find('.num').html());
				_parent.find('.num').html(function(){
					return _n+1;
				})
			}else{
				_parent.find('.red').show();
				_parent.find('.num').show();
				_parent.find('.num').html(1);
				_parent.addClass('show');
			}
			setSumMoney();
		})

	})

	$.each(_reduct,function(i,e){
		var _this = $(e);
		_this.click(function(){
			var _parent = _this.parent('.edit');
			var _n = parseInt(_parent.find('.num').html());
			if(_n != 1){
				_parent.find('.num').html(function(){
					return _n-1;
				})
			}else{
				_parent.find('.red').hide();
				_parent.find('.num').hide();
				_parent.find('.num').html(0);
				_parent.removeClass('show');
			}
			setSumMoney();
		})
	})

	function setSumMoney(){
		_sum = 0;
		_num = 0;
		$.each(_obj,function(i,e){
			var _this = $(e);
			var _price = _this.prev('.p-price').html();
			_price = _price.replace(/￥/gm,'');
			var _n = parseInt(_this.find('.num').html());
			var _total = _price * _n;
			_sum = _total + _sum;
			_num = _num + _n;

		})
		if(_num >= 1){
			_fixb.show();
			_fixb.find('.info').html(_num);
			_fixb.find('.sum').html('￥'+_sum);

		}else{
			_fixb.hide();
		}
	}

}




function setScrollLeft(){
  var _h = $(window).height();
	var _t= $('.p-service').offset().top;
  //没有footer的页面-null,自动转-0,也不会产生错误
	var _hei = _h-_t-$('footer').height();
	//$('.left-service').css('top',_t);
	$('.p-service').height(_hei);
//
//	var _h = $(window).height();
//	var _t= $('.right-service').offset().top;
//	if( $('.right-service').height()>(_h-_t)){
//		$('.right-service').css({'height':_h-_t,'overflow-y':'auto'});
//	}else{
//		$('.right-service').css({'height':_h-_t+100,'overflow-y':'hidden'});
//	};
//
//	if( $('.left-service').height()>(_h-_t)){
//		$('.left-service').css({'height':_h-_t,'overflow-y':'auto'});
//	}else{
//		$('.left-service').css({'height':_h-_t,'overflow-y':'hidden'});
//		$('.left-service ul').css({'height':_h-_t,'overflow-y':'hidden'});
//	};
};

$(function(){
  setScrollLeft()
 /*判断滚动停止的变量设定*/
	var topValue = 0, // 上次滚动条到顶部的距离
		interval = null; // 定时器
  
  
var c= console.log.bind(console)

	/*判断滚动停止*/
	var listenScroll = function(){

		if (interval == null)
			interval = setInterval(scrollEnd, 300); //判定间隔时
	}
	var _length = $('.left-service li').length;
	c(_length);
  
  var n = 0,winHei = $(window).height()
	var scrollEnd = function() {
		// 判断此刻到顶部的距离是否和之前的距离相等
      if ($('.right-service').scrollTop() == topValue) {
        
        c('停止')
        //此处停止
		clearInterval(interval);
		interval = null;
        c(n)
        
        
        for(i = _length;i >=1; i--){
				var _top = $('#a'+i).offset().top-$('.right-service').offset().top
          c($('#a'+i).offset().top-$('.right-service').offset().top)
          
				if(_top <= 0){
                  $('.left-service li').removeClass('act');
				  $('#a'+i+i).addClass('act');
                  c(i)
                  break;
				}
          
		}
      }
      topValue = $('.right-service').scrollTop();
      
	}

	$('.right-service').on('scroll',listenScroll)
//      $('.right-service').trigger('scroll');

	
    
    
    var liShow = function(){
      var temp = n+15,temp1 = $('.right-service li').length
    for(;n<temp&&n<temp1-1;n++){
      $('.right-service li').eq(n).show()
    }
    }
    liShow()
	$('.right-service').on('touchstart',function(){
		if(n>9&&$('.right-service li').eq(n-9).offset().top<winHei){
          liShow()
        }	
		$('.right-service').on('scroll',listenScroll);
		
	})
	
	
	$('.left-service li').click(function(i,e){
		$('.right-service').off('scroll',listenScroll)
		
			$('.left-service li').removeClass('act');
			$(this).addClass('act');	
		var i = $(this).index()+1;
		//c(i);
		
		//$('.right-service').trigger('touchstart');
//		setTimeout(function(){
//			$(this).trigger('click')	
//		},2500)
		for(;i>0;i--){
			$('.right-service .pro').eq(i).find('li').show();	
		}
	
	
		//$('.right-service').on('scroll',listenScroll)
	})
	
})
