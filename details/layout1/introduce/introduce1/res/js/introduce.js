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
    oBtnAppraise.one('click', function () {
        imgZoomControl();
    })
})


/*图片图片尺寸脚本,大图缩小,小图不放大,定义尺寸,居中靠css*/
function imgZoomControl() {
    var oImgWraps = $('.details-introduce').find('.appraise-img').find('span'),
        nWidth = oImgWraps.eq(0).width();
    oImgWraps.find('img').css({
        'max-width': nWidth,
        'max-height': nWidth
    })

    /*全屏展示大图开与关*/
    oImgWraps.on('tap click', function () {
        $('.stn-mask-layer').show()
    })
    $('.imgzoom_pack').on('click tap', function () {
        $('.imgzoom_pack').hide();
        $('.stn-mask-layer').hide()
    })
}

/*全屏可缩放大图初始化对象 ,依赖于第三方touchzoom.js*/
document.addEventListener("DOMContentLoaded", function (event) {
    ImagesZoom.init({
        "elem": ".appraise-img"
    });
}, false);
