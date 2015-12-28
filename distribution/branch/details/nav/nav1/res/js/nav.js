var $$ = jQuery;

$$(function () {
    var config = {
            minX: 20, //最小触发位移
            maxDiv: 4, //可见块数
        },
        oNav = $$('.n-shops'),
        oLeft = oNav.find('.a-left'),
        oRight = oNav.find('.a-right'),
        oSwiper = oNav.find('.d-swiper'),
        oUl = oSwiper.find('ul'),
        oLi = oSwiper.find('li'),
        nLiWid = oSwiper.width() / config.maxDiv + 1,
        //+1是为兼容微信
        //    一行容纳四个导航块;
        iCount = 0, //第N个滑块
        temp = {}

    //与lists模块的交互脚本
    if ($$('.stn-lists').length) {
        var lists = $$('.stn-lists').find('ul')
        for (var k = oLi.length - 1; k--; k >= 0) {
//            oLi.eq(k).on('click', {index: k}, function (e) {
            oLi.eq(k).on('click',  function (e) {
                e.preventDefault()
                oLi.removeClass('act')
                $$(this).addClass('act')
                //没找到,伪ajax
                var tempClass = 'ul-'+($$(this).index('li')+1)
//                var tempClass = 'ul-' + (e.data.index + 1)
                if ($$('.stn-lists').find('.' + tempClass).length == 0) {
                    var tempNode = lists.eq(0).clone()
                    tempNode.class = tempNode.attr('class').replace(/ul-\d+/, tempClass)
                    tempNode.attr('class', tempNode.class)
                    $$('.stn-lists').append(tempNode)
                }
                //显隐 //因为有新加载的ul重新获取
                $$('.stn-lists').find('ul').hide();
                $$('.stn-lists').find('.' + tempClass).show()
            })
        }
    }



    var touchX = []; //touch事件X坐标集

    oLi.width(nLiWid)
    oUl.width(oLi.length * nLiWid)
    temp.maxRight = -(oLi.length - 4) * nLiWid


    var slide = function (num) {
            oUl.stop(true, true)
            oUl.animate({
                'left': nLiWid * num
            })
        }
        //左btn
    oLeft.on('tap click', function left() {
            if (iCount < 0 && iCount >= -oLi.length + config.maxDiv)
                slide(++iCount)
        })
        //右btn
    oRight.on('tap click', function right() {
        if (iCount <= 0 && iCount > -oLi.length + config.maxDiv)
            slide(--iCount)
    })

    oSwiper[0].addEventListener("touchstart", function (event) {
        temp.first = event.touches[0].clientX

    });

    oSwiper[0].addEventListener("touchmove", function (event) {
            //        oSwiper[0].removeEventListener('touchmove')

            event.preventDefault() //微信等touchend无法触发的兼容问题

            temp.left = parseInt(oUl.css('left'))
            touchX[touchX.length] = event.touches[0].clientX

            if (touchX.length > 2) {

                oUl.stop(true, true)
                var x = touchX[touchX.length - 1] - touchX[touchX.length - 2] + temp.left
                if (x > 0) x = 0;
                if (x < temp.maxRight) x = temp.maxRight;
                oUl.animate({
                    'left': x
                })
            }

            //这句(与removeEventListener配合),可解决闪屏,优化性能?
            //        setTimeout(function(){
            //            oSwiper[0].addEventListener("touchmove");
            //        },300)

        })

    //触摸结束处理,主要是判断所在区间,按整数块显示分级内容
    oSwiper[0].addEventListener("touchend", function (event) {

        temp.left = parseInt(oUl.css('left'))
        temp.last = event.changedTouches[0].clientX || event.touches[0].clientX
        temp.ltof = temp.last - temp.first
        iCount = temp.left / nLiWid


        //滑动距离小于一格分块的距离,又大于设定的最小距,当作滑一格
        //小右滑
        if (config.minX < temp.ltof && temp.ltof < nLiWid) {
            iCount = Math.ceil(iCount)
        }
        //小左滑
        else if (-nLiWid < temp.ltof && temp.ltof < -config.minX) {
            iCount = Math.floor(iCount)
        }
        //大滑动,或者小于触发距离的碰触
        else {
            iCount = Math.round(iCount)
        }
        slide(iCount)

        //重置
        touchX = [];


    });






})
