/*container为大外层,规定需要调整图片的大范围,最好是独一的元素而不是像'li'这样的重复元素; wrap为紧紧包裹img的外层容器*/
/*
其它说明:1/ajax后的图片不自动调整,需要在ajax后再次调用img(...)
2/scale,未引入该参,规定缩放形式*/
function img(container, imgwrap, scale) {
  var container = $(container)
  var imgwrap = container.find(imgwrap)

  container.find(imgwrap).each(function () {
    var nWidth = $(this).width()
      //遗憾的是load参数无法做成代理,所以对ajax无力
    $(this).find('img').on('load', function () {
      var nThisW = $(this).width(),
        nThisH = $(this).height()
        //是否只针对大图处理,当前为否
        //        if(nThisW > nWidth || nThisH > nWidth){
      if (nThisW > nThisH) {
        $(this).css('height', nWidth)
      } else {
        $(this).css('width', nWidth)
      }
      //        }

      $(this).css('transform', 'translate(-50%,-50%)')

    })
  })
}
