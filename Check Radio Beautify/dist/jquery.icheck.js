/*
 * jquery.iCheck.js
 * 作者： @winderby
 * 备注：单选复选框美化
 * 支持IE8+
 * Licensed under the MIT license
 */
 
;(function($, window, document) {
	
	
	$.fn.iCheck = function(options) {
		var allItem = this;
		this.each(function(){
			
			if(!$(this).is(':checkbox') && !$(this).is(':radio')) return ;
			
		    if (typeof options === 'string') {
				if (options === 'disable') {
					$(this).off('click',check);
					$(this).attr('disabled', true).parent().addClass('disable');
				}
				
				if (options === 'enable') {
					$(this).on('click',check);
					$(this).removeAttr('disabled').parent().removeClass('disable');
				}
				
				if (options === 'update') {
					check.call(this);
				}
				
				if (options === 'destroy') {
					$(this).unwrap();
				}
				return ;
			}
			
			if (!$(this).parent().hasClass('checkbox')) {
				
				var style;
				
				if ($(this).is(':checkbox')){
					style = 'checkbox';
				}else if ($(this).is(':radio')) {
					style = 'radiobox';
				}
				$(this).wrap($('<div></div>').addClass(style))
			}
			
			function check(){
				
				if ($(this).is(':checked')) {
					
					$(this).parent().addClass('active');
					
					if($(this).is(':radio')){
						
						$('[name=' + $(this).attr('name') + ']:radio').not(this).each(function() {
							
							$(this).parent().removeClass('active');
						})
					}
					
				}else {
					
					$(this).parent().removeClass('active');
				}
			}
			
			check.call(this);
			
			$(this).on('click',check);
			
		})
	}
})(jQuery, window, document)