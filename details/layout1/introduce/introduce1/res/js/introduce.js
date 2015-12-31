
$(function () {

    var _obj = $('#DetailsIntroduce');
    var _btn = _obj.find('nav a');
    var _item = _obj.find('.introduce-con .introduce-item');

    //商品介绍头部导航切换
    _btn.each(function (i) {
        $(this).on('tap click', {
            data: i
        }, function () {
            _btn.removeClass('color');
            $(this).addClass('color');
            _item.hide();
            _item.eq(i).show()
        })
    })

    //为兼容评价页的图片显示脚本
    _btn.first().trigger('click')
        //第一次点评价时,执行图片尺寸脚本
    var oBtnAppraise = _obj.find('.btn-appraise')
    oBtnAppraise.one('click', function (e) {
      //图片尺寸
      img('.appraise-img','span')
        e.preventDefault();
    })

    //评价 加载更多交互
    var appraise = _obj.find('.appraise')
    appraise.find('.a-intgbook').on('tap click',function(){
        appraise.find('ul').append(appraise.find('li').first().clone())
        //ajax后的图片再触发一次调整;
        //img('.appraise-img','span')
    })

})


    /*全屏展示大图开与关*/
    $('.details-introduce').on('click tap','.appraise-img span', function () {
        $('.stn-mask-layer').show()
    })
    $('.imgzoom_pack').on('click tap', function () {
        $('.imgzoom_pack').hide();
        $('.stn-mask-layer').hide()
    })


/*全屏可缩放大图初始化对象 ,依赖于第三方touchzoom.js*/
document.addEventListener("DOMContentLoaded", function (event) {
    ImagesZoom.init({
        "elem": ".appraise-img"
    });
}, false);
