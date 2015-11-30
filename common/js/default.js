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
$(function () {

  var _all = $('*'),
    aPosition = ['top', 'right', 'bottom', 'left']

  $('head').append('<style id="fix-1px" rel="stylesheet" type="text/css">');

  /*获取祖先元素链,加强优先级*/
    var getParents = function(obj) {
      var oParents = obj.parents()
      sStyleChain = '';
      for (var nTemp = oParents.length - 1; nTemp >= 0; nTemp--) {
        var sClassName = '';
        if (oParents.get(nTemp).className) {
          sClassName = oParents.get(nTemp).className;
          if (sClassName.indexOf(" ") > -1) {
            sClassName = sClassName.replace(/ /g, '.');
          }
          sStyleChain += (oParents.get(nTemp).localName + '.' + sClassName + ' ');
        } else {
          sStyleChain += (oParents.get(nTemp).localName + ' ');
        }
      }
    }

    /*判断定位*/
    var getPosition = function(obj) {
      if (obj.css('position') != 'fixed' && obj.css('position') != 'absolute') {
        obj.css('position', 'relative');
      }
    }


  for (var i = _all.length - 1; i >= 0; i--) {

    var oThis = _all.eq(i);
    var sStyleText = '';
    var sStyleChain = '';


    /*样式收集与写属性 参数表是否四方向*/
    var writeStyle = function (isAllSides) {
      var iCount = 1;
      //元素border的方向循环
      for (var k = 3; k >= 0; k--) {
        if (oThis.css('border-' + aPosition[k] + '-width') != '0px') {//无定义时也是返0px

          var sBorder = 'border-' + aPosition[k];
          var sBorderAttr = oThis.css(sBorder);


          //祖先元素链,只有在第一次发现某方向上有border时执行
          if (iCount == 1) {
            iCount = 0
            getPosition(oThis)
            getParents(oThis)
          }

          //样式收集
          sStyleText += sBorder + ':' + sBorderAttr + ';'
        }

        //跳出四方向循环前,写入样式
        if (k == 0 && iCount != 1) {
          if (isAllSides) { //四边时多处理圆角情况

            var sRadius = oThis.css('border-radius');

            /*px翻倍才能保证缩放后与原容器稳合,百分比的不变*/
            if (!(/%/.test(sRadius)) && window.devicePixelRatio >= 1.5) {
              sRadius = sRadius.replace(/\d/, Number(sRadius.match(/\d/)) * 2)
            }
            if (sRadius != '0px') {
              sStyleText += 'border-radius:' + sRadius + ';'
            }
          }

          /*写入元素计数器,以免li:last-child 之类的影响到同级元素*/
            $('#fix-1px').prepend('\n' + sStyleChain + '.fix-border' + i + '::after{' + sStyleText + '}')
          oThis.addClass('fix-border' + i + ' border');
          oThis.css('border', 'none')
        }
      }
    }

    /*四面有border*/
    if (oThis.css('border-width') == '1px') {
      writeStyle(true)
    }
    //非四面都有border,包括无border
    else {
      writeStyle(false)
    }


  }

})
