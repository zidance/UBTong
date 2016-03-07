// JavaScript Document
var rootRem = function() {
  var wWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var dpr = window.devicePixelRatio;
  var size = (wWidth < 640 ? wWidth : 640) /  640 * 40;
  document.getElementsByTagName("html")[0].style.fontSize = size + "px";
}
window.addEventListener('DOMContentLoaded', rootRem);
window.addEventListener('resize', rootRem);


//    var photoImgUrl = '';

//    $('.post-title').on('change','input[type="file"]',function(e){
//      //取到的value并非实际路径,用于src也无效
////      console.log($(this).attr('value'))
//      
//      var src = URL.createObjectURL(e.target.files[0])
////      console.log($(e).get(0).target.files[0])
//      
//      //用户取消时src为undefined
//      if(src){
//      $(this).parent('.p-upload').before('<p data-src="'+src+'"><img src="'+src+'" /></p>')
//      
//      img('.stn-appraise','p[data-src="'+src+'"]')
//      }
//    })