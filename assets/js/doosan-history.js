
window.addEventListener('beforeunload', function(event) {
  $('body').addClass('fixHight').children().hide();
});
var bisuness = (function() {
  var $highlightNavi = $('#NAVI');
  var $history = $('#HISTORY');
  var $sections = $history.find('.box_right').children();
  var $currentSection = $sections.first();
  var currentSectionIndex = $currentSection.index();
  // var windowInnerWidth = window.innerWidth;
  var responseWidth = 1280;
  var currentType = function(){ return window.innerWidth > responseWidth ? 'web' : 'mobile'};
  var extraSpace ;
  var offsets = controlOffsets($sections, extraSpace, currentType());
  var offsetY;
  var historySceneUpdate = [];
  var sectionsSceneUpdate = [null];

  var $boxTop = $('#TAB');
  var $boxTopChidren = $boxTop.find('li');
  var $boxLeftWrapper =$history.find('.box_left');
  var $boxLeft = $history.find('.box_left .box_inner').children();
  var $boxRight = $history.find('.box_right').find('li');
  var $historyNum = $boxLeft.eq(1).find('.num_inner');
  var $historyNumChildren = $historyNum.children();
  var $titleBefore = $boxLeft.eq(0).children();
  var $titleAfter = $boxLeft.eq(2).children();
  var titleStep = [
    [0, 3, 13],
    [0, 1, 2]
  ];
  var numberStep = [
    [0, 9],
    [0, 1]
  ];
  var tabmenu =null;
  var isClickEvent=false;
  var sticky = function (){
      // sub menu
    var menuSetting = {
      slidesPerView:'auto',
      navigation: false,
      pagination: false,
      observer:true,
      observeParents:true,
      updateOnWindowResize:true
    };
   
    if(currentType() == 'mobile') {
      $boxTop.addClass('menuContainer tab').find('.swiper-container').addClass('tabmenu'); 
      $('body').addClass('hassticky');
      tabmenu = new Swiper('.tabmenu', menuSetting);
    }
    else if($boxTop.hasClass('menuContainer')) {
      $('body').removeClass('hassticky');
      $boxTop.removeClass('menuContainer tab').find('.swiper-container').removeClass('tabmenu');
      if( tabmenu != null){ tabmenu.destroy(true);
          tabmenu =null;
        }
    }

    if(window.innerWidth > 1280) extraSpace = 400
    else if(window.innerWidth > 1081)  extraSpace = 152
    else  extraSpace = 97
  }
  function init() {
    controlUnload();
    $(window).on('load resize',function(){
      sticky();
     // facetofooter();
    }).on('scroll',function(){
      var st = $(this).scrollTop();
      if(st < 10) if( tabmenu != null)  tabmenu.slideTo(0);
    });
  }
  function facetofooter(){
    var lastScrollTop =0;
    if( currentType() != 'web' ) return false; 
    $(window).scroll(function(){
      var st = $(this).scrollTop();
      var lnb = $('#HISTORY .box_left .box_inner');
      var lnbsc =lnb.offset().top + lnb.height();
      if (st > lastScrollTop){ 
        if(lnbsc > $('footer').offset().top) lnb.parent().addClass('fix');
      }else{
        if(st <  lnb.offset().top && lnb.parent().hasClass('fix'))
          lnb.parent().removeClass('fix');
      }
      lastScrollTop = st;
    });
  }
  function controlUnload() {
    $(window).on('beforeunload', function() {
      $('body').addClass('unload');
      $(window).scrollTop(0);
    });
  }

  function controlOffsets($sections, space, types) {
    var $boxRight = $history.find('.box_right').children();

    var  result = $.map($sections, function(self, i) {
      if (i === 0) {
        return $boxRight.eq($boxRight.length - 1).offset().top - space
      } else {
        return $(self).offset().top - space;
      }
    });
    return result;
  }

  var controlHighlightNavi = (function() {
    var $naviTitles = $highlightNavi.find('.titles').children();
    var $naviBtns = $highlightNavi.find('.btns').children();

    $naviBtns.each(function(i) {
      var $this = $(this);

      $this.on('click', function(e) {
        if (i === currentSectionIndex) return;
        if (i === 0) {
          controlScroll.goToSection(i, true, 'click');
        } else {
          controlScroll.goToSection(i, false, 'click');
        }
        
      });
    });
    $boxTopChidren.each(function(i) {
      var $this = $(this);
      $this.on('click', function(e) {
        if (i === currentSectionIndex) return;
        if (i === 0) {
          controlScroll.goToSection(i, true, 'click');
        } else {
          controlScroll.goToSection(i, false, 'click');
        }
      });
    });
    function naviCtrl($title, $btn, i) {
      $title.removeClass('active');
      $title.eq(i).addClass('active');
      $btn.siblings().removeClass('active');
      $btn.addClass('active');
      $boxTopChidren.removeClass('on');
      $boxTopChidren.eq(i).addClass('on');
      if(tabmenu != null)
       tabmenu.slideTo(i);
    }

    return {
      naviCtrl: function(idx) {
        naviCtrl($naviTitles, $naviBtns.eq(idx), idx);
      }
    }
  })();
   
  var controlScroll = (function() {
    sectionsController = new ScrollMagic.Controller();

    ctrlHistroy();
    function ctrlHistroy() {
     
      var historyController = new ScrollMagic.Controller();
      var TL = new TimelineMax({ ease: Power2.easeOut });

      var intro = function(){
        TL.add('initMotion')
        .fromTo($history, .3, { autoAlpha: 0 }, { autoAlpha: 1 }, 'initMotion')
        .fromTo($boxLeft.eq(0), 1, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0 }, 'initMotion+=.2')
        .fromTo($boxLeft.eq(1), 1, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.3')
        .fromTo($boxLeft.eq(2), 1, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0 }, 'initMotion+=.2')
        .fromTo($boxRight.eq(0), .3, { autoAlpha: 0 }, { autoAlpha: 1 }, 'initMotion')
        .fromTo($boxRight.eq(0).find('.num'), 1, { autoAlpha: 0, y: 130 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.4')
        .fromTo($boxRight.eq(0).find('.desc'), 1, { autoAlpha: 0, y: 140 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.5')
        .fromTo($boxRight.eq(0).find('.photo'), 1, { autoAlpha: 0, y: 150 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.6')
        .fromTo($boxRight.eq(1), 1, { autoAlpha: 0, y: 160 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.7')
        .fromTo($boxRight.eq(2), 1, { autoAlpha: 0, y: 160 }, { autoAlpha: 1, y: 0 }, 'initMotion+=.8');
      }
      intro();
        $titleBefore.each(function(i) {
          $(this).on('click', function() {
            var offsetY = i !== 0 ? Math.abs($boxRight.eq(titleStep[0][i]).offset().top) - 400 : 0;
            isClickEvent=true;
            TweenMax.to(window, .6, {
              scrollTo: {
                y: offsetY,
                autoKill: false,
              },
              onComplete: function(){
                isClickEvent=false;
              }
            });
          });
        });

        $titleAfter.each(function(i) {
          $(this).on('click', function() {
            var offsetY = i !== 0 ? Math.abs($boxRight.eq(titleStep[0][i]).offset().top) - 400 : 0;
            isClickEvent=true;
            TweenMax.to(window, .6, {
              scrollTo: {
                y: offsetY,
                autoKill: false,
              },
              onComplete: function(){
                isClickEvent=false;
              }
            });
          });
        });
        
      $boxRight.each(function(i) {
        switch (i) {
          case 0:
            boxRightOffsets = -305;
            break;
            default:
            boxRightOffsets = -505;
            break;
        }
        var SceneBoxRight = new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 0,
          offset: boxRightOffsets,
        })
        .on('enter', function() {
         
          // Title
          if (titleStep[0].indexOf(i) === 0) {
            $titleBefore.eq(titleStep[1][titleStep[0].indexOf(i)]).addClass('active-out');
          }
          if (titleStep[0].indexOf(i) !== -1) {
            $titleBefore.removeClass('active');
            $titleBefore.eq(titleStep[1][titleStep[0].indexOf(i)]).addClass('active active-out');

            $titleAfter.eq(titleStep[1][titleStep[0].indexOf(i)]).addClass('active');
            // Color
            $historyNum.attr('class', $historyNum.attr('class').replace(/\d/g, titleStep[1][titleStep[0].indexOf(i)] + 1));   
            //navi
            controlHighlightNavi.naviCtrl(titleStep[1][titleStep[0].indexOf(i)])
          }

          // Number
          if (numberStep[0].indexOf(i) !== -1) {
              $historyNumChildren.removeClass('active');
              $historyNumChildren.eq(numberStep[1][numberStep[0].indexOf(i)]).addClass('active');
          }

          if(i == $boxRight.length-1 ) {
            $('.scroll').addClass('up');
            $boxLeftWrapper.addClass('fix');
          }else if($boxLeftWrapper.hasClass('fix')){
            $boxLeftWrapper.removeClass('fix');
          }
          else if($('.scroll').hasClass('up')) $('.scroll').removeClass('up');
   
          if (i != 0 && !isClickEvent) {
            var offsets_box = controlOffsets($boxRight, extraSpace, currentType);
            var offsetY = offsets_box[i];
            TweenMax.to(window, .3, {
              scrollTo: {
                y: offsetY,
                autoKill: false,
              }
             });
          } 
        
        })
        .on('leave', function() {
          // Title
         
          if (titleStep[0].indexOf(i) !== -1) {
            $titleBefore.eq(titleStep[1][titleStep[0].indexOf(i) - 1]).addClass('active');
            
            $titleBefore.eq(titleStep[1][titleStep[0].indexOf(i)]).removeClass('active active-out');

            $titleAfter.eq(titleStep[1][titleStep[0].indexOf(i)]).removeClass('active');
             // Color
             var num =titleStep[1][titleStep[0].indexOf(i)];
             if(num == 0) num=1;
             $historyNum.attr('class', $historyNum.attr('class').replace(/\d/g, num));
             var num2 =titleStep[1][titleStep[0].indexOf(i)-1];
            if( num2 == undefined) num2=0;
             controlHighlightNavi.naviCtrl(num2);
          }
        
           
          // Number
          if (numberStep[0].indexOf(i) !== -1) {
            $historyNumChildren.removeClass('active');
            $historyNumChildren.eq(numberStep[1][numberStep[0].indexOf(i) - 1]).addClass('active');
          }
          if (titleStep[0].indexOf(i) - 1 == -1 )  { //init
            $titleBefore.eq(0).addClass('active');
            $titleAfter.eq(0).addClass('active');
            $historyNumChildren.eq(0).addClass('active');
          }
          //scroll
          if(i == $boxRight.length){
            $('.scroll').addClass('up');
            $boxLeftWrapper.addClass('fix');
          }else if($boxLeftWrapper.hasClass('fix')){
            $boxLeftWrapper.removeClass('fix');
          }
          else if($('.scroll').hasClass('up')) $('.scroll').removeClass('up');


        })
        // .addIndicators()
        .addTo(historyController);

        historySceneUpdate.push(SceneBoxRight);
      });
    }

    function goToSection($section, isFirst, types) {
      if(types == "click") isClickEvent=true;
        $currentSection = $section;
        currentSectionIndex = $section.index();
        offsets = controlOffsets($sections, extraSpace, currentType);
        offsetY = !isFirst ? offsets[currentSectionIndex]  : 0;
        //if($(window).scrollTop() == 0) offsetY -= (extraSpace-$('header').height());
        TweenMax.to(window, .6, {
          scrollTo: {
            y: offsetY,
            autoKill: false,
          },
          onStart: function() {
            controlHighlightNavi.naviCtrl(currentSectionIndex);            
          },
          onComplete: function(){
            isClickEvent=false;
          }
      });
    }

    return {
      goToSection: function(i, isFirst, types) {
        goToSection($sections.eq(i), isFirst, types);

        return false;
      },
      historySceneUpdate: function(idx, offset) {
        historySceneUpdate[idx].offset(offset);
        historySceneUpdate[idx].update(true);
      },
      sectionSceneUpdate: function(triggerhook, offset, duration) {
        sectionsSceneUpdate.forEach(function(scene, i) {
          if (i !== 0) {
            scene.triggerHook(triggerhook);
            scene.offset(offset);
            scene.duration(duration);
            scene.update(true);
          }
        });
      }
    }
  })();
  init();
  
})();