$(function(){
	var _all=$('*');
	for(var i=0; i<_all.length;i++){
		/*四周都有边框*/
		if(parseInt(_all.eq(i).css('border-top-width'))==1&&parseInt(_all.eq(i).css('border-bottom-width'))==1&&parseInt(_all.eq(i).css('border-left-width'))==1&&parseInt(_all.eq(i).css('border-right-width'))==1){
			// var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-1px');
			//$('.border-1px').css('border-color',varColor);
			//$('.border-1px').append("<style>.border-1px::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-1px').css('position','relative');
			};

			/*上下都有边框*/
		}else if(parseInt(_all.eq(i).css('border-top-width'))==1&&parseInt(_all.eq(i).css('border-bottom-width'))==1){
			//var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top-bottom');	
			//$('.border-top-bottom').append("<style>.border-top-bottom::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-top-bottom').css('position','relative');
			};
			
			/*左右都有边框*/
		}else if(parseInt(_all.eq(i).css('border-left-width'))==1&&parseInt(_all.eq(i).css('border-right-width'))==1){
			//var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left-right');	
			//$('.border-left-right').append("<style>.border-left-right::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-left-right').css('position','relative');
			};
			
			/*上面有边框*/
		}else if(parseInt(_all.eq(i).css('border-top-width'))==1){
			//var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top');	
			//$('.border-top').append("<style>.border-top::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-top').css('position','relative');
			};
		}
		
			/*下面有边框*/
		else if(parseInt(_all.eq(i).css('border-bottom-width'))==1){
			//var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-bottom');	
			//$('.border-bottom').append("<style>.border-bottom::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-bottom').css('position','relative');
			};
		}
		
		  /*左面有边框*/
		else if(parseInt(_all.eq(i).css('border-left-width'))==1){
			//var varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left');	
			//$('.border-left').append("<style>.border-left::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-left').css('position','relative');
			};
		}
		
		
		  /*右面有边框*/
		else if(parseInt(_all.eq(i).css('border-right-width'))==1){
			//varColor=_all.eq(i).css('border-color');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-right');	
			//$('.border-right').append("<style>.border-right::after{ border-color:" +varColor+ "}</style>");
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-right').css('position','relative');
			};
		}
		
		
	}	
})