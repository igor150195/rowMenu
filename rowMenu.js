// https://github.com/igor150195/rowMenu 10.10.2019

$.fn.rowMenu = function(options) {
	return this.each(function() {
		var timeout;
		var $menu = $(this);
		var $li = $menu.find('>li');

		var settings = $.extend( {
			'moreText'         			: 'Еще',
			'moreWidth'        			: 100,
			'resizeTimeout'        		: 10,
			'moreHideTimeout'        	: 500,
			'moreBtnClass'	   			: 'row-menu-btn',
			'moreContainerClass'	    : 'row-menu-container'
	    }, options);

		rowMenuInit();

		$(window).on('resize', function(){
			if (timeout!=='undefined') {
				clearTimeout(timeout);
			};
			timeout = setTimeout(function(){
				resizeRowMenu();
			}, settings.resizeTimeout);
		});

		function rowMenuInit() {
			var menuWdith = 0;
			var menuMaxWdith = $menu.outerWidth();

			$li.each(function() {
				var $this = $(this);
				var thisWidth = $this.outerWidth(true);

				menuWdith += thisWidth;

				if ((menuWdith+settings.moreWidth)>=menuMaxWdith) {
					$this.attr('data-append', 1);

					if ($menu.find('.' + settings.moreBtnClass).length<1) {
						$menu.append('<li class="'+settings.moreBtnClass+'"><a href="#">'+settings.moreText+'</a><ul class="'+settings.moreContainerClass+'"></ul></li>');
						$menu.find('.' + settings.moreBtnClass).insertBefore($menu.find('[data-append="1"]').first());
					};
					$menu.find('[data-append="1"]').appendTo($menu.find('.' + settings.moreContainerClass));
				};

				return menuWdith;
			});

			$menu.find('li').removeAttr('data-append');

			$menu.find('.' + settings.moreBtnClass).find('ul').parent().each(function() {
	            var o = $(this);
	            var s = o.find('>ul');
	            var l = o.parents('ul').length;
	            var k = false;
	            o.hover(
	                function() {
	                    o.find('>a').addClass('active').removeClass('normal');
	                    for (i=$menu.find('.' + settings.moreBtnClass).find('ul').length; i>=0; i--){
	                        o.parent().find('>li').not(o).find('ul').eq(i).hide();
	                    }
	                    k = true;

	                    s.show();

	                    if ($(document).outerWidth()>$(window).outerWidth()) {
	                    	o.find('>ul').addClass('row-right-level');
	                    };
	                },
	                function() {
	                    o.find('>a').removeClass('active').addClass('normal');
	                    k = false;
	                    window.setTimeout(function() {
	                        if (!k) {
	                        	s.hide()
	                        	o.find('>ul').removeClass('row-right-level');                        
	                        };
	                    }, settings.moreHideTimeout);
	                }
	            );
	        });
		};

		function resizeRowMenu() {
			$menu.find('.' + settings.moreContainerClass).insertAfter($menu.find('.' + settings.moreBtnClass));
			$menu.find('.' + settings.moreContainerClass + '> li').unwrap();
			$menu.find('.' + settings.moreBtnClass).remove();

			rowMenuInit();
		};
	});
};
