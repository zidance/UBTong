// JavaScript Document
function setScrollLeft(){
	var _h = $(window).height();
	var _t= $('.p-service').offset().top;
  //没有footer的页面-null,自动转-0,也不会产生错误
	var _hei = _h-_t-$('footer').height();
	//$('.left-service').css('top',_t);
	$('.p-service').height(_hei);

	//if( $('.right-service').height()>(_h-_t)){
//		$('.right-service').css({'height':_h-_t,'overflow-y':'auto'});
//	}else{
//		$('.right-service').css({'height':_h-_t,'overflow-y':'auto'});
//	};
//
//	if( $('.left-service').height()>(_h-_t)){
//		$('.left-service').css({'height':_h-_t,'overflow-y':'auto'});
//	}else{
//		$('.left-service').css({'height':_h-_t,'overflow-y':'hidden'});
//		$('.left-service ul').css({'height':_h-_t,'overflow-y':'hidden'});
//	};

};

function setChange(_id){
	var _obj = $('#'+_id);
	var _li = _obj.find('.left-service li');
	var _service = _obj.find('.right-service .service-items');
	var _item = _service.find('.item');
	_li.eq(0).addClass('act');
	_item.eq(0).show();
	$.each(_li,function(i,e){
		var _this = $(e);
		_this.click(function(){
			_li.removeClass('act');
			$(this).addClass('act');
			_item.hide();
			_item.eq(i).show();
		})
	})


}

//$('.p-service').height() $(window).height()-$('.p-service').offset().top-$('footer').height()

