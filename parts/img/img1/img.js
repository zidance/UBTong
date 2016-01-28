/*container为大外层,规定需要调整图片的大范围,最好是独一的元素而不是像'li'这样的重复元素; wrap为紧紧包裹img的外层容器*/
/*
其它说明:1/ajax后的图片不自动调整,需要在ajax后再次调用img(...)
2/scale,未引入该参,规定缩放形式*/

function img(container, imgwrap, scale) {

  //原来的方法没有对图片是否已加载的判断,不论调整函数放在$(function(){})内外都有问题,升级成图片加载后执行,用img.complete或者判断图片高来达成.
  function imgLoad(img, callback) {
    var timer = setInterval(function () {
      if (img.complete) {
        clearInterval(timer)
        callback()
      }
    }, 200)
  }
  $(container).find(imgwrap).each(function (i) {
    var _wrap = $(this),_this=$(this).find('img')
    //避免未找到图引起的js循环
    if(_this.length){
    //转原生传进去
    imgLoad(_this[0], function () {
      var nWidth = _wrap.width()
        var nThisW = _this.width(),
          nThisH = _this.height()
        //是否只针对大图处理,当前为否(如果只针对大图,纯css即可)
        //if(nThisW > nWidth || nThisH > nWidth){
        if (nThisW > nThisH) {
          _this.css('height', nWidth)
        } else {
          _this.css('width', nWidth)
        }
    //}
    })
    }
  })

}
