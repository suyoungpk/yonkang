var STORY = (function() {
    var g_$header = $("header"),
        g_$footer = $("footer"),
        g_$section = $(".section"),
        g_$scroll = $("#SCROLL_DOWN"),
        g_$container = $("#DOOSAN_STORY"),
        g_$storyNavi = $("#STORY_NAVI"),
        g_nextScrollCount = 0,
        g_prevScrollCount = 0,
        g_sectionLen = g_$section.length,
        g_lockWheel = false,
        isScrollClick=false;
  
    function init(){
      $('body').addClass('fix fixHight');
      g_$header.find('.header_submenu').addClass('init');
      startIntro();
      addEvents();
      setBtns();
      g_$scroll.children().on('click',function(){
        isScrollClick = true; console.log('클릭');
        if($(this).hasClass('prev')) g_nextScrollCount--;
        else if($(this).hasClass('next')) g_nextScrollCount++;
         changeStart();
      });
    }
  
    function startIntro() {
        $("#STORY_STEP1").addClass("ready active");
      //   g_$header.addClass('other');
      //  g_$section.height(window.innerHeight);
        
        setTimeout(function(){
          getTimeline(1);
        },3000);
  
        g_$scroll.removeClass("mid up");
    }
  
    function getTimeline(_idx){
        var m_$step2 = $("#STORY_STEP"+_idx),
            m_step2Timeline = new TimelineMax();
            m_step2Timeline.fromTo(m_$step2.find(".underline .line"), 1, {width:0}, {width:"100%"}); 
        return m_step2Timeline;
    }
  
    function addEvents() {
        var onTouchStart;
        var onTouchMove;
  
        $(window).on('resize', function() {
            if (!$('body').hasClass('resize')) $('body').addClass('resize');
  
            //g_$section.height(window.innerHeight);
  
            clearTimeout(window.resizedFinished);
  
            window.resizedFinished = setTimeout(function () {
                $('body').removeClass('resize');
            }, 500);
        });
  
        $(window).on("mousewheel DOMMouseScroll", function(event) {
            if (g_lockWheel) return;
  
            if (g_nextScrollCount < g_sectionLen - 1) {
                if (event.originalEvent.wheelDelta > 0) {
                    if (g_nextScrollCount == 0) return
                    else g_nextScrollCount--;
                } else {
                    if (g_nextScrollCount == g_sectionLen - 1) return;
                    else g_nextScrollCount++;
                }
  
                changeStart();
            }
  
            if (g_nextScrollCount === g_sectionLen - 1) {
                var scrollTop = $(window).scrollTop();
  
                if (event.originalEvent.wheelDelta > 0 && scrollTop === 0 || scrollTop < 0) {
                    g_nextScrollCount--;
                    changeStart();
                }
            }
            if(g_nextScrollCount > 0) $('body').addClass('sc');
            else if(g_nextScrollCount == 0 && $('body').hasClass('sc')) $('body').removeClass('sc');
  
        });
  
        g_$container.on('touchstart touchmove touchend', function(e) {
            
            if (g_lockWheel) return;
  
            if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') {
                if (e.target.dataset.navi || e.target.dataset.naviInner) return;
            }
  
            switch (e.type) {
                case 'touchstart':
                    onTouchStart = e.originalEvent.touches[0].clientY;
                   
                    break;
                case 'touchmove':
                    onTouchMove = e.originalEvent.touches[0].clientY;
                    break;
                case 'touchend':
                    if(isScrollClick){
                        isScrollClick= false;
                        return ;
                    }
                    if (Math.abs(onTouchStart - onTouchMove) < 30) return;
  
                    if (g_nextScrollCount < g_sectionLen - 1) {
                        if (onTouchStart > onTouchMove) {
  
                            if (g_nextScrollCount === g_sectionLen - 1) return;
                            else g_nextScrollCount++;
                        } else {
                            if (g_nextScrollCount === 0) return;
                            else g_nextScrollCount--;
                        }
  
                        changeStart();
                    } else {
  
                        if (onTouchStart < onTouchMove) {
                            var scrollTop = $(window).scrollTop();
  
                            if (scrollTop === 0 || scrollTop < 0) {
                                g_nextScrollCount--;
                                changeStart();
                            }
                        }
                    }
                    break;
            }
          //   if(g_nextScrollCount > 0) $('body').addClass('sc');
          //   if(g_nextScrollCount == 0 && $('body').hasClass('sc')) $('body').removeClass('sc');
        });
  
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
  
            if (g_lockWheel && g_nextScrollCount === g_sectionLen - 1) {
                window.scrollTo(0, 1);
            }
        });
    }
  
    function setBtns(){
        g_$storyNavi.find(".btns a").on("click", function (e) {
            var idx = $(this).index();
  
            if(g_lockWheel) return;
            if(idx == g_nextScrollCount) return;
            g_nextScrollCount = idx;
            changeStart();
        })
    }
  
    function changeStart() {
        var m_nextData = changeSection();
        g_lockWheel = true;
        g_prevScrollCount = g_nextScrollCount;
  
        if(g_nextScrollCount > 0) $('body').addClass('sc');
        if(g_nextScrollCount == 0 && $('body').hasClass('sc')) $('body').removeClass('sc');
        setTimeout(function(){
            g_lockWheel = false;
            m_nextData.nextSection.addClass("active");
            if(g_nextScrollCount != g_sectionLen-1) {
                g_$scroll.removeClass("up");
                g_$scroll.addClass("mid");
            }
            if(g_nextScrollCount == 0 ) {
                g_$scroll.removeClass("mid up");
            }
        }, 2000);
        setTimeout(function(){
          getTimeline(g_prevScrollCount+1);
      }, 4000);
      
        
    }
  
    function changeSection(){
        var     m_$prevSection = g_$section.eq(g_prevScrollCount),
        m_$nextSection = g_$section.eq(g_nextScrollCount),
        m_motionType = "";
        if(g_prevScrollCount < g_nextScrollCount) m_motionType = "next";
        else m_motionType = "prev";
  
        
        //navi
         if (g_nextScrollCount > 0) {
            TweenMax.to(g_$header, 0.3, {top:-(g_$header.height() - g_$header.find('.header_submenu').height())});
            g_$header.find('.header_submenu .btn-header').removeClass("on");
         }else{
            TweenMax.to(g_$header, 0.3, { top: 0 });
            g_$header.find('.header_submenu .btn-header').addClass("on");
         };
  
        //ending
        if(g_nextScrollCount == g_sectionLen-1) {
            
           // g_$storyNavi.addClass("off");
           $('body').removeClass('fixHight');
            setTimeout(function(){
                g_$footer.addClass("on").removeClass('out');
                $(".inner_container").addClass("last_min_height");
            }, 2000);
            g_$scroll.removeClass("mid");
            g_$scroll.addClass("up");
        } else {
            g_$footer.removeClass("on").addClass('out');
          //  g_$storyNavi.removeClass("off");
            $(".inner_container").removeClass("last_min_height")
        }
  
        g_$section.attr("class", "section intro");
        m_$prevSection.addClass(m_motionType).addClass("out");
        m_$nextSection.addClass(m_motionType).addClass("in");
  
        changeNavi();
       
        
        setTimeout(function(){
            m_$nextSection.addClass("ready");
        }, 2000);
        $(window).on('scroll');
        return {nextSection:m_$nextSection};
    }
  
    function changeNavi(){
        var m_$titles =  g_$storyNavi.find(".titles li"),
            m_$btns = g_$storyNavi.find(".btns a");
  
        m_$titles.removeClass("on");
        m_$btns.removeClass("on");
        m_$titles.eq(g_nextScrollCount).addClass("on");
        m_$btns.eq(g_nextScrollCount).addClass("on");
  
    }
    init();
  })();