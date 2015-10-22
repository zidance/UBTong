$(function(){
	var _all=$('*');
	for(var i=0; i<_all.length;i++){
		/*四周都有边框*/
		var aPosition = ['left', 'right', 'top', 'bottom'];
		var varColor,varRadiu,oParents,varwidth;
		varColor=_all.eq(i).css('border-color');
		varRadiu=_all.eq(i).css('border-radius');
		varwidth=_all.eq(i).css('border-width');
		
		oParents = _all.eq(i).parents();
		var sStyleChain='';
		
		/*获取父级元素*/
		function getParents(){
			for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				var sClassName='';
				if(oParents.get(nTemp).className){
					sClassName=	oParents.get(nTemp).className;
					sStyleChain += (oParents.get(nTemp).localName+'.'+sClassName+' ');	
				}else{
					sStyleChain += (oParents.get(nTemp).localName+' ');	
				}
			   
		   }
			
		}
		/*加上各自的Class*/
		function AddClass(_borderClass){
		  if(varRadiu=='0px'){
			  _all.eq(i).append("<style>"+sStyleChain+"."+_borderClass+"::before{ border-color:" +varColor+ ";border-width:"+varwidth+";border-radius:0px}</style>");      
		   }else{
			  _all.eq(i).append("<style>"+sStyleChain+"."+_borderClass+"::before{ border-color:" +varColor+ ";border-width:"+varwidth+";border-radius:" +varRadiu+ "}</style>");         
		   } 
		   if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				_all.eq(i).css('position','relative');
			};
	   }
	   
	   function AddClass1(_borderClass){
		  if(varRadiu=='0px'){
				  $('.border-1px').append("<style>"+sStyleChain+".border-top-bottom::after{ border-color:" +varColor+ ";border-radius:0px}"+sStyleChain+".border-top-bottom::before{ border-color:" +varColor+ "};</style>");      
			   }else{
				  $('.border-1px').append("<style>"+sStyleChain+".border-top-bottom::after{ border-color:" +varColor+ ";border-radius:" +varRadiu+ "};"+sStyleChain+".border-top-bottom::before{ border-color:" +varColor+ ";</style>");         
			   }
		   
		   if(_all.eq(i).css('position')=='fixed'||_all.eq(i).css('position')=='absolute'){
			}else{
				_all.eq(i).css('position','relative');
			};
	   }
	   
	   
	   /*判断边的情况*/

		if(varwidth=='1px'){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-1px');
			getParents();
			AddClass('border-1px');   
			/*上下都有边框*/
		}else if(varwidth=='1px 0px'||varwidth=='1px 0px 1px 0px'){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top-bottom');	
			getParents();
			AddClass1('border-top-bottom'); 
			/*左右都有边框*/
		}else if(varwidth=='0px 1px'||varwidth=='0px 1px 0px 1px'){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left-right');	
			getParents();
			AddClass('border-left-right'); 
			/*上面有边框*/
		}else if(parseInt(_all.eq(i).css('border-top-width'))==1){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-top');	
			getParents();
			AddClass('border-top');
			/*下面有边框*/
		}else if(parseInt(_all.eq(i).css('border-bottom-width'))==1){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-bottom');
			getParents();
			AddClass('border-bottom');
			 /*左面有边框*/
		}else if(parseInt(_all.eq(i).css('border-left-width'))==1){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-left');	
			getParents();
			AddClass('border-left');
			/*右面有边框*/
		}else if(parseInt(_all.eq(i).css('border-right-width'))==1){
			_all.eq(i).css('border','none');
			_all.eq(i).addClass('border-right');	
			getParents();
			AddClass('border-right');
		}
		
		
	}	
})