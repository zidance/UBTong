/* by zhangxinxu 2010-07-27 
* http://www.zhangxinxu.com/
* 倒计时的实现
*/
var fnTimeCountDown = function(d, o){
	var f = {
		zero: function(n){
			var n = parseInt(n, 10);
			if(n > 0){
				if(n <= 9){
					n = "0" + n;	
				}
				return String(n);
			}else{
				return "00";	
			}
		},
		dv: function(){
			d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
			var future = new Date(d), now = new Date();
			//现在将来秒差值
			var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60, pms = {
				sec: "00",
				mini: "00",
				hour: "00",
				day: "00",
				month: "00",
				year: "0"
			};
			if(dur > 0){
				pms.sec = f.zero(dur % 60);
				pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
				pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
				pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
				//月份，以实际平均每月秒数计算
				pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
				//年份，按按回归年365天5时48分46秒算
				pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
			}
			return pms;
		},
		ui: function(){
			if(o.sec){
				secs=f.dv().sec.split("");
				o.sec.innerHTML = '<span class="s-time">'+secs[0]+'</span><span class="s-time">'+secs[1]+'</span>';
			}
			if(o.mini){
				minis=f.dv().mini.split("");
				o.mini.innerHTML = '<span class="s-time">'+minis[0]+'</span><span class="s-time">'+minis[1]+'</span>';
			}
			if(o.hour){
				hours=f.dv().hour.split("");
				o.hour.innerHTML = '<span class="s-time">'+hours[0]+'</span><span class="s-time">'+hours[1]+'</span>';
			}
			if(o.day){
				days=f.dv().day.split("");
				o.day.innerHTML = '<span class="s-time">'+days[0]+'</span><span class="s-time">'+days[1]+'</span>';
			}
			if(o.month){
				months=f.dv().month.split("");
				o.month.innerHTML = '<span class="s-time">'+months[0]+'</span><span class="s-time">'+months[1]+'</span>';
			}
			if(o.year){
				o.year.innerHTML = f.dv().year;
			}
			setTimeout(f.ui, 1000);
			
		}
	};	
	f.ui();
};