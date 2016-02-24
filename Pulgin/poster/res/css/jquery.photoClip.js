/**
 * jQuery photoClip v1.4
 * 渚濊禆鎻掍欢
 * - iscroll-zoom.js
 * - hammer.js
 *
 * @author 鐧戒繆鏉� 625603381@qq.com 2014/07/31
 * https://github.com/baijunjie/jQuery-photoClip
 *
 * @brief	鏀寔鎵嬪娍鐨勮鍥炬彃浠�
 *			鍦ㄧЩ鍔ㄨ澶囦笂鍙屾寚鎹忓悎涓虹缉鏀撅紝鍙屾寚鏃嬭浆鍙牴鎹棆杞柟鍚戞瘡娆℃棆杞�90搴�
 *			鍦≒C璁惧涓婇紶鏍囨粴杞负缂╂斁锛屾瘡娆″弻鍑诲垯椤烘椂閽堟棆杞�90搴�
 * @option_param {number} width 鎴彇閮ㄥ垎鐨勫搴�
 * @option_param {number} height 鎴彇閮ㄥ垎鐨勯珮搴�
 * @option_param {string} file 涓婁紶鍥剧墖鐨�<input type="file">鎺т欢鐨勯€夋嫨鍣ㄦ垨鑰匘OM瀵硅薄
 * @option_param {string} view 鏄剧ず鎴彇鍚庡浘鍍忕殑瀹瑰櫒鐨勯€夋嫨鍣ㄦ垨鑰匘OM瀵硅薄
 * @option_param {string} ok 纭鎴浘鎸夐挳鐨勯€夋嫨鍣ㄦ垨鑰匘OM瀵硅薄
 * @option_param {boolean} strictSize 鏄惁涓ユ牸鎸夌収鎴彇瀹介珮瑁佸壀銆傞粯璁や负false锛岃〃绀烘埅鍙栧楂樹粎鐢ㄤ簬绾︽潫瀹介珮姣斾緥銆傚鏋滆缃负true锛屽垯琛ㄧず鎴彇鍑虹殑鍥惧儚瀹介珮涓ユ牸鎸夌収鎴彇瀹介珮杈撳嚭
 * @option_param {function} loadStart 寮€濮嬪姞杞界殑鍥炶皟鍑芥暟銆倀his鎸囧悜 fileReader 瀵硅薄锛屽苟灏嗘鍦ㄥ姞杞界殑 file 瀵硅薄浣滀负鍙傛暟浼犲叆
 * @option_param {function} loadComplete 鍔犺浇瀹屾垚鐨勫洖璋冨嚱鏁般€倀his鎸囧悜鍥剧墖瀵硅薄锛屽苟灏嗗浘鐗囧湴鍧€浣滀负鍙傛暟浼犲叆
 * @option_param {function} loadError 鍔犺浇澶辫触鐨勫洖璋冨嚱鏁般€倀his鎸囧悜 fileReader 瀵硅薄锛屽苟灏嗛敊璇簨浠剁殑 event 瀵硅薄浣滀负鍙傛暟浼犲叆
 * @option_param {function} clipFinish 瑁佸壀瀹屾垚鐨勫洖璋冨嚱鏁般€倀his鎸囧悜鍥剧墖瀵硅薄锛屼細灏嗚鍓嚭鐨勫浘鍍忔暟鎹瓺ataURL浣滀负鍙傛暟浼犲叆
 */

(function($) {
'use strict';

$.fn.photoClip = function(option) {
	if (!window.FileReader) {
		alert("鎮ㄧ殑娴忚鍣ㄤ笉鏀寔 HTML5 鐨� FileReader API锛� 鍥犳鏃犳硶鍒濆鍖栧浘鐗囪鍓彃浠讹紝璇锋洿鎹㈡渶鏂扮殑娴忚鍣紒");
		return;
	}

	var defaultOption = {
		width: 200,
		height: 200,
		file: "",
		view: "",
		ok: "",
		strictSize: false,
		loadStart: function() {},
		loadComplete: function() {},
		loadError: function() {},
		clipFinish: function() {}
	}
	$.extend(defaultOption, option);

	this.each(function() {
		photoClip(this, defaultOption);
	});

	return this;
}

function photoClip(container, option) {
	var clipWidth = option.width,
		clipHeight = option.height,
		file = option.file,
		view = option.view,
		ok = option.ok,
		strictSize = option.strictSize,
		loadStart = option.loadStart,
		loadComplete = option.loadComplete,
		loadError = option.loadError,
		clipFinish = option.clipFinish;

	var $file = $(file);
	if (!$file.length) return;

	var $img,
		imgWidth, imgHeight, //鍥剧墖褰撳墠鐨勫楂�
		imgLoaded; //鍥剧墖鏄惁宸茬粡鍔犺浇瀹屾垚

	$file.attr("accept", "image/*");
	$file.change(function() {
		if (!this.files.length) return;
		if (!/image\/\w+/.test(this.files[0].type)) {
			alert("鍥剧墖鏍煎紡涓嶆纭紝璇烽€夋嫨姝ｇ‘鏍煎紡鐨勫浘鐗囨枃浠讹紒");
			return false;
		} else {
			var fileReader = new FileReader();
			fileReader.onprogress = function(e) {
				console.log((e.loaded / e.total * 100).toFixed() + "%");
			};
			fileReader.onload = function(e) {
				var kbs = e.total / 1024;
				if (kbs > 1024) {
					// 鍥剧墖澶т簬1M锛岄渶瑕佸帇缂�
					var quality = 1024 / kbs;
					var $tempImg = $("<img>").hide();
					$tempImg.load(function() {
						// IOS 璁惧涓紝濡傛灉鐨勭収鐗囨槸绔栧睆鎷嶆憚鐨勶紝铏界劧瀹為檯鍦ㄧ綉椤典腑鏄剧ず鍑虹殑鏂瑰悜涔熸槸鍨傜洿锛屼絾鍥剧墖鏁版嵁渚濈劧鏄互妯睆鏂瑰悜灞曠ず
						var sourceWidth = this.naturalWidth; // 鍦ㄦ病鏈夊姞鍏ユ枃妗ｅ墠锛宩Query鏃犳硶鑾峰緱姝ｇ‘瀹介珮锛屼絾鍙互閫氳繃鍘熺敓灞炴€ф潵璇诲彇
						$tempImg.appendTo(document.body);
						var realityHeight = this.naturalHeight;
						$tempImg.remove();
						delete $tempImg[0];
						$tempImg = null;
						var angleOffset = 0;
						if (sourceWidth == realityHeight) {
							angleOffset = 90;
						}
						// 灏嗗浘鐗囪繘琛屽帇缂�
						var newDataURL = compressImg(this, quality, angleOffset);
						createImg(newDataURL);
					});
					$tempImg.attr("src", this.result);
				} else {
					createImg(this.result);
				}
			};
			fileReader.onerror = function(e) {
				alert("鍥剧墖鍔犺浇澶辫触");
				loadError.call(this, e);
			};
			fileReader.readAsDataURL(this.files[0]); // 璇诲彇鏂囦欢鍐呭
			//淇濆瓨鏂囦欢鍚�
			$('#hit').attr('fileName',this.files[0].name);
			loadStart.call(fileReader, this.files[0]);
		}
	});

	$file.click(function() {
		this.value = "";
	});



	var $container, // 瀹瑰櫒锛屽寘鍚鍓鍥惧眰鍜岄伄缃╁眰
		$clipView, // 瑁佸壀瑙嗗浘灞傦紝鍖呭惈绉诲姩灞�
		$moveLayer, // 绉诲姩灞傦紝鍖呭惈鏃嬭浆灞�
		$rotateLayer, // 鏃嬭浆灞�
		$view, // 鏈€缁堟埅鍥惧悗鍛堢幇鐨勮鍥惧鍣�
		canvas, // 鍥剧墖瑁佸壀鐢ㄥ埌鐨勭敾甯�
		myScroll, // 鍥剧墖鐨剆croll瀵硅薄锛屽寘鍚浘鐗囩殑浣嶇疆涓庣缉鏀句俊鎭�
		containerWidth,
		containerHeight;

	init();
	initScroll();
	initEvent();
	initClip();

	var $ok = $(ok);
	if ($ok.length) {
		$ok.click(function() {
			$('.lazy_cover,.lazy_tip').show();
			clipImg();
		});
	}

	var $win = $(window);
	resize();
	$win.resize(resize);

	var atRotation, // 鏄惁姝ｅ湪鏃嬭浆涓�
		curX, // 鏃嬭浆灞傜殑褰撳墠X鍧愭爣
		curY, // 鏃嬭浆灞傜殑褰撳墠Y鍧愭爣
		curAngle; // 鏃嬭浆灞傜殑褰撳墠瑙掑害

	function imgLoad() {
		imgLoaded = true;

		$rotateLayer.append(this);

		hideAction.call(this, $img, function() {
			imgWidth = this.naturalWidth;
			imgHeight = this.naturalHeight;
		});

		hideAction($moveLayer, function() {
			resetScroll();
		});


		loadComplete.call(this, this.src);
	}

	function initScroll() {
		var options = {
			zoom: true,
			scrollX: true,
			scrollY: true,
			freeScroll: true,
			mouseWheel: true,
			wheelAction: "zoom"
		}
		myScroll = new IScroll($clipView[0], options);
	}
	function resetScroll() {
		curX = 0;
		curY = 0;
		curAngle = 0;

		$rotateLayer.css({
			"width": imgWidth,
			"height": imgHeight
		});
		setTransform($rotateLayer, curX, curY, curAngle);

		calculateScale(imgWidth, imgHeight);
		myScroll.zoom(myScroll.options.zoomStart);
		refreshScroll(imgWidth, imgHeight);

		var posX = (clipWidth - imgWidth * myScroll.options.zoomStart) * .5,
			posY = (clipHeight - imgHeight * myScroll.options.zoomStart) * .5;
		myScroll.scrollTo(posX, posY);
	}
	function refreshScroll(width, height) {
		$moveLayer.css({
			"width": width,
			"height": height
		});
		// 鍦ㄧЩ鍔ㄨ澶囦笂锛屽挨鍏舵槸Android璁惧锛屽綋涓轰竴涓厓绱犻噸缃簡瀹介珮鏃�
		// 璇ュ厓绱犵殑offsetWidth/offsetHeight銆乧lientWidth/clientHeight绛夊睘鎬у苟涓嶄細绔嬪嵆鏇存柊锛屽鑷寸浉鍏崇殑js绋嬪簭鍑虹幇閿欒
		// iscroll 鍦ㄥ埛鏂版柟娉曚腑姝ｆ槸浣跨敤浜� offsetWidth/offsetHeight 鏉ヨ幏鍙杝croller鍏冪礌($moveLayer)鐨勫楂�
		// 鍥犳闇€瑕佹墜鍔ㄥ皢鍏冪礌閲嶆柊娣诲姞杩涙枃妗ｏ紝杩娇娴忚鍣ㄥ己鍒舵洿鏂板厓绱犵殑瀹介珮
		$clipView.append($moveLayer);
		myScroll.refresh();
	}

	function initEvent() {
		var is_mobile = !!navigator.userAgent.match(/mobile/i);

		if (is_mobile) {
			var hammerManager = new Hammer($moveLayer[0]);
			hammerManager.add(new Hammer.Rotate());

			var rotation, rotateDirection;
			hammerManager.on("rotatemove", function(e) {
				if (atRotation) return;
				rotation = e.rotation;
				if (rotation > 180) {
					rotation -= 360;
				} else if (rotation < -180) {
					rotation += 360  ;
				}
				rotateDirection = rotation > 0 ? 1 : rotation < 0 ? -1 : 0;
			});
			hammerManager.on("rotateend", function(e) {
				if (atRotation) return;

				if (Math.abs(rotation) > 30) {
					if (rotateDirection == 1) {
						// 椤烘椂閽�
						rotateCW(e.center);
					} else if (rotateDirection == -1) {
						// 閫嗘椂閽�
						rotateCCW(e.center);
					}
				}
			});
		} else {
			$moveLayer.on("dblclick", function(e) {
				rotateCW({
					x: e.clientX,
					y: e.clientY
				});
			});
		}
	}
	function rotateCW(point) {
		rotateBy(90, point);
	}
	function rotateCCW(point) {
		rotateBy(-90, point);
	}
	function rotateBy(angle, point) {
		if (atRotation) return;
		atRotation = true;

		var loacl;
		if (!point) {
			loacl = loaclToLoacl($moveLayer, $clipView, clipWidth * .5, clipHeight * .5);
		} else {
			loacl = globalToLoacl($moveLayer, point.x, point.y);
		}
		var origin = calculateOrigin(curAngle, loacl), // 鏃嬭浆涓娇鐢ㄧ殑鍙傝€冪偣鍧愭爣
			originX = origin.x,
			originY = origin.y,

			// 鏃嬭浆灞備互闆朵綅涓哄弬鑰冪偣鏃嬭浆鍒版柊瑙掑害鍚庣殑浣嶇疆锛屼笌浠ュ綋鍓嶈绠楃殑鍙傝€冪偣鈥滀粠闆跺害鈥濇棆杞埌鏂拌搴﹀悗鐨勪綅缃紝涔嬮棿鐨勫乏涓婅鍋忕Щ閲�
			offsetX = 0, offsetY = 0,
			// 绉诲姩灞傚綋鍓嶇殑浣嶇疆锛堝嵆鏃嬭浆灞傛棆杞墠鐨勪綅缃級锛屼笌鏃嬭浆灞備互褰撳墠璁＄畻鐨勫弬鑰冪偣浠庡綋鍓嶈搴︽棆杞埌鏂拌搴﹀悗鐨勪綅缃紝涔嬮棿鐨勫乏涓婅鍋忕Щ閲�
			parentOffsetX = 0, parentOffsetY = 0,

			newAngle = curAngle + angle,

			curImgWidth, // 绉诲姩灞傜殑褰撳墠瀹藉害
			curImgHeight; // 绉诲姩灞傜殑褰撳墠楂樺害


		if (newAngle == 90 || newAngle == -270)
		{
			offsetX = originX + originY;
			offsetY = originY - originX;

			if (newAngle > curAngle) {
				parentOffsetX = imgHeight - originX - originY;
				parentOffsetY = originX - originY;
			} else if (newAngle < curAngle) {
				parentOffsetX = (imgHeight - originY) - (imgWidth - originX);
				parentOffsetY = originX + originY - imgHeight;
			}

			curImgWidth = imgHeight;
			curImgHeight = imgWidth;
		}
		else if (newAngle == 180 || newAngle == -180)
		{
			offsetX = originX * 2;
			offsetY = originY * 2;

			if (newAngle > curAngle) {
				parentOffsetX = (imgWidth - originX) - (imgHeight - originY);
				parentOffsetY = imgHeight - (originX + originY);
			} else if (newAngle < curAngle) {
				parentOffsetX = imgWidth - (originX + originY);
				parentOffsetY = (imgHeight - originY) - (imgWidth - originX);
			}

			curImgWidth = imgWidth;
			curImgHeight = imgHeight;
		}
		else if (newAngle == 270 || newAngle == -90)
		{
			offsetX = originX - originY;
			offsetY = originX + originY;

			if (newAngle > curAngle) {
				parentOffsetX = originX + originY - imgWidth;
				parentOffsetY = (imgWidth - originX) - (imgHeight - originY);
			} else if (newAngle < curAngle) {
				parentOffsetX = originY - originX;
				parentOffsetY = imgWidth - originX - originY;
			}

			curImgWidth = imgHeight;
			curImgHeight = imgWidth;
		}
		else if (newAngle == 0 || newAngle == 360 || newAngle == -360)
		{
			offsetX = 0;
			offsetY = 0;

			if (newAngle > curAngle) {
				parentOffsetX = originX - originY;
				parentOffsetY = originX + originY - imgWidth;
			} else if (newAngle < curAngle) {
				parentOffsetX = originX + originY - imgHeight;
				parentOffsetY = originY - originX;
			}

			curImgWidth = imgWidth;
			curImgHeight = imgHeight;
		}

		// 灏嗚Е鎽哥偣璁句负鏃嬭浆鏃剁殑鍙傝€冪偣
		// 鏀瑰彉鍙傝€冪偣鐨勫悓鏃讹紝瑕佽绠楀潗鏍囩殑鍋忕Щ锛屼粠鑰屼繚璇佸浘鐗囦綅缃笉鍙戠敓鍙樺寲
		if (curAngle == 0) {
			curX = 0;
			curY = 0;
		} else if (curAngle == 90 || curAngle == -270) {
			curX -= originX + originY;
			curY -= originY - originX;
		} else if (curAngle == 180 || curAngle == -180) {
			curX -= originX * 2;
			curY -= originY * 2;
		} else if (curAngle == 270 || curAngle == -90) {
			curX -= originX - originY;
			curY -= originX + originY;
		}
		curX = curX.toFixed(2) - 0;
		curY = curY.toFixed(2) - 0;
		setTransform($rotateLayer, curX, curY, curAngle, originX, originY);

		// 寮€濮嬫棆杞�
		setTransition($rotateLayer, curX, curY, newAngle, 200, function() {
			atRotation = false;
			curAngle = newAngle % 360;
			// 鏃嬭浆瀹屾垚鍚庡皢鍙傝€冪偣璁惧洖闆朵綅
			// 鍚屾椂鍔犱笂鍋忕Щ锛屼繚璇佸浘鐗囦綅缃湅涓婂幓娌℃湁鍙樺寲
			// 杩欓噷瑕佸彟澶栬鍔犱笂鐖跺鍣紙绉诲姩灞傦級闆朵綅涓庤嚜韬箣闂寸殑鍋忕Щ閲�
			curX += offsetX + parentOffsetX;
			curY += offsetY + parentOffsetY;
			curX = curX.toFixed(2) - 0;
			curY = curY.toFixed(2) - 0;
			setTransform($rotateLayer, curX, curY, curAngle);
			// 鐩稿簲鐨勭埗瀹瑰櫒锛堢Щ鍔ㄥ眰锛夎鍑忓幓涓庢棆杞眰涔嬮棿鐨勫亸绉婚噺
			// 杩欐牱鐪嬩笂鍘诲氨濂藉儚鍥剧墖娌℃湁绉诲姩
			myScroll.scrollTo(
				myScroll.x - parentOffsetX * myScroll.scale,
				myScroll.y - parentOffsetY * myScroll.scale
			);
			calculateScale(curImgWidth, curImgHeight);
			if (myScroll.scale < myScroll.options.zoomMin) {
				myScroll.zoom(myScroll.options.zoomMin);
			}

			refreshScroll(curImgWidth, curImgHeight);
		});
	}

	function initClip() {
		canvas = document.createElement("canvas");
		canvas.width = clipWidth;
		canvas.height = clipHeight;
	}
	function clipImg() {
		if (!imgLoaded) {
			alert("亲当前没有图片可裁剪!");
			$('.lazy_cover,.lazy_tip').hide();
			return;
		}
		var local = loaclToLoacl($moveLayer, $clipView);
		var scale = myScroll.scale;
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();

		if (strictSize) {
			ctx.scale(scale, scale);
		} else {
			canvas.width = clipWidth / scale;
			canvas.height = clipHeight / scale;
		}

		ctx.translate(curX - local.x / scale, curY - local.y / scale);
		ctx.rotate(curAngle * Math.PI / 180);

		ctx.drawImage($img[0], 0, 0);
		ctx.restore();

		var dataURL = canvas.toDataURL("image/jpeg");
		$view.css("background-image", "url("+ dataURL +")");
		clipFinish.call($img[0], dataURL);
		$('.lazy_cover,.lazy_tip').hide();
	}


	function resize() {
		hideAction($container, function() {
			containerWidth = $container.width();
			containerHeight = $container.height();
		});
	}
	function loaclToLoacl($layerOne, $layerTwo, x, y) { // 璁＄畻$layerTwo涓婄殑x銆亂鍧愭爣鍦�$layerOne涓婄殑鍧愭爣
		x = x || 0;
		y = y || 0;
		var layerOneOffset, layerTwoOffset;
		hideAction($layerOne, function() {
			layerOneOffset = $layerOne.offset();
		});
		hideAction($layerTwo, function() {
			layerTwoOffset = $layerTwo.offset();
		});
		return {
			x: layerTwoOffset.left - layerOneOffset.left + x,
			y: layerTwoOffset.top - layerOneOffset.top + y
		};
	}
	function globalToLoacl($layer, x, y) { // 璁＄畻鐩稿浜庣獥鍙ｇ殑x銆亂鍧愭爣鍦�$layer涓婄殑鍧愭爣
		x = x || 0;
		y = y || 0;
		var layerOffset;
		hideAction($layer, function() {
			layerOffset = $layer.offset();
		});
		return {
			x: x + $win.scrollLeft() - layerOffset.left,
			y: y + $win.scrollTop() - layerOffset.top
		};
	}
	function hideAction(jq, func) {
		var $hide = $();
		$.each(jq, function(i, n){
			var $n = $(n);
			var $hidden = $n.parents().andSelf().filter(":hidden");
			var $none;
			for (var i = 0; i < $hidden.length; i++) {
				if (!$n.is(":hidden")) break;
				$none = $hidden.eq(i);
				if ($none.css("display") == "none") $hide = $hide.add($none.show());
			}
		});
		if (typeof(func) == "function") func.call(this);
		$hide.hide();
	}
	function calculateOrigin(curAngle, point) {
		var scale = myScroll.scale;
		var origin = {};
		if (curAngle == 0) {
			origin.x = point.x / scale;
			origin.y = point.y / scale;
		} else if (curAngle == 90 || curAngle == -270) {
			origin.x = point.y / scale;
			origin.y = imgHeight - point.x / scale;
		} else if (curAngle == 180 || curAngle == -180) {
			origin.x = imgWidth - point.x / scale;
			origin.y = imgHeight - point.y / scale;
		} else if (curAngle == 270 || curAngle == -90) {
			origin.x = imgWidth - point.y / scale;
			origin.y = point.x / scale;
		}
		return origin;
	}
	function getScale(w1, h1, w2, h2) {
		var sx = w1 / w2;
		var sy = h1 / h2;
		return sx > sy ? sx : sy;
	}
	function calculateScale(width, height) {
		myScroll.options.zoomMin = getScale(clipWidth, clipHeight, width, height);
		myScroll.options.zoomMax = Math.max(1, myScroll.options.zoomMin);
		myScroll.options.zoomStart = Math.min(myScroll.options.zoomMax, getScale(containerWidth, containerHeight, width, height));
	}
	function compressImg(sourceImgObj, quality, angleOffset, outputFormat){
		quality = quality || .8;
		angleOffset = angleOffset || 0;
		var mimeType = "image/jpeg";
		if (outputFormat != undefined && outputFormat == "png") {
			mimeType = "image/png";
		}

		var drawWidth = sourceImgObj.naturalWidth,
			drawHeight = sourceImgObj.naturalHeight;
		// IOS 璁惧涓� canvas 瀹芥垨楂樺鏋滃ぇ浜� 1024锛屽氨鏈夊彲鑳藉鑷村簲鐢ㄥ穿婧冮棯閫€
		// 鍥犳杩欓噷闇€瑕佺缉鏀�
		var maxSide = Math.max(drawWidth, drawHeight);
		if (maxSide > 1024) {
			var minSide = Math.min(drawWidth, drawHeight);
			minSide = minSide / maxSide * 1024;
			maxSide = 1024;
			if (drawWidth > drawHeight) {
				drawWidth = maxSide;
				drawHeight = minSide;
			} else {
				drawWidth = minSide;
				drawHeight = maxSide;
			}
		}

		var cvs = document.createElement('canvas');
		var ctx = cvs.getContext("2d");
		if (angleOffset) {
			cvs.width = drawHeight;
			cvs.height = drawWidth;
			ctx.translate(drawHeight, 0);
			ctx.rotate(angleOffset * Math.PI / 180);
		} else {
			cvs.width = drawWidth;
			cvs.height = drawHeight;
		}

		ctx.drawImage(sourceImgObj, 0, 0, drawWidth, drawHeight);
		var newImageData = cvs.toDataURL(mimeType, quality || .8);
		return newImageData;
	}
	function createImg(src) {
		if ($img && $img.length) {
			// 鍒犻櫎鏃х殑鍥剧墖浠ラ噴鏀惧唴瀛橈紝闃叉IOS璁惧鐨剋ebview宕╂簝
			$img.remove();
			delete $img[0];
		}
		$img = $("<img>").css({
			"user-select": "none",
			"pointer-events": "none"
		});
		$img.load(imgLoad);
		$img.attr("src", src); // 璁剧疆鍥剧墖base64鍊�
	}

	function setTransform($obj, x, y, angle, originX, originY) {
		originX = originX || 0;
		originY = originY || 0;
		var style = {};
		style[prefix + "transform"] = "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)";
		style[prefix + "transform-origin"] = originX + "px " + originY + "px";
		$obj.css(style);
	}
	function setTransition($obj, x, y, angle, dur, fn) {
		// 杩欓噷闇€瑕佸厛璇诲彇涔嬪墠璁剧疆濂界殑transform鏍峰紡锛屽己鍒舵祻瑙堝櫒灏嗚鏍峰紡鍊兼覆鏌撳埌鍏冪礌
		// 鍚﹀垯娴忚鍣ㄥ彲鑳藉嚭浜庢€ц兘鑰冭檻锛屽皢鏆傜紦鏍峰紡娓叉煋锛岀瓑鍒颁箣鍚庢墍鏈夋牱寮忚缃畬鎴愬悗鍐嶇粺涓€娓叉煋
		// 杩欐牱灏变細瀵艰嚧涔嬪墠璁剧疆鐨勪綅绉讳篃琚簲鐢ㄥ埌鍔ㄧ敾涓�
		$obj.css(prefix + "transform");
		$obj.css(prefix + "transition", prefix + "transform " + dur + "ms");
		$obj.one(transitionEnd, function() {
			$obj.css(prefix + "transition", "");
			fn.call(this);
		});
		$obj.css(prefix + "transform", "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)");
	}

	function init() {
		// 鍒濆鍖栧鍣�
		$container = $(container).css({
			"user-select": "none",
			"overflow": "hidden"
		});
		if ($container.css("position") == "static") $container.css("position", "relative");

		// 鍒涘缓瑁佸壀瑙嗗浘灞�
		$clipView = $("<div class='photo-clip-view'>").css({
			"position": "absolute",
			"left": "50%",
			"top": "50%",
			"width": clipWidth,
			"height": clipHeight,
			"margin-left": -clipWidth/2,
			"margin-top": -clipHeight/2
		}).appendTo($container);

		$moveLayer = $("<div class='photo-clip-moveLayer'>").appendTo($clipView);

		$rotateLayer = $("<div class='photo-clip-rotateLayer'>").appendTo($moveLayer);

		// 鍒涘缓閬僵
		var $mask = $("<div class='photo-clip-mask'>").css({
			"position": "absolute",
			"left": 0,
			"top": 0,
			"width": "100%",
			"height": "100%",
			"pointer-events": "none"
		}).appendTo($container);
		var $mask_left = $("<div class='photo-clip-mask-left'>").css({
			"position": "absolute",
			"left": 0,
			"right": "50%",
			"top": "50%",
			"bottom": "50%",
			"width": "auto",
			"height": clipHeight,
			"margin-right": clipWidth/2,
			"margin-top": -clipHeight/2,
			"margin-bottom": -clipHeight/2,
			"background-color": "rgba(0,0,0,.9)"
		}).appendTo($mask);
		var $mask_right = $("<div class='photo-clip-mask-right'>").css({
			"position": "absolute",
			"left": "50%",
			"right": 0,
			"top": "50%",
			"bottom": "50%",
			"margin-left": clipWidth/2,
			"margin-top": -clipHeight/2,
			"margin-bottom": -clipHeight/2,
			"background-color": "rgba(0,0,0,.9)"
		}).appendTo($mask);
		var $mask_top = $("<div class='photo-clip-mask-top'>").css({
			"position": "absolute",
			"left": 0,
			"right": 0,
			"top": 0,
			"bottom": "50%",
			"margin-bottom": clipHeight/2,
			"background-color": "rgba(0,0,0,.9)"
		}).appendTo($mask);
		var $mask_bottom = $("<div class='photo-clip-mask-bottom'>").css({
			"position": "absolute",
			"left": 0,
			"right": 0,
			"top": "50%",
			"bottom": 0,
			"margin-top": clipHeight/2,
			"background-color": "rgba(0,0,0,.9)"
		}).appendTo($mask);
		// 鍒涘缓鎴彇鍖哄煙
		var $clip_area = $("<div class='photo-clip-area'>").css({
			"border": "1px dashed #ddd",
			"position": "absolute",
			"left": "50%",
			"top": "50%",
			"width": clipWidth,
			"height": clipHeight,
			"margin-left": -clipWidth/2 - 1,
			"margin-top": -clipHeight/2 - 1
		}).appendTo($mask);

		// 鍒濆鍖栬鍥惧鍣�
		$view = $(view);
		if ($view.length) {
			$view.css({
				"background-color": "#666",
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "contain"
			});
		}
	}
}

var prefix = '',
	transitionEnd;

(function() {

	var eventPrefix,
		vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    	testEl = document.documentElement,
    	normalizeEvent = function(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() };

	for (var i in vendors) {
		if (testEl.style[i + 'TransitionProperty'] !== undefined) {
			prefix = '-' + i.toLowerCase() + '-';
			eventPrefix = vendors[i];
			break;
		}
	}

	transitionEnd = normalizeEvent('TransitionEnd');

})();

})(jQuery);