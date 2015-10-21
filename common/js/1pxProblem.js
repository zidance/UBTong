$(function(){
	var _all=$('*');
	for(var i=0; i<_all.length;i++){
		/*四周都有边框*/

		if(parseInt(_all.eq(i).css('border-top-width'))==1&&parseInt(_all.eq(i).css('border-bottom-width'))==1&&parseInt(_all.eq(i).css('border-left-width'))==1&&parseInt(_all.eq(i).css('border-right-width'))==1){
			 var varColor=_all.eq(i).css('border-color');
			 var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-1px');
			
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
			   
			   if(varRadiu=='0px'){
				  $('.border-1px').append("<style>"+sStyleChain+".border-1px::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-1px').append("<style>"+sStyleChain+".border-1px::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }
	
			

			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-1px').css('position','relative');
			};

			/*上下都有边框*/
		}else if(parseInt(_all.eq(i).css('border-top-width'))==1&&parseInt(_all.eq(i).css('border-bottom-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top-bottom');	
			
			   var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
			   
			   if(varRadiu=='0px'){
				  $('.border-top-bottom').append("<style>"+sStyleChain+".border-top-bottom::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-top-bottom').append("<style>"+sStyleChain+".border-top-bottom::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }


			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-top-bottom').css('position','relative');
			};
			
			/*左右都有边框*/
		}else if(parseInt(_all.eq(i).css('border-left-width'))==1&&parseInt(_all.eq(i).css('border-right-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left-right');	
			
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
	
			if(varRadiu=='0px'){
				  $('.border-left-right').append("<style>"+sStyleChain+".border-left-right::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-left-right').append("<style>"+sStyleChain+".border-left-right::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }

			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-left-right').css('position','relative');
			};
			
			/*上面有边框*/
		}else if(parseInt(_all.eq(i).css('border-top-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top');	
			
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
	
			if(varRadiu=='0px'){
				  $('.border-top').append("<style>"+sStyleChain+".border-top::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-top').append("<style>"+sStyleChain+".border-top::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }
			
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-top').css('position','relative');
			};
		}
		
			/*下面有边框*/
		else if(parseInt(_all.eq(i).css('border-bottom-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-bottom');
				
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
	
			if(varRadiu=='0px'){
				  $('.border-bottom').append("<style>"+sStyleChain+".border-top::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-bottom').append("<style>"+sStyleChain+".border-top::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-bottom').css('position','relative');
			};
		}
		
		  /*左面有边框*/
		else if(parseInt(_all.eq(i).css('border-left-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left');	
			
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
	
			if(varRadiu=='0px'){
				  $('.border-left').append("<style>"+sStyleChain+".border-left::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-left').append("<style>"+sStyleChain+".border-left::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-left').css('position','relative');
			};
		}
		
		
		  /*右面有边框*/
		else if(parseInt(_all.eq(i).css('border-right-width'))==1){
			var varColor=_all.eq(i).css('border-color');
			var varRadiu=_all.eq(i).css('border-radius');
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-right');	
			
			var oParents = _all.eq(i).parents();
			   var sStyleChain = '';
			   for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				   sStyleChain += (oParents.get(nTemp).localName+' ')
			   }
	
			if(varRadiu=='0px'){
				  $('.border-right').append("<style>"+sStyleChain+".border-right::after{ border-color:" +varColor+ ";border-radius:0px}</style>");      
			   }else{
				  $('.border-right').append("<style>"+sStyleChain+".border-right::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "}</style>");         
			   }
			if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				$('.border-right').css('position','relative');
			};
		}
		
		
	}	
})