/*************************************************!
*
*   project:    liteAccordion - a horizontal accordion plugin for jQuery
*   author:     Nicola Hibbert
*   url:        http://nicolahibbert.com/liteaccordion-v2/
*   demo:       http://www.nicolahibbert.com/demo/liteAccordion/
*
*   Version:    2.0.2
*   Copyright:  (c) 2010-2011 Nicola Hibbert
*   Licence:    MIT
*
**************************************************/
(function(b){var a=function(g,l){var i={containerWidth:960,containerHeight:320,headerWidth:48,activateOn:"click",firstSlide:1,slideSpeed:800,onTriggerSlide:function(){},onSlideAnimComplete:function(){},autoPlay:false,pauseOnHover:false,cycleSpeed:6000,easing:"swing",theme:"basic",rounded:false,enumerateSlides:false,linkable:false},h=b.extend({},i,l),c=g.children("ol").children("li"),j=c.children(":first-child"),k=c.length,f=h.containerWidth-k*h.headerWidth,e={play:function(m){var n=d.nextSlide(m&&m);if(d.playing){return}d.playing=setInterval(function(){j.eq(n()).trigger("click.liteAccordion")},h.cycleSpeed)},stop:function(){clearInterval(d.playing);d.playing=0},next:function(){e.stop();j.eq(d.currentSlide===k-1?0:d.currentSlide+1).trigger("click.liteAccordion")},prev:function(){e.stop();j.eq(d.currentSlide-1).trigger("click.liteAccordion")},destroy:function(){e.stop();b(window).unbind(".liteAccordion");g.attr("style","").removeClass("accordion basic dark light stitch").removeData("liteAccordion").unbind(".liteAccordion").find("li > :first-child").unbind(".liteAccordion").filter(".selected").removeClass("selected").end().find("b").remove();c.removeClass("slide").children().attr("style","")},debug:function(){return{elem:g,defaults:i,settings:h,methods:e,core:d}}},d={setStyles:function(){g.width(h.containerWidth).height(h.containerHeight).addClass("accordion").addClass(h.rounded&&"rounded").addClass(h.theme);c.addClass("slide").children(":first-child").width(h.containerHeight).height(h.headerWidth).eq(h.firstSlide-1).addClass("selected");j.each(function(m){var p=b(this),o=m*h.headerWidth,n=j.first().next(),q=parseInt(n.css("marginLeft"),10)||parseInt(n.css("marginRight"),10)||0;if(m>=h.firstSlide){o+=f}p.css("left",o).next().width(f-q).css({left:o,paddingLeft:h.headerWidth});h.enumerateSlides&&p.append("<b>"+(m+1)+"</b>")})},bindEvents:function(){if(h.activateOn==="click"){j.bind("click.liteAccordion",d.triggerSlide)}else{if(h.activateOn==="mouseover"){j.bind({"mouseover.liteAccordion":d.triggerSlide,"click.liteAccordion":d.triggerSlide})}}if(h.pauseOnHover&&h.autoPlay){g.bind("mouseover.liteAccordion",function(){d.playing&&e.stop()}).bind("mouseout.liteAccordion",function(){!d.playing&&e.play(d.currentSlide)})}},linkable:function(){var m=(function(){var o=[];c.each(function(){if(b(this).attr("name")){o.push((b(this).attr("name")).toLowerCase())}});return m=o})();var n=function(p){var o;if(p.type==="load"&&!window.location.hash){return}if(p.type==="hashchange"&&d.playing){return}o=b.inArray((window.location.hash.slice(1)).toLowerCase(),m);if(o>-1&&o<m.length){j.eq(o).trigger("click.liteAccordion")}};b(window).bind({"hashchange.liteAccordion":n,"load.liteAccordion":n})},currentSlide:h.firstSlide-1,nextSlide:function(m){var n=m+1||d.currentSlide+1;return function(){return n++%k}},playing:0,animSlideGroup:function(m,o,n){var p=n?":lt("+(m+1)+")":":gt("+m+")";c.filter(p).each(function(){var r=b(this),q=c.index(r);r.children().stop(true).animate({left:(n?0:f)+q*h.headerWidth},h.slideSpeed,h.easing,function(){if(!d.slideAnimCompleteFlag){h.onSlideAnimComplete.call(o);d.slideAnimCompleteFlag=true}})})},slideAnimCompleteFlag:false,triggerSlide:function(p){var o=b(this),m=j.index(o),n=o.next();d.currentSlide=m;d.slideAnimCompleteFlag=false;j.removeClass("selected").filter(o).addClass("selected");if(p.originalEvent&&h.autoPlay){e.stop();e.play(m)}if(h.linkable&&!d.playing){window.location.hash=o.parent().attr("name")}h.onTriggerSlide.call(n);d.animSlideGroup(m,n,true);d.animSlideGroup(m,n)},ieClass:function(){var m=+(b.browser.version).charAt(0);if(m<7){e.destroy()}if(m===7||m===8){c.each(function(n){b(this).addClass("slide-"+n)})}g.addClass("ie ie"+m)},init:function(){if(b.browser.msie){d.ieClass()}d.setStyles();d.bindEvents();if(h.cycleSpeed<h.slideSpeed){h.cycleSpeed=h.slideSpeed}if(h.linkable&&"onhashchange" in window){d.linkable()}h.autoPlay&&e.play()}};d.init();return e};b.fn.liteAccordion=function(e){var d=this,c=d.data("liteAccordion");if(typeof e==="object"||!e){return d.each(function(){var f;if(c){return}f=new a(d,e);d.data("liteAccordion",f)})}else{if(typeof e==="string"&&c[e]){if(e==="debug"){return c[e].call(d)}else{c[e].call(d);return d}}}}})(jQuery);