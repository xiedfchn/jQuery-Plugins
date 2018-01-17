/*
 * jquery.iSelect.js
 * 作者： @winderby
 * 备注：模拟下拉列表
 * 支持IE8+
 * Licensed under the MIT license
 */
 
;(function() {
	$.fn.iSelect = function() {
		
		// 所有下拉列表
		var allList = this;
		
		return this.each(function(){
			
			var $this = $(this);
			var $result = $this.find('.select-result');
			var $list = $this.find('.select-list');
			var $input = $this.find('input[type="hidden"]');
			
			// 根据已经选择的选项初始化 
			enterValue.call($list.find('li.active'));
			
			// 显示下拉列表
			$result.on('click', function(e) {
				if( $list.is(':hidden') ) {
					e.stopImmediatePropagation();
					allList.each(function() {
						$(this).removeClass('show');
						$('.select-list',this).css('z-index', "")
					})
					$this.addClass('show');
				}
			})
			
			// 隐藏下拉列表
			$(document).on('click', function(e) {
				if(e.target !== $list[0] ){
					$this.removeClass('show');
				}
			})
			
			// 点击选项
			$list.on('click', 'li', function() {
				enterValue.call(this);
				$(this).addClass('active')
				.siblings('li').removeClass('active');
				
			});
			
			// 输入值
			function enterValue() {
				var value = $(this).data('value');
				$result.text(value);
				$input.val(value);
			}
			
		})
	}
})();
