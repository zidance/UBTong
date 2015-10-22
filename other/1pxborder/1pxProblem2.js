$(function () {
    var _all = $('*'),
        aPosition = ['left', 'right', 'top', 'bottom'];

    $('head').append('<style id="fix-1px" rel="stylesheet" type="text/css">');

    //元素遍历
    for (var i = _all.length - 1; i >= 0; i--) {
        var oThis = _all.eq(i),
            iCount = 1;
        var sStyleText = '';
        var sStyleChain = '';
        //元素border的方向循环
        for (var k = 3; k >= 0; k--) {

            if (oThis.css('border-' + aPosition[k] + '-width') != '0px') {
                var sBorder = 'border-' + aPosition[k];
                var sBorderAttr = oThis.css(sBorder);

                //祖先元素链,只有在第一次发现某方向上有border时执行
                if (iCount == 1) {
                    iCount = 2

                    var oParents = oThis.parents();
                    sStyleChain = '';


                    for (var nTemp = oParents.length - 1; nTemp >= 0; nTemp--) {
                        var oTemp = oParents.get(nTemp); //定义,并每祖先重置一次

                        sStyleChain += ' ' + oTemp.localName
                    }
                    
//                    sStyleChain += ' ' + oThis[0].tagName + '.' + oThis.className

                }
                
                //样式收集
                sStyleText += sBorder + ':' + sBorderAttr + ';'

            }
            //跳出四方向循环前重置,并写入样式
            if (k == 0 && iCount != 1) {
                iCount = 1;
                $('#fix-1px').append('\n' + sStyleChain + ' .fix-border' + i + '::before{' + sStyleText + '}')//推荐before
                oThis.addClass('border-1px').addClass('fix-border'+i);//只要留border-1px这个类
            }
        }

    }


})
