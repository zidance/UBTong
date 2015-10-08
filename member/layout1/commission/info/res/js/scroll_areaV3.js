/**
 * 模拟滑动组件
 * @author		赵轩昂
 * @date		2015-4-7
 */

//获取窗口高度
function getWinHeight(){
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
};

//事件绑定函数
function bindEvent(obj, ev, fn){
    //通过document 判断是否是IE
    //是IE
    if(!document.addEventListener){
        obj.attachEvent(ev,fn);   //鼠标点击时触发此事件
    }
    //非IE浏览器，火狐
    else{
        obj.addEventListener(ev,fn,false);
    }
};

//事件解绑函数
function delEvent(obj, ev, fn){
    //通过document 判断是否是IE
    //是IE
    if(!document.removeEventListener){
        obj.detachEvent(ev,fn);   //鼠标点击时触发此事件
    }
    //非IE浏览器，火狐
    else{
        obj.removeEventListener(ev,fn,false);
    }
};

//判断类名函数
function hasClass(elem, cls){
    var cls = cls || '';
    if(cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

//添加样式函数
function addClass(obj, sClass){
    var re=new RegExp('\\b'+sClass+'\\b');

    if(obj.length>1){
        for(var i=0;i<obj.length;i++){
            if(!re.test(obj[i].className)){
                if(obj[i].className){
                    obj[i].className+=' '+sClass;
                }
                else{
                    obj[i].className=sClass;
                }
            }
        }
    }
    else{
        if(!re.test(obj.className)){
            if(obj.className){
                obj.className+=' '+sClass;
            }
            else{
                obj.className=sClass;
            }
        }
    };
    return obj;
};

//移除样式函数
function removeClass(obj,sClass){
    var re=new RegExp('\\b'+sClass+'\\b', 'g');

    if(obj.length>1){
        for(var i=0;i<obj.length;i++){
            obj[i].className=obj[i].className.replace(re, '').replace(/\s+/g, ' ');
        }
    }
    else{
        obj.className=obj.className.replace(re, '').replace(/\s+/g, ' ');
    };
    return obj;
};

/*iScroll组件*/
var IScroller = function(config){
    this.wrap = config.obj;
    this.direction = config.direction || 'h';
    this.parentW = 0;
    this.scrollItem = this.wrap.children;
    this.len = this.scrollItem.length;
    this._width = this.scrollItem[0].offsetWidth;
    this._height = this.scrollItem[0].offsetHeight;
    this.actualW = this.direction === 'v' ? this._height * this.len : this._width * this.len;
    this.currentPos = 0;
    this.X = 0;
    this.curX = 0;
    this.Y = 0;
    this.curY = 0;
    this.isScrolling = false;
    this.init();
}

IScroller.prototype = {
    init : function(){
        var _this = this;
        if(this.direction === 'v'){
            _this.parentW = _this.wrap.offsetHeight;
            _this.wrap.style['height'] = _this.actualW + 'px';
        }else{
            _this.parentW = _this.wrap.offsetWidth;
            _this.wrap.style['width'] = _this.actualW + 'px';
        }
        _this.addEvent();
        _this.setAnimation();
    },
    touchX : function(e){
        if(e.touches){
            return e.touches[0].pageX;
        }else{
            return e.pageX;
        }
    },
    touchY : function(e){
        if(e.touches){
            return e.touches[0].pageY;
        }else{
            return e.pageY;
        }
    },
    setAnimation : function(){
        var _this = this,
            wrap = _this.wrap;
        wrap.style['transition'] = 'transform 0.3s ease-in-out';
        if(this.direction === 'v'){
            wrap.style['transform'] = 'translate3d(0,'+ _this.currentPos +'px, 0)';
        }else{
            wrap.style['transform'] = 'translate3d('+ _this.currentPos +'px, 0, 0)';
        }
    },
    slide : function(x){
        var _this = this,
            wrap = _this.wrap;
        wrap.style['transition-duration'] = '0s';
        if(this.direction === 'v'){
            wrap.style['transform'] = 'translate3d(0, '+ (_this.currentPos + x) +'px, 0)';
        }else{
            wrap.style['transform'] = 'translate3d('+ (_this.currentPos + x) +'px, 0, 0)';
        }
    },
    addEvent : function(){
        var slide = this.wrap,
            _this = this;

        bindEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        bindEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        bindEvent(slide, "touchend", function(e){_this._touchend(e);});
    },
    _touchstart : function(e){
        this.X = this.touchX(e);
        this.Y = this.touchY(e);
        this.isScrolling = undefined;
    },
    _touchmove : function(e){
        var _this = this,
            deltaX,
            deltaY;

        e.preventDefault();
        if(_this.actualW > _this.parentW){
            _this.curX = _this.touchX(e);
            _this.curY = _this.touchY(e);
            deltaX = _this.curX - _this.X;
            deltaY = _this.curY - _this.Y;
            if (typeof _this.isScrolling == 'undefined') {
                if(this.direction === 'v'){
                    _this.isScrolling = !!(_this.isScrolling || Math.abs(deltaY) < Math.abs(deltaX));
                }else{
                    _this.isScrolling = !!(_this.isScrolling || Math.abs(deltaX) < Math.abs(deltaY));
                }
            }
            if(!_this.isScrolling){
                if(this.direction === 'v'){
                    _this.slide(deltaY);
                }else{
                    _this.slide(deltaX);
                }
            }
        }
    },
    _touchend : function(e){
        var _this = this,
            slide = _this.wrap,
            deltaX = 0,
            deltaY = 0;

        if(_this.actualW > _this.parentW){
            if(_this.curX == 0){
                _this.curX = _this.X;
            }
            if(_this.curY == 0){
                _this.curY = _this.Y;
            }
            deltaX = _this.curX - _this.X;
            deltaY = _this.curY - _this.Y;
            _this.curX = 0;
            _this.curY = 0;
            if(Math.abs(deltaY) > Math.abs(deltaX) && this.direction === 'v'){
                if(_this.currentPos + deltaY > 0){
                    _this.currentPos = 0;
                }else{
                    _this.currentPos = Math.max(_this.currentPos + deltaY, _this.parentW - _this.actualW);
                }
                _this.setAnimation();
            }else if(Math.abs(deltaY) < Math.abs(deltaX) && this.direction === 'h'){
                if(_this.currentPos + deltaX > 0){
                    _this.currentPos = 0;
                }else{
                    _this.currentPos = Math.max(_this.currentPos + deltaX, _this.parentW - _this.actualW);
                }
                _this.setAnimation();
            }
            delEvent(slide, "touchstart", function(e){_this._touchstart(e);});
            delEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        }
    }
};

/*iScroll初始化*/
function iScrollInit(){
    var scrolls = document.querySelectorAll('.j_scroll'),
        config = new Object();
    for(var i = 0; i < scrolls.length; i++){
        if(!hasClass(scrolls[i], 'hide') && !hasClass(scrolls[i], 'inited')){
            config.obj = scrolls[i];
            config.direction = 'v';
            var obj = new IScroller(config);
            addClass(scrolls[i], 'inited');
        }
    }
}

function tabInit(){
    var tabs = document.querySelector('#j_tabs').children,
        items = document.querySelector('#j_items').children;

    for(var i = 0; i < tabs.length; i++){
        var obj = tabs[i].children[0];
        obj.index = i;
        bindEvent(obj, 'click', function(){
            for(var i = 0 ; i < tabs.length; i++){
                if(i == this.index){
                    removeClass(items[i], 'hide');
                    addClass(tabs[i], 'cur');
                    if(!hasClass(items[i], 'inited')){
                        var config = new Object();
                        config.obj = items[i];
                        config.direction = 'v';
                        var obj = new IScroller(config);
                        addClass(items[i], 'inited');
                    }
                }else{
                    addClass(items[i], 'hide');
                    removeClass(items[i], 'inited');
                    removeClass(tabs[i], 'cur');
                }
            }
        });
    }
    for(var j = 0; j < tabs.length; j++){
        var oLis = items[j].children;
        for(var i = 0; i < oLis.length; i++){
            var link = oLis[i].children[0];
            bindEvent(link, 'click', function(){
                var id = this.getAttribute('data-id'),
                    txt = this.innerHTML,
                    callup = document.querySelector('#callup'),
                    callup_input = document.querySelector('#callup_input'),
                    wrap = document.querySelector('#float'),
                    layer = document.querySelector('#layer'),
                    dist = wrap.querySelector('.cur').children[0].innerHTML,
                    height = getWinHeight(),
                    address = document.querySelector('#address');
                addClass(layer, 'hide');
                wrap.style['transform'] = 'translate3d(0, '+ (120 - height) + 'px, 0)';
                setTimeout(function(){
                    addClass(wrap, 'hide');
                },100);
                callup.innerHTML = dist +' '+ txt;
                addClass(callup, 'selected');
                callup.setAttribute('data-id', id);
                callup_input.setAttribute('value',id);
                address.setAttribute('value','');
                setRegionInfo(id);
            });
        }
    }
}

function styleInit(){ 
	var wrap = $('#float'),
	    layer = $('#layer'),
	    innerWrap = wrap.children[0],
	    height = getWinHeight();
	layer.removeClass('hide');
	wrap.removeClass('hide');
	wrap.css('height', (height - 120) + 'px');
	setTimeout(function(){ 
		wrap.css('transform', 'translate3d(0, '+ (height - 120) + 'px, 0)');
		layer.on("click tap", function(){
			$(this).addClass('hide');
			wrap.css('transform', 'translate3d(0, '+ (120 - height) + 'px, 0)');
			setTimeout(function(){
				wrap.addClass('hide');
			}, 100);
		});
		iScrollInit();          // 内容组滑动
		tabInit();
	},50);
}

function setRegionInfo(id){
    var project_id = document.getElementById('project_id').value,
        url = '/Index/setFregion/region/'+ id +'/project_id/'+ project_id +'?jsoncallback=refreshTime';
    $.ajax({
        url : url,
        async : false,
        type : 'GET',
        dataType : 'jsonp',
        success : function(data){
        },
        error : function(xhr, type){
        }
    });
}

/*swipe组件*/
var Swiper = function(ele, config){
    this.wrap = ele;
    this.currentNum = config.startIndex || 0;
    this.speed = config.speed || 200;
    this.callback = config.callback || null;
    this.innerWrap = this.wrap.children[0];
    this.items = this.innerWrap.children;
    this.len = this.items.length;

    if(this.len == 0){
        return;
    }else if(this.len == 1){
        this.wrap.style['height'] = this.items[0].offsetHeight;
        this.wrap.style['width'] = this.items[0].offsetWidth;
        return;
    }
    this._width = 0;
    this._height = 0;
    this.X = 0;
    this.curX = 0;
    this.Y = 0;
    this.curY = 0;
    this.direction = 0;
    this.firstInit = false;
    this.isScrolling = false;
    this.isValidSlide = false;
    this.init();
}

Swiper.prototype = {
    init : function(){
        var _this = this;
        _this._height = _this.items[_this.currentNum].getBoundingClientRect().height || _this.items[_this.currentNum].offsetHeight;
        _this.innerWrap.style['height'] = _this._height * _this.len + 'px';
        _this.firstInit = true;
        _this.gotoPage(_this.currentNum);
        _this.addEvent();
    },
    touchX : function(e){
        if(e.touches){
            return e.touches[0].pageX;
        }else{
            return e.pageX;
        }
    },
    touchY : function(e){
        if(e.touches){
            return e.touches[0].pageY;
        }else{
            return e.pageY;
        }
    },
    setAnimation : function(){
        var wrap = this.wrap,
            len = this.len,
            speed = this.speed,
            h = this._height,
            n = this.currentNum;

        if(this.firstInit){
            this.translate(wrap, - n * h, 0);
            this.firstInit = false;
        }else{
            this.translate(wrap, - n * h, speed);
        }
    },
    translate : function(slide, dist, speed){
        var ua = navigator.userAgent.toLowerCase(),
            style = slide && slide.style;

        // 指定对象过渡持续的时间(默认值是0，意味着不会有效果)
        style.webkitTransitionDuration =
            style.MozTransitionDuration =
                style.msTransitionDuration =
                    style.OTransitionDuration =
                        style.transitionDuration = speed + 'ms';

        style.webkitTransitionTimingFunction =
            style.MozTransitionTimingFunction =
                style.msTransitionTimingFunction =
                    style.OTransitionTimingFunction =
                        style.transitionTimingFunction = 'ease-in-out';

        // 定义3D转换，沿着X轴移动元素
        if (ua.indexOf('gt-') != -1) {
            style.webkitTransform = 'translateY(' + dist + 'px)';
        } else {
            style.webkitTransform = 'translate3d(0, ' + dist + 'px, 0)';
        }
        style.msTransform =
            style.MozTransform =
                // 定义2D转换，沿着X轴移动元素
                style.OTransform = 'translateY(' + dist + 'px)';
    },
    slide : function(x){
        var wrap = this.wrap,
            speed = Math.ceil(this.speed / 4),
            alter = - this.currentNum * this._height + x,
            total = this.innerWrap.offsetHeight,
            sum = alter > 0 ? Math.min(alter, 5) : Math.max(alter, 145 - total);
        this.translate(wrap, sum, 0);
    },
    round : function(alt){
        if(this.currentNum + alt < 0){
            return 0;
        }else if(this.currentNum + alt > this.len - 1){
            return this.len - 1;
        }else{
            return this.currentNum + alt;
        }
    },
    addEvent : function(){
        var slide = this.innerWrap,
            _this = this;

        bindEvent(slide, "touchstart", function(e){_this._touchstart(e);});
        bindEvent(slide, "touchmove", function(e){_this._touchmove(e);});
        bindEvent(slide, "touchend", function(e){_this._touchend(e);});
    },
    _touchstart : function(e){
        e.preventDefault();
        this.X = this.touchX(e);
        this.Y = this.touchY(e);
        this.isScrolling = undefined;
    },
    _touchmove : function(e){
        var _this = this,
            deltaX,
            deltaY;

        e.preventDefault();
        _this.curX = _this.touchX(e);
        _this.curY = _this.touchY(e);
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
        if (typeof _this.isScrolling == 'undefined') {
            _this.isScrolling = !!(_this.isScrolling || Math.abs(deltaY) < Math.abs(deltaX));
        }
        if(!_this.isScrolling){
            _this.slide(deltaY);
        }
    },
    _touchend : function(e){
        var _this = this,
            slide = _this.innerWrap,
            deltaX = 0,
            deltaY = 0;

        if(_this.curX == 0){
            _this.curX = _this.X;
        }
        if(_this.curY == 0){
            _this.curY = _this.Y;
        }
        deltaX = _this.curX - _this.X;
        deltaY = _this.curY - _this.Y;
        _this.X = 0;
        _this.Y = 0;
        _this.curX = 0;
        _this.curY = 0;
        if(Math.abs(deltaY) > Math.abs(deltaX)){
            if(Math.abs(deltaY) > 10){
                _this.isValidSlide = true;
                _this.direction = deltaY > 0 ? 1 : 0;
            }else{
                _this.isValidSlide = false;
            }
            if(_this.isValidSlide){
                var delta = Math.round(Math.abs(deltaY) / _this._height);
                var index = _this.direction == 1 ? _this.round(-delta) : _this.round(delta);
                _this.gotoPage(index);
            }else{
                _this.setAnimation();
            }
        }
    },
    gotoPage : function(index){
        if(index != -1){
            this.currentNum = index;
            this.setAnimation();
            this.callback(this.items[index], index, this.direction);
        }
    }
};

function timeInit(){

    //如果街道值为空时，需要用户先填写街道
    var street          = $("#callup_input").val();

    if( street == ''){
        $.dialog({
            content: '请先选择您所在区域',
            title: "alert",
            time: 2000,
            callback: styleInit
        });
        return false;
    }

    var mb = document.querySelector('#timeMb'),
        timeLayer = document.querySelector('#selectTime'),
        timeSelect = document.querySelector('#timeSelect'),
        dateSelect = document.querySelector('#dateSelect'),
        cancel = timeLayer.querySelector('.fl'),
        confirm = timeLayer.querySelector('.fr'),
        timeSlide = null,
        dateSlide = null,
        timeConfig = new Object(),
        dateConfig = new Object();

    removeClass(mb, 'hide');
    removeClass(timeLayer, 'hide');
    timeLayer.style['transform'] = 'translate3d(0, -'+ timeLayer.offsetHeight +'px, 0)';
    dateConfig.callback = function(ele, index, dir){
        removeClass(ele.parentNode.children, 'active');
        addClass(ele, 'active');
        bookData && ele.setAttribute('data-value', bookData[index].orderDate);
        var times = timeSelect.querySelectorAll('li');
        if(bookData){
            for(var i = 0; i < times.length; i++){
                var detail = bookData[index].detail;
                times[i].setAttribute('data-valuestart', detail[i].forStartTime);
                times[i].setAttribute('data-valueend', detail[i].forEndTime);
                removeClass(times[i], 'timeout');
                removeClass(times[i], 'booked');
                if(detail[i].state){
                    addClass(times[i], detail[i].state);
                }
            }
        }
        var time = timeSelect.querySelector('.active');
        if(!hasClass(time, 'timeout') && !hasClass(time, 'booked')){
            removeClass(confirm, 'not');
        }else{
            addClass(confirm, 'not');
        }
    };
    timeConfig.callback = function(ele, index, dir){
        removeClass(ele.parentNode.children, 'active');
        addClass(ele, 'active');
        if(!hasClass(ele, 'timeout') && !hasClass(ele, 'booked')){
            removeClass(confirm, 'not');
        }else{
            addClass(confirm, 'not');
        }
    };
    timeSlide = new Swiper(timeSelect, timeConfig);
    dateSlide = new Swiper(dateSelect, dateConfig);
    bindEvent(mb, "click", function(){
        var that = this;
        timeLayer.style['transform'] = 'translate3d(0, 0, 0)';
        setTimeout(function(){
            addClass(timeLayer, 'hide');
            addClass(that, 'hide');
        }, 300);
    });
    bindEvent(cancel, "click", function(){
        timeLayer.style['transform'] = 'translate3d(0, 0, 0)';
        setTimeout(function(){
            addClass(timeLayer, 'hide');
            addClass(mb, 'hide');
        }, 300);
    });
    bindEvent(confirm, "click", function(){
        var timeSelect = document.querySelector('#timeSelect'),
            dateSelect = document.querySelector('#dateSelect'),
            start = document.querySelector('#forStartTime'),
            end = document.querySelector('#forEndTime'),
            date = document.querySelector('#order_date'),
            startShow = document.querySelector('#showBeginTime'),
            endShow = document.querySelector('#showEndTime'),
            dateShow = document.querySelector('#selectShow');

        if(!hasClass(this, 'not')){
            timeLayer.style['transform'] = 'translate3d(0, 0, 0)';
            setTimeout(function(){
                addClass(timeLayer, 'hide');
                addClass(mb, 'hide');
            }, 300);

            var _start = timeSelect.querySelector('.active').getAttribute('data-valuestart'),
                _end = timeSelect.querySelector('.active').getAttribute('data-valueend'),
                _date = dateSelect.querySelector('.active').getAttribute('data-value'),
                str = dateSelect.querySelector('.active').innerHTML +' '+ timeSelect.querySelector('.active').innerHTML;

            start.value = _start;
            startShow.value = _start;
            end.value = _end;
            endShow.value = _end;
            date.value = _date;
            dateShow.innerHTML = str;
            addClass(dateShow, 'selected');
        }
    });
}
var bookData = null;
window.refreshTime = function(data){
    if(data.status == 1 ){
        var dates = $('#dateSelect').find('li'),
            times = $('#timeSelect').find('li');

        bookData = data.data;
        if(bookData){
            for(var i = 0; i < dates.length; i++){
                dates.eq(i).data('value', bookData[i].orderDate);
            }
            for(var i = 0; i < times.length; i++){
                times.eq(i).data('valuestart', bookData[0].detail[i].forStartTime);
                times.eq(i).data('valueend', bookData[0].detail[i].forEndTime);
                bookData[0].detail[i].state && times.eq(i).addClass(bookData[0].detail[i].state);
            }
        }
    }else{
        $.dialog({
            content: data.message,
            title: "alert",
            time: 2000
        });
        $("#nextStep").hide();
        return false;
    }
}

// 点击下一步 
$("#nextStep").click(function(){
    // var Tname            = $("#Tname").val();
    // var Taddress         = $("#Taddress")

    var name            = $("#name").val();
    var phone           = $("#phone").val();

    var otherName       = $("#otherName").val();
    var otherPhone      = $("#otherPhone").val();

    var address         = $("#address").val();

    var street          = $("#callup_input").val();

    var postscript      = $("#postscript").val();
    var forStartTime    = $("#forStartTime").val();
    var forEndTime      = $("#forEndTime").val();

    // otherName            = $.trim(otherName);
    // otherPhone           = $.trim(otherPhone);
     if (name == '' || name=="请填写您的姓名!") {
        $.dialog({
            content: '请填写您的姓名!',
            title: "alert",
            time: 2000
        });
    }
    else if (street == '' ) {
        $.dialog({
            content: '请选择您所在区域',
            title: "alert",
            time: 2000,
            callback: styleInit
        });

        return false;
    }
    else if (address == '' || address == "请填写详细小区楼号、门牌号") {
        $.dialog({
            content: '请填写详细地址!',
            title: "alert",
            time: 2000
        });
        return false;
    }
    else if(otherPhone != '' && !checkMobile(otherPhone) && otherPhone != "填写需要美容服务的手机号"){
        $.dialog({
            content: '请认真填写他人电话号码!',
            title: "alert",
            time: 2000
        });
        return false;
    }
    else if(checkMobile(otherPhone) && otherPhone != "填写需要美容服务的手机号" && otherName.length < 1 && otherName != "姓氏"){
        $.dialog({
            content: '请填写他人姓氏!',
            title: "alert",
            time: 2000
        });
        return false;
    }
    else if (otherName.length > 1 && otherName != "姓氏" && !checkMobile(otherPhone)){
        $.dialog({
            content: '请认真填写他人电话号码！',
            title: "alert",
            time: 2000
        });
        return false;
    }
    else if (forStartTime < 7 || forEndTime < 7) {
         $.dialog({
             content: '请选择服务时间!',
             title: "alert",
             time: 2000,
             callback: timeInit
         });
         return false;
     }
     else{
        document.myform.submit();
    }

})

// 鼠标落入清除字段
$("#address, #postscript, #otherPhone, #otherName, #name").focus(function(){
    $(this).val("");
    $(this).css("color","black");
    $(this).unbind("focus");
})
//手机号码验证
function checkMobile(s){
    var regu =/^[1][0-9]{10}$/;
    var re = new RegExp(regu);
    if (re.test(s)) {
        $("#Tips").hide();
        return true;
    }else{
        $("#Tips").html('请输入正确的手机号码！').show();
        return false;
    }
}

/*到店体验*/
function expInit(){ 
	var btn = $('#exp'),
	    cnt = $('#exp_wrap'),
	    tabs = $('#exp_tab').find('li'),
	    adr = $('#exp_adr').find('ul'),
	    area = $('.order_area'),
	    callup = $('#callup').find('a'),
	    callup_input = $('#callup_input'),
	    address = $('input[name="address"]'),
	    wrap = $('#exp_adr');

	btn.on('click tap', function(){ 
		$(this).toggleClass('unfold');
		cnt.toggleClass('hide');
		area.toggleClass('hide');
		var id = $('#exp_tab').find('.active').data('id'),
		    txt = adr.children().eq($('#exp_tab').find('.active').index()).html();
		if($(this).hasClass('unfold')){ 
			callup.removeClass('selected').html('点击选择区域');
			callup_input.val(id);
			address.attr('value', txt);
            setRegionInfo(id);
		}
	});

	tabs.on('click tap', function(){ 
		var index = $(this).index(),
		    width = Math.round(adr.width() / 3),
		    id = $(this).data('id');
		if(!$(this).hasClass('active')){ 
			tabs.removeClass('active');
			$(this).addClass('active');
			adr.css('transform', 'translate3d('+ (-index*width) + 'px,0,0)');
			var txt = adr.children().eq($('#exp_tab').find('.active').index()).html();
			callup_input.val(id);
			address.attr('value', txt);
			setRegionInfo(id);
		}		
	});
}

/** 绑定事件 **/
setTimeout(function(){
	var click = $('#callup'),
	    timeBtn = $('#selectShow'),
	    inputs = $('input');

	click.on("click tap", function(){
		setTimeout(function(){ 
			styleInit();
		},300);
	});	
	timeBtn.on("click tap", function(){
	    setTimeout(function(){ 
			timeInit();
		},300);
	});	
	expInit(); //到店体验
}, 300);