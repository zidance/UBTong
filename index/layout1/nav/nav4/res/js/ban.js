// JavaScript Document
var act=0,
	a=document.getElementById('navpager').getElementsByTagName('a');
	
for(var i=0;i<a.length;i++){
	(function(){
		var j=i;
		a[i].onclick=function(){
			t2.slide(j);
			return false;
		}
	})();
}
var t2=new TouchSlider({id:'navsliderlist', speed:600, timeout:6000, before:function(index){
		a[act].className='';
		act=index;
		a[act].className='act';
	}});