window.onload=function(){
	document.body.addEventListener('touchstart', function (){}); 	
}


function changeLeftNav(){
	var _info=$('.information');
	var _ul=_info.find('.info-ul');
	var _li=_ul.find('li');
	$.each(_li,function(i,e){
		$(this).click(function(){
			$('.info-ul a').removeClass('act');
			$(this).find('a').addClass('act');
		})
	})	
}
