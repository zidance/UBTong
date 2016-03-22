// JavaScript Document
//input 提示框
function setInputFocus(_obj){
	$.each($(_obj),function(i,e){
		var _this = $(e);
		
		if(_this.val() == ''){
			_this.css('color','#afafaf').val(_this.attr('prompt'));
		}else{
			_this.css('color','#414141');
		}
		
		_this.focus(function(){
			_this.css('color','#414141');
			if(_this.val() == _this.attr('prompt')){
				_this.val('');
			}
		}).blur(function(){
			_this.css('color','#414141');
			if(_this.val() == '' || _this.val() == _this.attr('prompt')){
				_this.css('color','#afafaf').val(_this.attr('prompt'));
			}
		});
	})
}

