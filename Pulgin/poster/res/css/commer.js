$(function () {
	/*jq.lazyload.js*/
	//$('.show_labour .show_img').show();
	$('.lazy_tip,.lazy_cover').hide();
	/* end jq.lazyload.js*/

	/*鍔犺浇婊氬姩鏉� 鏈夊绉嶉€夋嫨*/
	var loaders = [
		{
			width: 100,
			height: 50,
			padding: 10,
			stepsPerFrame: 2,
			trailLength: 1,
			pointDistance: .03,
			strokeColor: '#FF7B24',
			step: 'fader',
			multiplier: 2,
			setup: function () {
				this._.lineWidth = 5;
			},
			path: [
				['arc', 10, 10, 10, -270, -90],
				['bezier', 10, 0, 40, 20, 20, 0, 30, 20],
				['arc', 40, 10, 10, 90, -90],
				['bezier', 40, 0, 10, 20, 30, 0, 20, 20]
			]
		},
		{
			width: 30,
			height: 30,
			stepsPerFrame: 2,
			trailLength: .3,
			pointDistance: .1,
			padding: 10,
			fillColor: '#D4FF00',
			strokeColor: '#FFF',
			setup: function () {
				this._.lineWidth = 20;
			},
			path: [
				['line', 0, 0, 30, 0],
				['line', 30, 0, 30, 30],
				['line', 30, 30, 0, 30],
				['line', 0, 30, 0, 0]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 1,
			trailLength: 1,
			pointDistance: .025,
			strokeColor: '#05E2FF',
			fps: 20,
			setup: function () {
				this._.lineWidth = 2;
			},
			step: function (point, index) {
				var cx = this.padding + 50,
					cy = this.padding + 50,
					_ = this._,
					angle = (Math.PI / 180) * (point.progress * 360);
				this._.globalAlpha = Math.max(.5, this.alpha);
				_.beginPath();
				_.moveTo(point.x, point.y);
				_.lineTo(
					(Math.cos(angle) * 35) + cx,
					(Math.sin(angle) * 35) + cy
				);
				_.closePath();
				_.stroke();
				_.beginPath();
				_.moveTo(
					(Math.cos(-angle) * 32) + cx,
					(Math.sin(-angle) * 32) + cy
				);
				_.lineTo(
					(Math.cos(-angle) * 27) + cx,
					(Math.sin(-angle) * 27) + cy
				);
				_.closePath();
				_.stroke();
			},
			path: [
				['arc', 50, 50, 40, 0, 360]
			]
		},
		{
			width: 100,
			height: 50,
			stepsPerFrame: 1,
			trailLength: 1,
			pointDistance: .1,
			fps: 15,
			padding: 10,
			//step: 'fader',
			fillColor: '#FF2E82',
			setup: function () {
				this._.lineWidth = 20;
			},
			path: [
				['line', 0, 20, 100, 20],
				['line', 100, 20, 0, 20]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 7,
			trailLength: .7,
			pointDistance: .01,
			fps: 30,
			setup: function () {
				this._.lineWidth = 10;
			},
			path: [
				['line', 20, 70, 50, 20],
				['line', 50, 20, 80, 70],
				['line', 80, 70, 20, 70]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 4,
			trailLength: 1,
			pointDistance: .01,
			fps: 25,
			fillColor: '#FF7B24',
			setup: function () {
				this._.lineWidth = 10;
			},
			step: function (point, i, f) {
				var progress = point.progress,
					degAngle = 360 * progress,
					angle = Math.PI / 180 * degAngle,
					angleB = Math.PI / 180 * (degAngle - 180),
					size = i * 5;
				this._.fillRect(
					Math.cos(angle) * 25 + (50 - size / 2),
					Math.sin(angle) * 15 + (50 - size / 2),
					size,
					size
				);
				this._.fillStyle = '#63D3FF';
				this._.fillRect(
					Math.cos(angleB) * 15 + (50 - size / 2),
					Math.sin(angleB) * 25 + (50 - size / 2),
					size,
					size
				);
				if (point.progress == 1) {
					this._.globalAlpha = f < .5 ? 1 - f : f;
					this._.fillStyle = '#EEE';
					this._.beginPath();
					this._.arc(50, 50, 5, 0, 360, 0);
					this._.closePath();
					this._.fill();
				}
			},
			path: [
				['line', 40, 10, 60, 90]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 3,
			trailLength: 1,
			pointDistance: .01,
			fps: 30,
			step: 'fader',
			strokeColor: '#D4FF00',
			setup: function () {
				this._.lineWidth = 6;
			},
			path: [
				['arc', 50, 50, 20, 360, 0]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 1,
			trailLength: 1,
			pointDistance: .02,
			fps: 30,
			fillColor: '#05E2FF',
			step: function (point, index) {
				this._.beginPath();
				this._.moveTo(point.x, point.y);
				this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
				this._.closePath();
				this._.fill();
			},
			path: [
				['arc', 50, 50, 30, 0, 360]
			]
		},
		{
			width: 100,
			height: 100,
			stepsPerFrame: 1,
			trailLength: 1,
			pointDistance: .05,
			strokeColor: '#FF2E82',
			fps: 20,
			setup: function () {
				this._.lineWidth = 4;
			},
			step: function (point, index) {
				var cx = this.padding + 50,
					cy = this.padding + 50,
					_ = this._,
					angle = (Math.PI / 180) * (point.progress * 360),
					innerRadius = index === 1 ? 10 : 25;
				_.beginPath();
				_.moveTo(point.x, point.y);
				_.lineTo(
					(Math.cos(angle) * innerRadius) + cx,
					(Math.sin(angle) * innerRadius) + cy
				);
				_.closePath();
				_.stroke();
			},
			path: [
				['arc', 50, 50, 40, 0, 360]
			]
		}
	];
	var d, a, container = document.getElementById('lazy_tip');
	/* 鎻愮ず锛歩鍊间负0鍒�8 鏈変笉鍚岀殑鏁堟灉*/
	var i = 2;
	d = document.createElement('div');
	d.className = 'l';
	a = new Sonic(loaders[i]);
	d.appendChild(a.canvas);
	a.canvas.style.marginTop = '0px';
	container.appendChild(d);
	a.play();
	/*end 鍔犺浇婊氬姩鏉�*/
})