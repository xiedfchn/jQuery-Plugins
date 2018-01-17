/*
 * jquery.iScroll.js
 * 作者： @winderby
 * 备注：滚动条
 * 支持IE9+
 * Licensed under the MIT license
 */
 
;(function($, window, document) {
	
	
	$.fn.iScroll = function(options) {
		
		// 默认参数
		var settings = $.extend({
			
			// 滚动轴大小
			size: '8px',
			
			// 按钮颜色
			color: '#000',
			
			// 按钮透明度
			opacity: .7,
			
			// 是否为圆角
			rounded: true,
			
			// 是否显示滚动条
			railVisible : true,
			
			// 滚动条颜色
			railColor : '#333',
			
			// 滚动条透明度
			railOpacity : .2,
			
			// 滚动步长
			wheelStep : 200,
			
			// 是否一直显示滚动轴
			alwaysVisible: false,
			
			// 是否可以通过滚动轴拖拽
			railDraggable: true,
			
		}, options);
		
		this.each(function(i,el ){
			
			// 缓存目标元素
			var $box = $(el);
			
			if( $box.find('.scrollBar').length ){
				var temp = $box.find('.scrollBox').html();
			}
			
			// 储存当前内容
			var content = temp || $box.html();
			
			// 初始化滑块包装
			var wrap = $('<div></div>').addClass('scrollBox').css({
				top: 0,
				position: 'relative', // 防止内部元素拥有margin
				overflow: 'hidden'
			}).html(content);
			
			// 初始化滚动条
			var rail = $('<div></div>').addClass('scrollBarWrap').css({
				'z-index': 999,
				position: 'absolute',
				width: settings.size,
				top: 0,
				right: 0,
				height: '100%',
				'background-color': settings.railColor,
				opacity: settings.railVisible ? settings.railOpacity : 0,
			})
			
			// 初始化滑块
			var bar = $('<div></div>').addClass('scrollBar').css({
				'z-index': 1000,
				position: 'absolute',
				width: settings.size,
				top: 0,
				right: 0,
				height: '100%',
				'background-color': settings.color,
				opacity: settings.opacity,
				'border-radius': settings.rounded ? '1000px' : '',
			})
			
			// 初始化界面
			$box.empty()
				.append(wrap)
				.css({'overflow': 'hidden', 'position': 'relative'})
				.append(bar)
				.append(rail);
			
			// 缓存各种高度	
			var boxHeight = $box.height();
			var wrapHeight = wrap.innerHeight();
			var railHeight = rail.height();
			
			// 如果内容高度不到超过目标，设置为最初页面状态并返回。
			if(boxHeight > wrapHeight) {
				$box.html(content);
				return;
			}
			
			// CSS3滚动动画效果
			function addTransition(drag) {
				
				if (!drag) {
					bar.css({transition:"top .4s ease"})
					wrap.css({transition:"top .4s ease"})
				} else {
					bar.css({transition:""})
					wrap.css({transition:""})
				}
				 
			}
			addTransition();
			
			// 初始化滑块的高度
			bar.height( boxHeight * boxHeight/ wrapHeight);
			
			// 缓存滑块最大top值
			var maxHeight = (wrapHeight -  boxHeight) * boxHeight / wrapHeight;
			
			// 滑块top值，初始为0
			var top = 0;
			
			// bar和wrap的滚动函数
			function moveBar(){
				
				// 设置bar的位置
				top = top < 0 ? 0 : top;
				top = top > maxHeight ? maxHeight : top ;
				bar.css({top:top});
				
				// 设置内容wrap的位置
				var boxH = -top * wrapHeight / boxHeight;
				wrap.css({top: boxH,})
				
			}
			
			// 绑定滚轮事件效果
			$box[0].addEventListener('wheel', function(e){
				
				// 向下滚动
				if(e.deltaY > 0){
					
					// 向下滚动且未到达最大值时，阻止浏览器滚动效果。
					if(top != maxHeight && e) { 
						e.preventDefault(); 
					}
					top += settings.wheelStep * boxHeight / wrapHeight;
				}
				
				// 向下滚动，与上面对应
				if(e.deltaY < 0){
					if(top != 0 && e) {
						e.preventDefault();
					}
					top -= settings.wheelStep * boxHeight/ wrapHeight ; 
				}
				
				// 移动内容和滑块
				moveBar();
			
			},false)
			
			
			// 拖动滑块效果
			if (settings.railDraggable) {
				
				var relative;
				var isDrag = false;
           		var $doc = $(document);
				
				// 鼠标按下时，获取初始位置，并可以拖动。
				bar.on('mousedown', function(e){
					
					isDrag = true;
					
					// 相对顶部位置
					relative =  e.pageY - bar.position().top;
					
					// 当通过滑块滑动时取消动画
					addTransition(isDrag);
					
					return false;
				})
				
				// 鼠标松开时，关闭拖动。
				$doc.on('mouseup', function() {
					
					isDrag = false;
					
					// 恢复动画
					addTransition(isDrag);
					
					// 松开隐藏滚动条
					if(!settings.alwaysVisible) hideBar();
					
				}).on('mousemove', function(e) {
					
					// 拖动获取top值
					if(!isDrag) return false;
					
					top =  e.pageY - relative;
					
					// 移动滑块和内容
					moveBar();
				})
			}
			
			// 滚动条的可见性
			if (!settings.alwaysVisible) {
			
				var overBar;
				
				// 隐藏滚动条函数
				function hideBar() {
					
					// 隐藏滚动条，拖动情况除外
					if(!overBar && !isDrag) {
						rail.fadeOut(200);
						bar.fadeOut(200);
					}else{
						rail.fadeIn(200);
						bar.fadeIn(200);
					}
					
				}
				
				// 鼠标在模块内，显示滚动条，反之，隐藏。
				$(el).hover(function(){
					
					overBar = true;
					hideBar();
					
				},function(){
					
					overBar = false;
					hideBar();
					
				}).mouseleave();
			}
		
		})
	}
})(jQuery, window, document)