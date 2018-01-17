;(function($) {
	$.fn.iPin = function(options) {
		
		// 参数
		var setting = $.extend({
			// 具体窗口顶部距离
			marginTop: 0,
			// 滚动偏移位置
			offset: 0,
			// fade动画效果
			fade: false,
			// 添加新样式
			class: '',
		},options)
		
		return this.each(function() {
			// 目标体
			var $this = $(this),
			// 动画开关
			up = true,
			// 距离文档顶部的距离
			offsetTop = $this.offset().top,
			// 距离文档左边的距离
			offsetLeft = $this.offset().left,
			// 距离浏览器窗口顶部最终距离
			top = offsetTop - setting.marginTop + setting.offset;
			// 占位元素
			occupy = $this.clone().css('opacity', 0);
			
			// 如果位置异常报错
			if($this.offset().top < setting.marginTop) {
				throw new Error( '为了更好的视觉效果，请缩小marginTop值' );
				return ;
			}
			
			// 绑定页面滚动
			$(document).scroll(function(a) {
				
				// 向上
				if($(this).scrollTop() > top ){
					
					// 插入占位元素
					occupy.insertBefore($this); 
					
					// 放置元素
					$this.css({
						position:'fixed',
						top:  0, 
						left: offsetLeft,
						'margin-top': setting.marginTop,
					})
					
					// 添加样式
					.addClass(setting.class)
					
					// 动画效果，只执行一次
					if(setting.fade&&up) {
						up = false;
						$this.css('display', 'none').fadeIn();
					}
					
				// 向下
				}else {
					
					// 删除占位元素
					occupy.remove(); 
					
					// 重置位置属性
					$this.css({
						position: '',
						top: '', 
						left: '',
						'margin-top': ''
					})
					
					// 删除样式
					.removeClass(setting.class);
					
					// 重置动画开关
					up = true; 
				}
			})
		})
		
	}
})(jQuery)