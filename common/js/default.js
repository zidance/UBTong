/**
 * 模块说明：
 * @hover 按钮点击脚本
 */
$(function(){
	document.body.addEventListener('touchstart', function (){}); 	
})


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



/**
 * 模块说明：
 * @1pxProblem 移动端1px脚本
 */
$(function(){
	var _all=$('*');
	
	for(var i=0; i<_all.length;i++){	
		/*四周都有边框*/
		var varColor,varRadiu,oParents,varwidth,varstyle;
		varColor=_all.eq(i).css('border-color');
		varRadiu=parseInt(_all.eq(i).css('border-radius'))+5;
		varRadiu=varRadiu+'px';
		varwidth=_all.eq(i).css('border-width');
		varstyle=_all.eq(i).css('border-style');
		var _this=_all.eq(i);
		oParents = _all.eq(i).parents();
		var sStyleChain=''; 
		
		
		/*获取父级元素*/
		function getParents(){
			sStyleChain=''; 
			for(var nTemp = oParents.length-1;nTemp>=0;nTemp--){
				var sClassName='';
				if(oParents.get(nTemp).className){
					sClassName=	oParents.get(nTemp).className;
					if(sClassName.indexOf(" ")> -1){
						sClassName=sClassName.substring( 0, sClassName.indexOf(' '));	
					}
					sStyleChain += (oParents.get(nTemp).localName+'.'+sClassName+' ');	
				}else{
					sStyleChain += (oParents.get(nTemp).localName+' ');	
				}
			}
		}


		/*判断定位*/
		function getPosition(){    
			if(_this.css('position')=='fixed'||_this.css('position')=='absolute'){
			}else{
				_this.css('position','relative');
			};
		}
		
		
		
		
		/*加上各自的Class*/

		function AddTop(_borderClass){
			_this.addClass(_borderClass);
			_this.append("<style>"+sStyleChain+"."+_borderClass+"::before{ background:"+varColor+"}</style>"); 
			getPosition();    
		}
		
		function AddBottom(_borderClass1){
			_this.addClass(_borderClass1);   
			_this.append("<style>"+sStyleChain+"."+_borderClass1+"::after{ background:"+varColor+"}</style>");         
			getPosition();        
		}
		
		function AddLeft(_borderClass2){
			_this.addClass(_borderClass2);
			_this.append("<style>"+sStyleChain+"."+_borderClass2+"::before{ background:"+varColor+"}</style>");         
			getPosition();        
		}
		function AddRight(_borderClass){
			_this.addClass(_borderClass);
			_this.append("<style>"+sStyleChain+"."+_borderClass+"::after{ background:"+varColor+"}</style>");         
			getPosition();        
		}
		function AddBorder(_borderClass){
			_this.addClass(_borderClass);
			if(varRadiu=='0px'){
				_this.append("<style>"+sStyleChain+"."+_borderClass+"::after{ border-color:"+varColor+";border-radius:0px;border-style:"+varstyle+"}</style>");      
			}else{
				_this.append("<style>"+sStyleChain+"."+_borderClass+"::after{ border-color:"+varColor+";border-radius:"+varRadiu+";border-style:"+varstyle+"}</style>");         
			} 
			getPosition();        
		}
		
		/*判断边的情况*/
				
		if(varwidth=='1px'){
			_this.css('border','none');
			getParents();
			AddBorder('trblBor');
		}else{
			if(_this.css('border-top-width')=='1px'){
				_this.css('border-top','none');
				getParents();
				AddTop('tBor');
			}
			if(_this.css('border-bottom-width')=='1px'){
				_this.css('border-bottom','none');
				getParents();
				AddBottom('bBor');
			}
			if(_this.css('border-left-width')=='1px'){
				_this.css('border-left','none');
				getParents();
				AddLeft('lBor');
			}
			
			if(_this.css('border-right-width')=='1px'){
				_this.css('border-right','none');
				getParents();
				AddRight('rBor');
			}
			
		}	
	}	
})