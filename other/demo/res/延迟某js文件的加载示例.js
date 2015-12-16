延迟某js文件的加载示例
<script>
    //涉及到input元素的浏览器默认样式,将default.js延后
    var $$=jQuery;
    setTimeout(function(){
    $$('head').append('<script src="../../../common/js/default.js">')
    },5000)
</script>
