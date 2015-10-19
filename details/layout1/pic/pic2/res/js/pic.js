/*轮播图效果*/
//按图片的数量增加导航点
var a = '<a href="###"></a>'
$('#pagenavi').empty()
for (nu = $('.slider').find('img').length - 1; nu >= 0; nu--) {
  $('#pagenavi').append(a)
}
$('#pagenavi').find('a').first().addClass('active')

var active = 0,
  as = document.getElementById('pagenavi').getElementsByTagName('a');

for (var i = 0; i < as.length; i++) {
  (function () {
    var j = i;
    as[i].onclick = function () {
      t2.slide(j);
      return false;
    }
  })();
}
var t2 = new TouchSlider({
  id: 'sliderlist',
  speed: 60,
  timeout: 6000,
  before: function (index) {
    as[active].className = '';
    active = index;
    as[active].className = 'active';
  }
});

/*轮播图效果-end*/

/*弹出放大效果*/
function imgSize(wrap, isFullScreen) {
  var wrap = $(wrap),
    wrapWid = wrap.width(),
    oImg = $(wrap).find('img'),
    /*原图比例,设计稿宽/高*/
    nWidHei = 640 / 300;

  //如果允许任意宽高比的图片,执行该循环,nWidHei按宽高比最小的图
  for (var i = oImg.length - 1; i >= 0; i--) {
    var temp = oImg.eq(i).width() / oImg.eq(i).height();
    if (temp < nWidHei)
      nWidHei = temp;
  }


  if (isFullScreen)
    wrap.width(window.innerWidth);

  wrap.height(wrap.width() / nWidHei); //设容器高
  var wrapHei = wrap.height();



  oImg.each(function () {
    thisImg = $(this)

    if (isFullScreen) {
      thisImg.height('auto')
      thisImg.width('auto')
    }

    var thisHei = thisImg.height(),
      thisWid = thisImg.width(),
      thisWidHei = thisWid / thisHei;
    //                如果不nWidHei不是循环所得,而是依设计稿为最小值的话,并且小图不放大,图片采用下面的尺寸
    //                if (thisWidHei < nWidHei && thisHei < wrapHei) {
    //                    //小图,不缩放
    //                    //margin-top与图定位top:50%结合
    //                    thisImg.css('margin-top', '-'+(thisHei.offsetHeight/2)+'px')
    //                } else if (thisWidHei >= nWidHei) {
    //                    //超出的大图,宽高比大于原图,按宽标准填充
    //                    thisImg.width(wrapWid)
    //                    //上下居中
    //                    thisHei = thisImg.height(); //再获取
    //                    thisImg.css('margin-top', '-'+(thisHei.offsetHeight/2)+'px')
    //                } else {
    //                    //超出的大图,宽高比小于原图,按高标准填充
    //                    thisImg.height(wrapHei)
    //                }

    
    //目前采用大小图都缩放,按宽=容器宽处理,设宽后高度不写(auto)即可
    //这种情况下 nWidHei是遍历所有图片后的最小值,thisWidHei 必大于等于 nWidHei,不作比例判断
    thisImg.width(wrapWid);
    thisHei = thisImg.height(); //重新获取


    if (isFullScreen) {
      //onload后再处理,避免一些错误场景
      thisImg.onload = function(){
//      setTimeout(function () {
        thisHei = oImg.eq(0).height()
        wrapHei = wrap.height()
        wrap.css('margin-top', (window.innerHeight - thisHei) / 2);
//      }, 100)
      }
    } else {
      thisImg.css('margin-top', (wrapHei - thisHei) / 2);
    }
    
  })

}

window.onload = function () { //如果允许任意宽高比的图片,就需要获取图片后再判定比例,不能用$(function(){})

    imgSize('.slider');

    $('.imgzoom_pack').on('click tap', function (e) {

      $(".banner").show();
      $('.imgzoom_pack').hide();
//轮播继续,t2是banner.js中定义的轮播对象
      t2.play();
    })

    //点击放大
    $('.slider').on('click', 'img', function () {
      //轮播暂停,t2是banner.js中定义的轮播对象
      t2.pause();
//      imgSize('.pinch-zoom' /*, true*/ );

      $(".banner").hide(); //touchslider采用超过屏幕宽度的方法,在手机上是无法被遮罩层盖住的,故hide

    })
  }
  /*弹出放大效果--end*/