/*三个参数,分别是:弹出的元素,触发弹出的元素,外层对象(用来隔离). 都是字符串,并带上类'.'或id'#'的标志*/
/*外层对象是可选参,当页面多次引用时,修改外层wrap名,形成隔离*/

/*推荐的方法是:传两参,把popupEle改名(因为样式缘故,应该是加一个类)*/

var popup = function (popupEle, buttonEle, wrapEle) {
  var btn = $(buttonEle),
    wrap, oPopup;

  /*有传wrap,按wrap形成隔离*/
  if (arguments.length == 3) {
    wrap = $(wrapEle)
    oPopup = wrap.find(popupEle)
  }
  /*没传wrap*/
  else {
    oPopup = $(popupEle)
  }

  btn.click(function () {
    oPopup.show()

    //隐藏
    oPopup.find('.a-confirm').click(function () {
      //$('form').submit()
      oPopup.hide()
    })
    oPopup.find('.a-close').click(function () {
      oPopup.hide()
    })
    oPopup.find('.fixed-bg').click(function () {
      oPopup.hide()
    })
  })

}
