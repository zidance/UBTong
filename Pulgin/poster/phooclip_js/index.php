<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="format-detection" content="telephone=no, email=no" />
	<title> jquery.photoclip.js(jquery图标裁剪插件)  -- 当易网</title>
	<link rel="stylesheet" type="text/css" href="css/normalize.css" />
	<link rel="stylesheet" type="text/css" href="css/default.css">
    <link rel="stylesheet" type="text/css" href="../../../common/css/main.css"  />
    <script src="../../../common/res/js/main.js" type="text/javascript"></script>
	<style>
	#clipArea {
		margin: 0 auto;
		height: 500px;
	}
	#view {
		margin: 0 auto;
		width: 200px;
		height: 200px;
	}
	</style>
	<!--[if IE]>
		<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body ontouchstart="">

	<article class="htmleaf-container">
		<div id="clipArea"></div>
        <button id="upload2">取消</button>
        <button id="clipBtn">确认</button>
		<!--<div id="view"></div>-->
		<div class="d-bg-bottom" id="d-bg-bottom"></div>	
        <img class="img-logo" src="../res/img/logo.png" id="logo" />	
        <img class="img-qrcode" src="../res/img/qrcode.png" id="qrcode" />
        <div class="d-text" id="d-text" style="position:absolute; z-index:999; text-align:left; bottom:0;pointer-events: none;">
           <!--默认字体为微软雅黑-->
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:39px;line-height:1;margin-bottom:.6rem; color: #db4a12;">生一个女儿</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:29px;line-height:32px; color: #db4a12; margin:0;">一直被叫岳父</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:29px;line-height:32px; color: #db4a12; margin:0">一直被叫岳父</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:29px;line-height:32px; color: #db4a12; margin:0">一直被叫岳父</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:39px;line-height:1;margin-top:.575rem;margin-bottom:.1rem; color: #db4a12;">那又怎样</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:29px;line-height:32px; color: #db4a12; margin:0">我就是我</p>
            <p style="font-family:'microsoft yahei'; font-weight:bold; font-size:29px;line-height:32px; color: #db4a12; margin:0">CRC职业赛车手</p>
        </div>
	</article>
	<input type="hidden" id="photo" value="../res/img/avatar.jpg" />
	<script src="http://libs.useso.com/js/jquery/2.1.1/jquery.min.js" type="text/javascript"></script>
	<script>window.jQuery || document.write('<script src="js/jquery-2.1.1.min.js"><\/script>')</script>
	<script src="js/iscroll-zoom.js"></script>
	<script src="js/hammer.js"></script>
	<script src="js/jquery.photoClip.js"></script>
	<script>
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	//alert($('#photo').val().length)
	var body_width = $(window).width();
    var body_height = $(window).height();
	$('#d-text').css({'left':(body_width - body_width*0.82)/2+10,'bottom':(body_height*0.8715 - body_height*0.8715 * 0.893)*0.5+body_height*0.1285+12})
    $('#d-bg-bottom').css({'left':(body_width - body_width*0.82)/2,'bottom':(body_height*0.8715 - body_height*0.8715 * 0.893)*0.5+body_height*0.132})
    $('#logo').css({'left':(body_width - body_width*0.82)/2+10,'top':(body_height*0.8715 - body_height*0.8715 * 0.893)*0.5+8})
	$('#qrcode').css({'right':(body_width - body_width*0.82)/2+10,'bottom':(body_height*0.8715 - body_height*0.8715 * 0.893)*0.5+body_height*0.2})
	
	$("#clipArea").height(body_height*0.8715)
	$("#clipArea").photoClip({
		width: body_width*0.82,
		height: body_height* 0.8715 * 0.893,
		file: "#photo",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			console.log(dataURL);
		}
	});
	</script>
</body>
</html>