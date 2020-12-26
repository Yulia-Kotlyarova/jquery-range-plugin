(function($){
    jQuery.fn.responsiveBlock = function(){
      let make = function(){
        this.html = `<div class="range__slider-range ${this}"></div>
        <button class="range__slider-handle range__btn-1"></button>
        <button class="range__slider-handle range-btn-2"></button>`
      };
      
      let options = $.extend({
        handle: 'one',
        pace: '1',
        direction: 'horizontal',
        min_value: '0',
        max_value: 3000,
      });
   
      return this.each(make); 
    };
  })(jQuery);

  $('.range-1').responsiveBlock();