var mainjs=(function(){
    $('.main-visual').width(window.innerWidth);
    var swiper = new Swiper('.main-visual', {
        speed:1000,
        autoplay:{
            delay:5000
        },
        loop:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        preloadImages: false,
        lazy: true,
        on: {
        	init:function(){
        		$('.visual-con').find('.con').addClass('fix3');
        	},
	    	slideChange: function () {
	    		$('.visual-con').find('.con').removeClass('move fix fix2 fix3');
	    		if(this.activeIndex  == 1 || this.activeIndex > this.slides.length-2) {
	      			$('.visual-con').find('.con').delay(1000).addClass('fix3');
	      			return;
	      		}
	      		if(this.activeIndex  == 3) {
	      			$('.visual-con').find('.con').delay(1000).addClass('fix2');
	      			return;
	      		}
	      		if(this.activeIndex == 0 || this.activeIndex  == 5) {
	      			$('.visual-con').find('.con').delay(1000).addClass('move');
	      			return;
	      		}
	      		$('.visual-con').find('.con').delay(1000).addClass('fix');
	    	},
	 	 }
    });
    var swiper2 = new Swiper('.news-slide', {
        slidesPerView: 3,	
        initialSlide: 1,
        centeredSlides: true,
        loop:true,
        navigation: {
            nextEl: '.main-news .swiper-button-next',
            prevEl: '.main-news .swiper-button-prev',
        },
        breakpoints: {
            641: {
                slidesPerView: 3,
                centeredSlides: true
            },
            0: {
                centeredSlides: false,
                slidesPerView: 2
            }
        },
        // updateOnWindowResize:true,
        observer:true,
        observeParents:true
    });
    var scrollUi = {
        currentSection:0,
        sectionsPos : [],
        extraSpace:88,
        init:function(){
            $('body').addClass('stopScroll');
            this.sectionsPos=[];//init
            this.sectionsPos.push(0);
            this.sectionsPos.push($('.main-info').offset().top-this.extraSpace);
            this.sectionsPos.push($('.main-news').offset().top-this.extraSpace);
            this.sectionsPos.push($('footer').offset().top-this.extraSpace);
        },
        scrollAction:function(){
            this.init();
            var currentSection= this.currentSection;
            var sectionsPos = this.sectionsPos;
            var lastNum = sectionsPos.length - 1;
            $(window).on('mousewheel DOMMouseScroll',function(e){
                var delta = extractDelta(e) ;
                if (currentSection < lastNum) {
                    if (delta > 0) {
                        if (currentSection == 0) return
                        else currentSection--;
                    } else {
                        if (currentSection == lastNum) return;
                        else currentSection++;
                    }
                    changeStart(sectionsPos[currentSection]);
                }
                if (currentSection === lastNum) {
                    if (delta > 0 ) {
                        currentSection--;
                        changeStart(sectionsPos[currentSection]);
                    }
                }
                this.currentSection = currentSection;
            });
            $('.main .scroll-down').on('click',function(){
                currentSection++;
                changeStart(sectionsPos[currentSection]);
            });
            function changeStart(yoffset){
                TweenMax.to(window, 0.6, {
                    scrollTo: {
                        y: yoffset,
                        autoKill: false,
                      },
                 });
            }
            function extractDelta(e) {
                if (e.wheelDelta) {
                    return e.wheelDelta;
                }
            
                if (e.originalEvent.detail) {
                    return e.originalEvent.detail * -40;
                }
            
                if (e.originalEvent && e.originalEvent.wheelDelta) {
                    return e.originalEvent.wheelDelta;
                }
            }
        },
        destory:function(){
            $('body').removeClass('stopScroll');
            $(window).off('mousewheel DOMMouseScroll');
        }
    };
    function responsiveEvent(){
        $('.main-visual').width(window.innerWidth);
        if($(window).width() > 768){
            var heg = window.innerHeight-88;
            $('.main-visual').height(heg);
            scrollUi.scrollAction();
        } else {
            $('.main-visual').height('410');
            scrollUi.destory();
        }
        swiper.update();
        swiper2.update();
    }
     //$(window).on('load resize',responsiveEvent);
     $(window).on('resize',responsiveEvent);
    window.addEventListener("DOMContentLoaded", responsiveEvent);

})();