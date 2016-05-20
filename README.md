# UBTong
UBTong Mobile Shop V2.0

## 概览!!!!

优百通微商城前端CSS全局样式；基本的HTML元素可以通过class设置样式并得到增强效果；

## HTML5文档类型

使用到的某些 HTML 元素和 CSS 属性需要将页面设置为 HTML5 文档类型。在你项目中的每个页面都要参照下面的格式进行设置。

```
<!DOCTYPE html>
<html lang="zh-CN">
  ...
</html>
```
## 布局容器
需要为页面内容和栅格系统包裹一个 `.container` 容器。我们提供了两个作此用处的类。注意，由于 padding 等属性的原因，这两种 容器类不能互相嵌套。

 `.container` 类用于固定宽度并支持响应式布局的容器。
```html
<div class="container">
  ...
</div>
```
`.container-w320`类用于320px宽度，可自定义。
```html
<div class="container-w320">
  ...
</div>
```
`.container-fluid` 类用于 100% 宽度，占据全部视口（viewport）的容器。
```
<div class="container-fluid">
  ...
</div>
```

## 栅格系统
栅格系统用于通过一系列的行（row）与列（column）的组合来创建页面布局，你的内容就可以放入这些创建好的布局中。随着屏幕或视口的尺寸，系统自动分为10列 ，前提 是使用之前必须有个布局容器。

```
/* 必须是在一个块容器内 */
<div class="container-fluid"> 
    <div class="col-md-2">
    ...
    </div>
</div>
```
```
.col-md-1 { width:10%}
.col-md-2 { width:20%}
.col-md-3 { width:30%}
.col-md-4 { width:40%}
.col-md-5 { width:50%}
.col-md-6 { width:60%}
.col-md-7 { width:70%}
.col-md-8 { width:80%}
.col-md-9 { width:90%}
.col-md-10 { width:100%}
```
##列偏移
`.col-md-offset-1`

##清除浮动
`.clr` 类用于清除浮动。
```
.clr{ clear:both; display:block; font-size:0; height:0; line-height:0; overflow:hidden; }
```

##排版
- 标题
```
h1{ font-size:.9rem}
h2{ font-size:.75rem;}
h3{ font-size:.6rem}
h4{ font-size:.45rem;}
h5{ font-size:.35rem}
h6{ font-size:.3rem}
```
- 字体并设置行高
```
.fz60{ font-size:30px;}
.fz58{ font-size:29px;}
.fz56{ font-size:28px;}
.fz54{ font-size:27px;}
.fz52{ font-size:26px;}
.fz50{ font-size:25px;}
.fz48{ font-size:24px;}
.fz46{ font-size:23px;}
.fz44{ font-size:22px;}
.fz42{ font-size:21px;}
.fz40{ font-size:20px;}
.fz38{ font-size:19px;}
.fz36{ font-size:18px;}
.fz34{ font-size:17px;}
.fz32{ font-size:16px;}
.fz30{ font-size:15px;}
.fz28{ font-size:14px;}
.fz26{ font-size:13px;}
.fz24{ font-size:12px;}
.fz22{ font-size:11px;}
.fz20{ font-size:10px;}
.fz18{ font-size:9px;}
.fz16{ font-size:8px;}
.fz14{ font-size:7px;}
.fz12{ font-size:6px;}

```
- 下划线/删除线/上划线
```
.line-through{ text-decoration:line-through}
.overline{ text-decoration:overline;}
.underline{ text-decoration:underline;}
```
- 对齐方式
```
.text-left {
	text-align: left;
}
.text-right {
	text-align: right;
}
.text-center {
	text-align: center;
}
.text-justify {
	text-align: text-justify;
}
```
- 不定宽高水平垂直居中
```
.center {
	justify-content: center;
	align-items: center;
	display: -webkit-flex;
}
```
- 浮动
```
.float-left {
	float: left;
}
.float-right {
	flloat: right;
}
```
- 元素块 内联
```
.block {
	display: block;
}
.iblock {
	display: inline-block;
}
.inline {
	display: inline;
}
```
- 单行文字溢出
```
.text-overflow {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```
- 多行文字溢出
```
.more-overflow {
	width: 200px;
	line-height: 20px;
	display: -webkit-box !important;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
```
- 背景颜色
```
/* xx为颜色英文命名 */
.bg-color-xx {
	background-color: red;
}
```
- 鼠标经过颜色
```
.link-bg-color-xx {
	background-color:;
}
(xx为颜色的英文)
.link-color-xx {
	color:;
}
(xx为颜色的英文)
.link-bd-color-xx {
	border-color:;
}
(xx为颜色的英文)
```