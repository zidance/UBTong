// JavaScript Document
var active = 0;

//按图片的数量增加导航点
var a = '<a href="###"></a>'
$('#pagenavi').empty()
for (nu = $('.slider').find('img').length - 1; nu >= 0; nu--) {
    $('#pagenavi').append(a)
}
$('#pagenavi').find('a').first().addClass('active')


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
    speed: 600,
    timeout: 6000,
    before: function (index) {
        as[active].className = '';
        active = index;
        as[active].className = 'active';
    }
});