window.onload=function(){
	document.body.addEventListener('touchstart', function (){}); 	
}


function setHover(_class){
	var _obj = $('.' + _class);
	var _li = _obj.find('li');
	var _a = _li.find('a');
	$.each(_li,function(i,e){
		$(this).click(function(){
			if($(this).find('a').hasClass('noAct')){
			}else{
				_a.removeClass('act');
				$(this).find('a').addClass('act');
			}
		});
	})	
}
