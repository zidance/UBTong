/**
 * 模块说明：
 * @hover 按钮点击脚本
 */
$(function () {
  document.body.addEventListener('touchstart', function () {});
})


function changeLeftNav() {
  var _info = $('.information');
  var _ul = _info.find('.info-ul');
  var _li = _ul.find('li');
  $.each(_li, function (i, e) {
    $(this).click(function () {
      $('.info-ul a').removeClass('act');
      $(this).find('a').addClass('act');
    })
  })
}



/**
 * 模块说明：
 * @1pxProblem 移动端1px脚本
 * 由于移动端边框细化需要,动态加入的元素不会自动细化,需要调用fixBorder(area)函数,
 //参数表检索范围,其内节点都会被检查是否有边框,有则进行细化,可以只传自身
 fixBorder($(this))
 //开放 .noFixBorder 类,该元素范围下的节点不进行border细化
 */
$(function () {

  window.fixBorder = function (area) {

    if (typeof area === 'undefined') {
      area = 'html'
    }

    this.numNode = this.numNode || 0
    if (this.numNode === 0)
      $('head').append('<style id="fix-1px" rel="stylesheet" type="text/css">');

    //节点范围中排除noFixBorder
    var _all = $(area).find('*').not('.noFixBorder *').add(area),
      aPosition = ['top', 'right', 'bottom', 'left']

    //重置时需写范围,不要用'html'可用'body',否则针对所有元素removeClass开销太大
    if (area !== 'html') {
      _all.removeClass('bd')
    }

    /*获取祖先元素链,加强优先级*/
    var getParents = function (obj) {
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

    //对每个元素的操作函数 /*样式收集与写属性*/
    var everyNode = function () {
      var sStyleText = '';
      var sStyleChain = '';
      var iCount = 1,
        sRadius = '';

      //元素border的方向循环
      for (var k = 3; k >= 0; k--) {

        //border-width遍历
        if (oThis.css('border-' + aPosition[k] + '-width') != '0px') { //无定义时也是返0px
          var sBorder = 'border-' + aPosition[k];
          var sBorderAttr = oThis.css(sBorder);
          //祖先元素链,只有在第一次发现某方向上有border时执行
          if (iCount == 1) {
            iCount = 0
            getParents(oThis)
          }
          //样式收集
          sStyleText += sBorder + ':' + sBorderAttr + ';'
        }

        //border-radius遍历
        switch (k) {
        case 3:
          sRadius = 'border-top-left-radius';
          break;
        case 2:
          sRadius = 'border-top-right-radius';
          break;
        case 1:
          sRadius = 'border-bottom-left-radius';
          break;
        default:
          sRadius = 'border-bottom-right-radius';
          break;
        }
        if (oThis.css(sRadius) != '0px') { //无定义时也是返0px
          var sRadiusAttr = oThis.css(sRadius);
          /*px翻倍才能保证缩放后与原容器稳合,百分比的不变*/
          if (!(/%/.test(sRadiusAttr)) && window.devicePixelRatio >= 1.5) {
            sRadiusAttr = sRadiusAttr.replace(/\d*/, Number(sRadiusAttr.match(/\d*/)) * 2)
          }
          sStyleText += sRadius + ':' + sRadiusAttr + ';'

          if (iCount == 1) {//弥补无border但有border-radius的无素
            iCount = 0
            getParents(oThis)
          }
        }

        //跳出四方向循环前,写入样式
        if (k == 0 && iCount == 0) {
          /*写入元素计数器,以免li:last-child 之类的影响到同级元素*/
          this.numNode += i
          $('#fix-1px').append('\n' + sStyleChain + '.fix-border-' + this.numNode + '::after{' + sStyleText + '}')
          oThis.addClass('bd fix-border-' + this.numNode);
        }
      }

    }

    //遍历元素
    for (var i = _all.length - 1; i >= 0; i--) {
      var oThis = _all.eq(i);
      everyNode()
    }

  }
  fixBorder()
})



//切换
function switchObj(_id) {
  var _obj = $('#' + _id);
  var _a = _obj.find('li a');
  $.each(_a, function (i, e) {
    var _this = $(e);
    _this.click(function () {
      _a.removeClass('act');
      $(this).addClass('act');
    })
  })
}

$(window).on("resize", function (e) {
  var wWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var dpr = window.devicePixelRatio;
  //alert(dpr);
  var size = (wWidth < 640 ? wWidth : 640) / 640 * 40;
  //alert(size);
  document.getElementsByTagName("html")[0].style.fontSize = size + "px";
}).trigger("resize");
