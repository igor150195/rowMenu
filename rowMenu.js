$.fn.rowMenu = function(options) {
	return this.each(function() {
		var timeout;
		var $menu = $(this);
		var $li = $menu.find('>li');

		var settings = $.extend( {
			'moreText'         			: 'Еще',
			'moreWidth'        			: 100,
			'resizeTimeout'        		: 10,
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
				var thisWidth = $this.outerWidth();

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
		};

		function resizeRowMenu() {
			$menu.find('.' + settings.moreContainerClass).insertAfter($menu.find('.' + settings.moreBtnClass));
			$menu.find('.' + settings.moreContainerClass + '> li').unwrap();
			$menu.find('.' + settings.moreBtnClass).remove();

			rowMenuInit();
		};
	});
};