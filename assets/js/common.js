var selectBox = function(){
	$('.select-box').each(function(){
		var box = $(this).find('select');
		var val = box.val();
		var opt = box.find('option:selected').val();
		var txt = box.find('option:selected').text();
		if(val==opt) $(this).addClass('on').find('label').html(txt);
		$(this).find('select').change(function(){		
			var txt = $(this).find('option:selected').text();
			$(this).parent().addClass('on').find('label').html(txt);
		});
	});
 }
 var inputBox = function(){
	$(".input-box input,.textarea-box textarea").each(function(i){
		var $this = $(this);
		var val = $this.val();
		if( val== "" || val == null) $this.prev().show();
		else $this.prev().hide();
		$this.parent().find('.btn-reset').click(function(){
			$this.val('').focus();
		});
	}).focus(function(){
		if($(this).is('[readonly]')) return false;
		 $(this).prev().hide();
		 $(this).parent().addClass('on');
	}).blur(function(){
		if($(this).is('[readonly]')) return false;
		var val = $(this).val();
		if( val== "" || val == null) $(this).prev().show();
		else $(this).prev().hide();
		
	});
 }
 var getTextLength = function(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		if (escape(str.charAt(i)).length == 6) len++;
		len++;
	}
	return len;
}
$(function () {
	var screenMode =  window.innerWidth > 1080 ? 'web' : 'mobile';
	var space = screenMode=='web'? 65 : 46;
	var extra = screenMode=='web'? 0 : 48;
	var step =2;
	if($('.scroll').length > 0){
		setInterval(function(){
			$('.scroll').attr('class',$('.scroll').attr('class').replace(/\d/g,step));
			step++;
			if(step == 5) step = 1;
		},500);
	}
	if($('.gallery').length > 0){
		$(window).on('load resize',function(){
			if( $(this).innerWidth() > 1280 ){
				$('.gallery').find('.btn-next').css({cursor:"url('../assets/images/sub/btn-next.png'), url('../assets/images/sub/btn-next.cur'), auto"});
				$('.gallery').find('.btn-prev').css({cursor:"url('../assets/images/sub/btn-prev.png'), url('../assets/images/sub/btn-prev.cur'), auto"});
			}else{
				$('.gallery').find('.btn-next').css({cursor:"pointer"});
				$('.gallery').find('.btn-prev').css({cursor:"pointer"});
			}
		});
	}
	$('.btn-top').click(function(){
		TweenMax.to(window, .3, {
			scrollTo: {
				y: 0,
				autoKill: false,
			}
		});
	});
	inputBox();
	selectBox();
	// selectbox ui
	// $('.select-box').each(function(){
	// 	var box = $(this).find('select');
	// 	var val = box.val();
	// 	var opt = box.find('option:selected').val();
	// 	var txt = box.find('option:selected').text();
	// 	if(val==opt) $(this).addClass('on').find('label').html(txt);
	// 	$(this).find('select').change(function(){		
	// 		var txt = $(this).find('option:selected').text();
	// 		$(this).parent().addClass('on').find('label').html(txt);
	// 	});
	// });
	
	/* 1depth 메뉴 */
	if($('#content').hasClass('intro'))  $('body').addClass('fix intro');
	$('header .header_submenu .btn-header').on("click", function(){
		if($(this).hasClass('on')) toggleHeader(false);
		else  toggleHeader(true);
	});
	$(document).click(function(e){	
		if ($(e.target).is('.searchWrap > .btn-search')){
			$(".searchContainer").toggleClass('on');
			if($(".searchContainer").hasClass('on') && $('.header_submenu').height()>0)  $('.header_submenu').css({'z-index':-1})
			else $('.header_submenu').css({'z-index':10})
		}
		else if ($('.searchContainer').find(e.target).length ==0 ){
			$(".searchContainer").removeClass('on');
			$('.header_submenu').css({'z-index': 10});
		}
		if($('.input-box').find(e.target).length==0 && $('.input-box').hasClass('on')) $('.input-box').removeClass('on')
		if($('.selectForm').find(e.target).length==0 && $('.selectForm').hasClass('on')) $('.selectForm').removeClass('on')
		
    });
	$('.selectForm').children().click(function() {
		var ps;
		if($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on");
			if(ps != null)
			 	ps.destroy(); 
			ps = null;
		}else{
			$(this).parent().addClass("on"); 
			setTimeout(function(){
			 ps = new PerfectScrollbar('.familyLink-box');
			}, 300);
		}
    });
	$(".menuWrap").click(function(){
		$("body").addClass("menuopen");
	});

	$(".gnbContainer .close,.gnbContainer .dim").click(function(){
		$("body").removeClass("menuopen");
	});

	var isHoverEvent = screenMode == 'web' ? true : false;
	gnbEvent(isHoverEvent);
	var hassticky4;
	if($('body').find('.menuContainer').length>0)  hassticky4 = $('.menuContainer').offset().top;
	$(window).resize(function() {
		if($("body").hasClass('menuopen')) $("body").removeClass("menuopen");
		screenMode =  window.innerWidth > 1080 ? 'web' : 'mobile';
		 space = screenMode=='web'? 65 : 46;
		 
		 extra = screenMode=='web'? 0 : 48;
		isHoverEvent = screenMode == 'web' ? true : false;
		gnbEvent(isHoverEvent);
		
		setsticky();
		if($(this).scrollTop() == 0 && $('body').find('.menuContainer').length>0) hassticky4 = $('.menuContainer').offset().top;
	});
	function toggleHeader(str){
		var mode = $.parseJSON(str);
		var m_$header = $("header"),
			m_$header_menu = $("header").find('.header_submenu'),
			_this = m_$header_menu.find('.btn-header');
		if(mode){
			_this.addClass("on");
			TweenMax.to(m_$header, 0.3, {top:0});
		}else{
			_this.removeClass("on");
			TweenMax.to(m_$header, 0.3, {top:-(m_$header.height()-m_$header_menu.height())});
		}
	}
	function gnbEvent(str){
		var mode = $.parseJSON(str);
		var open = false;
		if(mode){
			$("body").on('mouseover','#menu',function(){
				$("#menu").addClass("open");
				$("header .inner_wrapper").css({'z-index':11});
				$(this).addClass("menuopen");
			}).on('mouseout',"#menu", function(){
				$("#menu").removeClass("open");
				$(this).removeClass("menuopen");
				$("header .inner_wrapper").css({'z-index':""});
			});
			return false;
		}else{
			$("#menu > li").each(function(){
				if($(this).hasClass('open')){
					open= true;
					return false;
				}
			});
			$("body").off('mouseover mouseout hover','#menu')
			.on('click',"#menu > li > p",function(){
				var li = $(this).parent();	
				console.log(open); 			
				if(open){ 
					if(li.hasClass('open')){
						$('#menu > li').removeClass('open');
						open = !open;
						return false;
					}else{
						$('#menu > li').removeClass('open');
						li.addClass("open");
						open = true;
						return false;
					}
				}else{
					li.addClass("open");
					open = !open;
				}
				
			});
			return false;
		}
	}
	function setsticky(){
		
		if($('#content').has('.menuContainer').length > 0) {
			$('body').addClass('hassticky');
			if($('#content').has('.keyvisualWrap').length  ==  0 && !$('#content').hasClass('privacy'))  $('.hassticky').addClass('hassticky2');
			if($('header').has('.header_submenu').length == 0) $('body').addClass('hassticky3');
			if($('#content').hasClass('privacy')) $('body').addClass('hassticky4');
		}
		else if(  $('header').has('.header_submenu').length == 0)   $('body').addClass('fix');
		if($('#content').hasClass('history'))  $('body').addClass('hassticky2');
	}
	setsticky();
	var lastScrollTop =0;
	$(this).scroll(function() {
		var sub_visual = $(".keyvisualWrap").scrollTop() + $(".keyvisualWrap").height();
		var st = $(this).scrollTop();
		if(st == 0 && $('body').hasClass('hassticky4')) hassticky4 = $('.menuContainer').offset().top;
		if (st > lastScrollTop){ // downscroll code
			if(st > 0 && $('body').hasClass('intro')) {
				toggleHeader(false);
				$('body').addClass('sc clearFix').find('.menuContainer').addClass('fixed');
			}
			if(st > $('header').height()) {
				$('body').addClass('sc');	
				if( $("body").hasClass('hassticky2') && !$("body").hasClass('hassticky4')) 
					$(".hassticky.hassticky2").addClass('clearFix').find('.menuContainer').addClass('fixed');
			}
			if(st > hassticky4) $(".hassticky.hassticky4").addClass('clearFix').find('.menuContainer').addClass('fixed');
			if(st > sub_visual) {
				if(!$(".hassticky").hasClass('clearFix')) $(".hassticky").addClass('clearFix').find('.menuContainer').addClass('fixed');
				$(".hassticky").find('.tabNavi').addClass('fixed');
				if($(".hassticky").find('.tabNavi').length>0) {
					var tabnavi = $('.tabNavi').offset().top + $('.tabNavi').height();
					var tabarea =  $('.tab-area').offset().top + $('.tab-area').height();
					if(tabnavi > tabarea) $('.tabNavi').removeClass('fixed').addClass('stop');
				}
			}
			
		} else {// upscroll code
			if(st == 0 && $('body').hasClass('intro')) toggleHeader(true);

			if(st <= $('header').height() && !$('body').find('#DOOSAN_STORY').length>0 && !$("body").hasClass('hassticky4')) {
				$('body').removeClass('sc').find('.menuContainer').removeClass('fixed');
			}
			if($(".hassticky").hasClass('clearFix')) {
				$(".hassticky").removeClass('clearFix');
			}
			if(st <= hassticky4) $('.hassticky4').removeClass('sc').find('.menuContainer').removeClass('fixed');
			if(st <= sub_visual && !$("body").hasClass('hassticky4')) {
				if( $('.hassticky .menuContainer').hasClass('fixed')) {
					$('.hassticky .menuContainer').removeClass('fixed');
					$(".hassticky").find('.tabNavi').removeClass('fixed');
				}
			}	
			else if($(".hassticky").find('.tabNavi').length>0) {
				if(st <= $('.tabNavi').offset().top)  $('.tabNavi').removeClass('stop').addClass('fixed');
			};
		}
		lastScrollTop = st;
	});
	// sub menu
		
		
	var submenu = (function(){
		var tabmenu =null;
		var menuSetting = {
			slidesPerView:'auto',
			navigation: false,
			pagination: false,
		};
		if(screenMode == 'mobile'){
			tabmenu = new Swiper('.tabmenu', menuSetting);
			var $tabmenuEl=$(tabmenu.el);
			tabmenu.on('reachBeginning', function () {
				$tabmenuEl.removeClass('last');
				$tabmenuEl.addClass('first');
			});
			tabmenu.on('reachEnd', function () {
				$tabmenuEl.removeClass('first');
				$tabmenuEl.addClass('last');
			});
			$('.tabmenu').find('li').each(function(i){
				if($(this).hasClass('on')) tabmenu.slideTo(i)
			});
		}else if( tabmenu != null){
			tabmenu.destroy(true);
			tabmenu =null;
		}
		return tabmenu;
	})();
	var tab = (function(){
		
		var $tabBtn = $('.tab').find('li'),
			$tabNavi = $('.tabNavi').find('li'),
			$tabcon  = $('.tabCon'),
			tabmenu = submenu;
			console.log(submenu);
		var activeTab = getTabIndex();
		if(activeTab.length>0){
			var idx = parseInt(activeTab);
			if(idx < $tabBtn.length ){
				$tabBtn.removeClass('on');
				$tabBtn.eq(idx).addClass('on');
				var offsetY	= idx==0? 0 : $tabcon.eq(idx).offset().top-space-extra;	
				TweenMax.to(window, .6, {
					scrollTo: {
						y: offsetY,
						autoKill: false,
					}
				});
				if( tabmenu != null) tabmenu.slideTo(i);
			}
		}
		$tabBtn.each(function(i){
			var $this = $(this);
			extra -=2;
			if($('body').hasClass('hassticky3')) extra=0;
			$this.click(function(){
				$tabBtn.removeClass('on');
				$this.addClass('on');
				var offsetY	= $tabcon.eq(i).offset().top-space;	
				if(i==0) offsetY = 0;	
				if($(window).scrollTop() == 0) offsetY -= extra;
				TweenMax.to(window, .6, {
					scrollTo: {
					  y: offsetY,
					  autoKill: false,
					}
				});
				if( tabmenu != null) tabmenu.slideTo(i);
			});
		});
		var historyController = new ScrollMagic.Controller();
		$tabcon.each(function(i){
			var SceneBox = new ScrollMagic.Scene({
				triggerElement: this
			}).on('enter', function() {
				$tabNavi.removeClass('active');
				$tabNavi.eq(i).addClass('active');
				$tabBtn.removeClass('on');
				$tabBtn.eq(i).addClass('on');
				if(submenu != null) submenu.slideTo(i);
			}).on('leave', function() {
				if(i ===0 ) return false;
				$tabNavi.removeClass('active');
				$tabNavi.eq(i-1).addClass('active');	
				$tabBtn.removeClass('on');
				$tabBtn.eq(i-1).addClass('on');
				if( submenu != null) submenu.slideTo(i-1);
			}).addTo(historyController);
		});

	})();
	function getTabIndex() {
		var regex = new RegExp("[\\?\d]([^&#]*)" ),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	$(".popup .btn-pop-close").click(function(){
		var popup = $(this).parent().parent().attr('id');
		closePop(popup);
	});
});
//popup
var popps = [], serialNum=0; // for 팝업 스크롤 객체 
function openPop(e,pop){
	var btn=$(e);
	btn.addClass('btn-pop-open');
	$("body").addClass("openpop");
	var	popup = $("#"+pop);
	popup.fadeIn();
	popup.find('.btn-pop-close').focus();
	if(popup.is(':visible')){
		var serial = popup.data('serial');
		if(serial === undefined){
			popup.data('serial',serialNum);
			popps[serialNum] = new PerfectScrollbar("#"+pop+' .contxt');
			serialNum++;
		}
	}
}
function closePop(pop){
	var	popup = $("#"+pop);
	popup.fadeOut();
	$('.btn-pop-open').focus().removeClass('btn-pop-open');
	var isPopup = false;
	$(".popup:not(#"+pop+")").each(function(){
		if($(this).is(':visible')){
			isPopup = true;
			return false;
		}
	});
	if(!isPopup) {
		if($("body").hasClass("openpop"))
				$("body").removeClass("openpop");
	}
}